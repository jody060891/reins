using System;
using System.Data.Entity.SqlServer;
using System.Linq;
using System.Linq.Dynamic;

namespace Core
{
    public static class DataTransformExtension
    {

        public static T TransformTo<T>(this object data) where T : class, new()
        {
            if (data == null)
                return null;

            var dataType = data.GetType();

            var targetType = typeof(T);
            var targetTypeProperties = targetType.GetProperties();

            var instance = Activator.CreateInstance(targetType);
            var transformedData = instance as T;

            foreach (var targetTypeProperty in targetTypeProperties)
            {
                if (!targetTypeProperty.CanWrite)
                    continue;

                var theProperty = dataType.GetProperty(targetTypeProperty.Name);

                if (theProperty == null)
                    continue;

                if (!theProperty.CanRead)
                    continue;

                if (theProperty.PropertyType != targetTypeProperty.PropertyType)
                    continue;

                if (targetTypeProperty.GetGetMethod().IsVirtual || theProperty.GetGetMethod().IsVirtual)
                    continue;

                targetTypeProperty.SetValue(transformedData, theProperty.GetValue(data));
            }

            return transformedData;
        }

        public static IQueryable<T> SearchByModel<T>(this object data, object dataSearch, IQueryable<T> source ) where T : class, new()
        {
            if (data == null)
                return null;

            var dataType = dataSearch.GetType();

            var targetType = typeof(T);
            var targetTypeProperties = targetType.GetProperties();

            var instance = Activator.CreateInstance(targetType);
            var transformedData = instance as T;

            var query = "";
            foreach (var targetTypeProperty in targetTypeProperties)
            {
                if (!targetTypeProperty.CanWrite)
                    continue;

                var theProperty = dataType.GetProperty(targetTypeProperty.Name);
                var value = theProperty.GetValue(dataSearch);
                if (value == null)
                    continue;
                
                var type = (targetTypeProperty.PropertyType.GenericTypeArguments.Length > 0)?(targetTypeProperty.PropertyType.GenericTypeArguments[0]):targetTypeProperty.PropertyType;
                if (type == typeof (DateTime))
                {
                    value = ((DateTime) value);
                    var year = ((DateTime)value).Year;
                    var month = ((DateTime) value).Month;
                    var day = ((DateTime) value).Day;
                    query += String.Format("{0}.Value.Day == {1} && {0}.Value.Month == {2} && {0}.Value.Year == {3}", targetTypeProperty.Name, day, month, year);
                    query = query + " && ";
                }
                else if (type == typeof (string))
                {
                    query = query + String.Format("{0}.ToString().Contains(\"{1}\")", targetTypeProperty.Name, value);
                    query = query + " && ";

                }
               
                else
                {
                    query = query + String.Format("{0} == {1}", targetTypeProperty.Name, value);
                    query = query + " && ";
                }
                
               
            }
            if(query.Length > 4)
                query = query.Substring(0, query.Length - 4);
//            SqlFunctions.DateAdd("day", 0, o.ReportDueDateTime)
            var searchExpression = query;
            return !String.IsNullOrEmpty(searchExpression) ? source.Where(searchExpression) : source;
        }

        public static void CopyFrom<T1, T2>(this T1 dest, T2 source)
            where T1 : class
            where T2 : class
        {
            if (source == null)
                return;

            if (dest == null)
                return;

            var dataType = source.GetType();
            var dataTypeProperties = dataType.GetProperties();
            var targetType = dest.GetType();

            foreach (var dataTypeProperty in dataTypeProperties)
            {
                if (!dataTypeProperty.CanRead)
                    continue;

                var theProperty = targetType.GetProperty(dataTypeProperty.Name);

                if (theProperty == null)
                    continue;

                if (!theProperty.CanWrite)
                    continue;

                if (theProperty.PropertyType != dataTypeProperty.PropertyType)
                    continue;

                if (dataTypeProperty.GetGetMethod().IsVirtual || theProperty.GetGetMethod().IsVirtual)
                    continue;

                theProperty.SetValue(dest, dataTypeProperty.GetValue(source));
            }
        }
    }
}
