using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.DTO.Sys;

namespace EF.SP
{
    public class REINS_USER_ENC : IStoredProcedure<string>
    {
        public string p_TEXT { get; set; }
        public string TsqlScriptCreate()
        {
            return @"
            CREATE OR REPLACE FUNCTION REINS.REINS_USER_ENC_FUNCT RETURN VARCHAR2 IS
            inputText CHAR(16) := @p_TEXT;

            BEGIN
               RETURN(REINS.PARA.ENCR_STR(inputText));
            END;";
        }

        public string TsqlScriptDrop()
        {
            return @"
            IF OBJECT_ID('REINS.REINS_USER_ENC_FUNCT') IS NOT NULL
                drop FUNCTION REINS.REINS_USER_ENC_FUNCT";
        }
    }
}
