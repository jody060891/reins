using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core;
using EntityFramework.Functions;
using Microsoft.SqlServer.Server;

namespace EF
{
    public static class OracleFunctions
    {
        
        [Function(FunctionType.BuiltInFunction, "REINS_USER_ENC_FUNCT")]
        public static string ReinsUserEncryption(this string value) => Function.CallNotSupported<string>();
    }
}
