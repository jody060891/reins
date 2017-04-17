using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace HITS.ModelBindingFix
{
    public sealed class FixedJsonValueProviderFactory : ValueProviderFactory
    {
        private static void AddToBackingStore(EntryLimitedDictionary backingStore, string prefix, object value)
        {
            IDictionary<string, object> dictionary = value as IDictionary<string, object>;
            if (dictionary != null)
            {
                foreach (KeyValuePair<string, object> keyValuePair in dictionary)
                    AddToBackingStore(backingStore, MakePropertyKey(prefix, keyValuePair.Key), keyValuePair.Value);
            }
            else
            {
                IList list = value as IList;
                if (list != null)
                {
                    for (int index = 0; index < list.Count; ++index)
                        AddToBackingStore(backingStore, MakeArrayKey(prefix, index), list[index]);
                }
                else
                    backingStore.Add(prefix, value);
            }
        }

        private static object GetDeserializedObject(ControllerContext controllerContext)
        {
            if (!controllerContext.HttpContext.Request.ContentType.StartsWith("application/json", StringComparison.OrdinalIgnoreCase))
                return null;
            string input = new StreamReader(controllerContext.HttpContext.Request.InputStream).ReadToEnd();
            if (string.IsNullOrEmpty(input))
                return null;
            return new JavaScriptSerializer().DeserializeObject(input);
        }

        /// <summary>
        /// Returns a JSON value-provider object for the specified controller context.
        /// </summary>
        /// 
        /// <returns>
        /// A JSON value-provider object for the specified controller context.
        /// </returns>
        /// <param name="controllerContext">The controller context.</param>
        public override IValueProvider GetValueProvider(ControllerContext controllerContext)
        {
            if (controllerContext == null)
                throw new ArgumentNullException("controllerContext");
            object deserializedObject = GetDeserializedObject(controllerContext);
            if (deserializedObject == null)
                return null;
            Dictionary<string, object> dictionary = new Dictionary<string, object>(StringComparer.OrdinalIgnoreCase);
            AddToBackingStore(new EntryLimitedDictionary(dictionary), string.Empty, deserializedObject);
            return new FixedDictionaryValueProvider<object>(dictionary, CultureInfo.CurrentCulture);
        }

        private static string MakeArrayKey(string prefix, int index)
        {
            return prefix + "[" + index.ToString(CultureInfo.InvariantCulture) + "]";
        }

        private static string MakePropertyKey(string prefix, string propertyName)
        {
            if (!string.IsNullOrEmpty(prefix))
                return prefix + "." + propertyName;
            return propertyName;
        }

        private class EntryLimitedDictionary
        {
            private static int _maximumDepth = GetMaximumDepth();
            private readonly IDictionary<string, object> _innerDictionary;
            private int _itemCount;

            public EntryLimitedDictionary(IDictionary<string, object> innerDictionary)
            {
                _innerDictionary = innerDictionary;
            }

            public void Add(string key, object value)
            {
                if (++_itemCount > _maximumDepth)
                    throw new InvalidOperationException("The JSON request was too large to be deserialized.");
                _innerDictionary.Add(key, value);
            }

            private static int GetMaximumDepth()
            {
                NameValueCollection appSettings = ConfigurationManager.AppSettings;
                if (appSettings != null)
                {
                    string[] values = appSettings.GetValues("aspnet:MaxJsonDeserializerMembers");
                    int result;
                    if (values != null && values.Length > 0 && int.TryParse(values[0], out result))
                        return result;
                }
                return 1000;
            }
        }
    }
}