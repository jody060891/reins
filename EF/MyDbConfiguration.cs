using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EF
{
    public class MyDbConfiguration : DbConfiguration
    {
        public MyDbConfiguration()
        {
            this.AddInterceptor(new NVarcharInterceptor()); //add this line to existing config.
        }
    }
}
