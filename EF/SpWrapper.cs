using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Core;
using System.Data;
using Oracle.ManagedDataAccess.Client;

namespace EF
{
    public class SpWrapper : ISpWrapper
    {
        private readonly REINS_Database _context;

        public SpWrapper(REINS_Database context)
        {
            _context = context;
        }

        public IEnumerable<TResult> ExecuteQueryStoredProcedure<TResult>(IStoredProcedure<TResult> procedure)
        {
            var parameters = CreateSqlParametersFromProperties(procedure);
            var format = CreateSpCommand<TResult>(parameters, procedure);
            return _context.Database.SqlQuery<TResult>(format, parameters.Cast<object>().ToArray());
        }

        private static List<OracleParameter> CreateSqlParametersFromProperties<TResult>(IStoredProcedure<TResult> procedure)
        {
            var procedureType = procedure.GetType();
            var propertiesOfProcedure = procedureType.GetProperties(BindingFlags.Public | BindingFlags.Instance);

            var parameters = propertiesOfProcedure
                .Select(propertyInfo =>
                    new OracleParameter(
                        string.Format("@{0}", (object) propertyInfo.Name),
                        propertyInfo.GetValue(procedure, new object[] {}))
                )
                .ToList();
            return parameters;
        }

        private static string CreateSpCommand<TResult>(List<OracleParameter> parameters, IStoredProcedure<TResult> procedure)
        {
            var spName = procedure.GetType().Name;            
            var queryString = string.Format("{0}", spName);
            
            parameters.ForEach(x => queryString = string.Format("{0} {1},", queryString, x.ParameterName));

            return queryString.TrimEnd(',');
        }

        public int ExecuteNonQueryStoredProcedure(IStoredProcedure procedure)
        {
            var parameters = CreateSqlParametersFromProperties(procedure);
            var tSql = CreateSpCommand(parameters, procedure);
            return _context.Database.ExecuteSqlCommand(tSql, parameters);
        }

        private static List<OracleParameter> CreateSqlParametersFromProperties(IStoredProcedure procedure)
        {
            var procedureType = procedure.GetType();
            var propertiesOfProcedure = procedureType.GetProperties(BindingFlags.Public | BindingFlags.Instance);

            if (!propertiesOfProcedure.Any())
                return null;

            var parameters = propertiesOfProcedure
                .Select(propertyInfo =>
                    new OracleParameter(
                        string.Format("@{0}", (object)propertyInfo.Name),
                        propertyInfo.GetValue(procedure, new object[] { }))
                )
                .ToList();
            return parameters;
        }

        private static string CreateSpCommand(List<OracleParameter> parameters, IStoredProcedure procedure)
        {
            var spName = procedure.GetType().Name;
            var queryString = string.Format("{0}", spName);

            if (parameters != null)
                parameters.ForEach(x => queryString = string.Format("{0} {1},", queryString, x.ParameterName));

            return queryString.TrimEnd(',');
        }

        public DataSet ExecuteQueryStoredProcedureAsDataSet<TResult>(IStoredProcedure<TResult> procedure, params string[] tableNames)
        {
            var ds = new DataSet();
            var parameters = CreateSqlParametersFromProperties(procedure);
            var cmd = this._context.Database.Connection.CreateCommand();

            if (cmd.Connection.State != System.Data.ConnectionState.Open)
                cmd.Connection.Open();

            cmd.Parameters.AddRange(parameters.ToArray());
            cmd.CommandText = procedure.GetType().Name;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandTimeout = 1000; //TODO: This is not a good idea. Remove this later on and optimize your queries instead

            var reader = cmd.ExecuteReader();

            int i = 0;
            while (!reader.IsClosed)
            {
                var tableName = i < tableNames.Count() ? tableNames[i++] : string.Empty;
                DataTable dt = new DataTable(tableName);
                dt.Load(reader);
                ds.Tables.Add(dt);
            }

            if (cmd.Connection.State == System.Data.ConnectionState.Open)
                cmd.Connection.Close();

            return ds;
        }

    }
}
