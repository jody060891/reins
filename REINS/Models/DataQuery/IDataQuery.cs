using System;
using System.Linq;
using System.Linq.Expressions;

namespace HITS.Models.DataQuery
{
    public interface IDataQuery<T>
    {
        void Configure();
        IDataQuery<T> Search(Expression<Func<T, bool>> search);
        IDataQuery<T> OrderBy<TValue>(Expression<Func<T, TValue>> orderBy, bool descending = false);
        IDataQuery<T> All(IQueryable<T> dataSource);
        IQueryable<T> Result();
        IQueryable<TResult> ResultAs<TResult>(Func<T, TResult> transform);
    }
}