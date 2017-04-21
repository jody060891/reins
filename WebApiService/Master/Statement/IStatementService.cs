using System.Collections.Generic;
using Core.DTO.Master;
using Core;

namespace WebApiService.Master.Statement
{
    public interface IStatementService
    {
        BaseOperationResultModel Save(StatementModel statement);
        BaseOperationResultModel Delete(StatementModel statement);

        BaseOperationResultModel FetchOne(long statement);
        List<StatementModel> FetchAll();

        List<StatementModel> FetchAllWithPagination(ref BaseQueryModel searchQuery, StatementModel statementNo);

    }
}
