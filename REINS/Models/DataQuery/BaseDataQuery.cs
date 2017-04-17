using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using LinqKit;

namespace HITS.Models.DataQuery
{
    public class OrderByQuery
    {
        public LambdaExpression orderByFunction { get; set; }
        public bool orderByAscending { get; set; }
    }

    public class OrderByState
    {
        public bool active { get; set; }
        public string identifier { get; set; }
        public bool asc { get; set; }
    }

    public abstract class BaseDataQuery<T> : IDataQuery<T>
    {
        private IQueryable<T> data { get; set; }
        private List<Expression<Func<T, bool>>> searchFunction { get; set; }
        private List<OrderByQuery> orderByFunction { get; set; }

        public List<OrderByState> sort { get; set; }
        public string searchTerm { get; set; }
        public int page { get; set; }
        public int rowPerPage { get; set; }
        public int totalPage { get; set; }
        public int totalData { get; set; }
        public bool limit { get; set; }

        public long institution_id { get; set; }
        public long implementor_id { get; set; }

        public abstract void Configure();

        protected BaseDataQuery()
        {
            searchFunction = new List<Expression<Func<T, bool>>>();
            orderByFunction = new List<OrderByQuery>();
            rowPerPage = 20;
            page = 0;
            limit = false;
            totalPage = 1;
        }

        public virtual IDataQuery<T> Search(Expression<Func<T, bool>> search)
        {
            searchFunction.Add(search);
            return this;
        }

        public virtual IDataQuery<T> OrderBy<TValue>(Expression<Func<T, TValue>> orderBy, bool descending = false)
        {
            orderByFunction.Add(new OrderByQuery()
            {
                orderByFunction = orderBy,
                orderByAscending = descending
            });
            return this;
        }

        public virtual IDataQuery<T> All(IQueryable<T> dataSource)
        {
            data = dataSource;
            return this;
        }

        private IOrderedQueryable<T> InvokeOrderBy(IQueryable<T> source, LambdaExpression expression, string methodName)
        {
            return (IOrderedQueryable<T>)typeof(Queryable).GetMethods().Single(
                m => m.Name == methodName
                        && m.IsGenericMethodDefinition
                        && m.GetGenericArguments().Length == 2
                        && m.GetParameters().Length == 2)
                        .MakeGenericMethod(typeof(T), expression.Body.Type)
                        .Invoke(null, new object[] { source, expression });
        }

        public virtual IQueryable<T> Result()
        {
            var allData = data.AsExpandable();
            if (searchFunction.Count > 0)
            {
                var predicate = PredicateBuilder.False<T>();
                // Later used as build predicate
                searchFunction.ForEach(k =>
                {
                    predicate = predicate.Or(k);
                });

                allData = allData.Where(predicate);
            }

            totalData = allData.Count();
            totalPage = 0; // To cater for this line of code "json.data.totalPage <= 0" in the javascripts
            if (totalData > rowPerPage)
            {
                totalPage = (int)Math.Ceiling((double)(totalData / rowPerPage));
                if (totalPage % rowPerPage != 0)
                    totalPage += 1;
            }


            if (page < 1) page = 1;
            if (page > totalPage)
                page = totalPage;

            var skip = (page - 1) * rowPerPage;
            if (skip < 0)
                skip = 0;

            var take = rowPerPage;

            if (orderByFunction.Count > 0)
            {
                IOrderedQueryable<T> sortedData = null;
                var index = 0;
                orderByFunction.ForEach(k =>
                {
                    if (index == 0)
                    {
                        //                        sortedData = k.orderByAscending ? allData.OrderBy(k.orderByFunction) : allData.OrderByDescending(k.orderByFunction);
                        sortedData = InvokeOrderBy(allData, k.orderByFunction, k.orderByAscending ? "OrderBy" : "OrderByDescending");
                    }
                    else if (sortedData != null)
                    {
                        //                        sortedData = k.orderByAscending ? sortedData.ThenBy(k.orderByFunction) : sortedData.ThenByDescending(k.orderByFunction);
                        sortedData = InvokeOrderBy(allData, k.orderByFunction, k.orderByAscending ? "ThenBy" : "ThenByDescending");
                    }
                    index += 1;
                });

                return limit ? sortedData.Skip(skip).Take(take).AsQueryable() : sortedData.AsQueryable();
            }

            return limit ? allData.Skip(skip).Take(take).AsQueryable() : allData.AsQueryable();
        }

        public virtual IQueryable<TResult> ResultAs<TResult>(Func<T, TResult> transform)
        {
            var queriedData = Result();
            return queriedData.ToList()
                       .Select(transform)
                       .AsQueryable();
        }
    }
}