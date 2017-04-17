using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using Core;
using LinqKit;

namespace WebApiService
{
    public class BaseQueryExpression<T> where T : BaseEntityModel 
    {
        public static IQueryable<T> DefaultSearchQueryable(IQueryable<T> data, BaseQueryModel searchQuery)
        {
            var query = "";
            if (searchQuery.search == null) return data;

            if (String.IsNullOrEmpty(searchQuery.search.keyword))
                return data;
  
            searchQuery.search.fields.ForEach(f =>
            {
                query = query + String.Format("{0}.ToString().ToLower().Contains(\"{1}\")", f, searchQuery.search.keyword.ToLower());
                query = query + " || ";
            });

            query = query.Substring(0, query.Length - 4);

            var searchExpression = query;
            return !String.IsNullOrEmpty(searchExpression) ? data.Where(searchExpression) : data;
        }

        public static IQueryable<T> DefaultSortQueryable(IQueryable<T> data, BaseQueryModel searchQuery)
        {
            if (!String.IsNullOrEmpty(searchQuery.sort_by))
            {
                return searchQuery.is_sort_asc ? data.OrderBy(searchQuery.sort_by + " ASC") : data.OrderBy(searchQuery.sort_by + " DESC");
            }
            return data;
        }

        public static IQueryable<T> DefaultPaginateQueryable(IQueryable<T> data, BaseQueryModel searchQuery)
        {
            var take = searchQuery.row_per_page;
            var skip = (searchQuery.page - 1) * take;
            return data.Skip(skip).Take(take);
        }


        public static IEnumerable<T> DefaultSortQueryable(IEnumerable<T> data, BaseQueryModel searchQuery)
        {
            if (!String.IsNullOrEmpty(searchQuery.sort_by))
            {
                return searchQuery.is_sort_asc ? data.AsQueryable().OrderBy(searchQuery.sort_by + " ASC") : data.AsQueryable().OrderBy(searchQuery.sort_by + " DESC");
            }
            return data;
        }

        public static IEnumerable<T> DefaultPaginateQueryable(IEnumerable<T> data, BaseQueryModel searchQuery)
        {
            var take = searchQuery.row_per_page;
            var skip = (searchQuery.page - 1) * take;
            return data.Skip(skip).Take(take);
        }
    }
}
