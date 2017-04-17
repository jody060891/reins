using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public class BaseQueryModel
    {
        public int page { get; set; }
        public int row_per_page { get; set; }
        public string sort_by { get; set; }
        public bool is_sort_asc { get; set; }
        public int total_data { get; set; }
        public Search search { get; set; }

        public class Search
        {
            public string keyword { get; set; }
            public string[] fields { get; set; }
        }
    }
}
