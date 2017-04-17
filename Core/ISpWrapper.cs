using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public interface ISpWrapper
    {
        IEnumerable<TResult> ExecuteQueryStoredProcedure<TResult>(IStoredProcedure<TResult> procedure);
        int ExecuteNonQueryStoredProcedure(IStoredProcedure procedure);
        DataSet ExecuteQueryStoredProcedureAsDataSet<TResult>(IStoredProcedure<TResult> procedure, params string[] tableNames);
    }
}
