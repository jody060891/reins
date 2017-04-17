using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public interface IStoredProcedure<TResult>
    {
        string TsqlScriptCreate();
        string TsqlScriptDrop();
    }

    public interface IStoredProcedure
    {
        string TsqlScriptCreate();
        string TsqlScriptDrop();
    }
}
