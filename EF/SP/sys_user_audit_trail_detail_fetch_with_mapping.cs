using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.DTO.Sys;

namespace EF.SP
{
    public class sys_user_audit_trail_detail_fetch_with_mapping : IStoredProcedure<UserAuditTrailDetailMappingModel>
    {
        public long p_user_audit_trail_id { get; set; }
        public string TsqlScriptCreate()
        {
            return @"
            create PROCEDURE dbo.sys_user_audit_trail_detail_fetch_with_mapping
            (
	            @p_user_audit_trail_id			bigint
            )
            as
            begin
	            declare @sql										nvarchar(4000),
			            @row_id										bigint,
			            @table_name									nvarchar(100),
			            @column_name								nvarchar(100),
			            @display_field_name							nvarchar(100),
			            @display_page_name							nvarchar(100),
			            @display_module_name						nvarchar(100),
			            @state										nvarchar(50),
			            @original_value								nvarchar(max),
			            @new_value									nvarchar(max),
			            @is_foreign_key								bit,
			            @foreign_key_table_name						nvarchar(100),
			            @foreign_key_field_name						nvarchar(100),
			            @foreign_key_field_to_display_name			nvarchar(100),
			            @is_active									bit,
			            @display_original_value					nvarchar(max),
			            @display_new_value						nvarchar(max),
			            @display_column_id						nvarchar(4000),
			            @id_field_name							nvarchar(100),
			            @id_field_value							nvarchar(max),
			            @id_is_foreign_key						bit,
			            @id_foreign_key_table_name				nvarchar(100),
			            @id_foreign_key_field_name				nvarchar(100),
			            @id_foreign_key_field_to_display_name	nvarchar(100),
			            @pk_field								nvarchar(100),
			            @last_updated_by						nvarchar(100),
			            @last_updated_date						datetime
  
	            declare	@audit_trail_table table
	            (
		            row_id									bigint,
		            table_name								nvarchar(100),
		            column_name								nvarchar(100),
		            display_field_name						nvarchar(100),
		            display_page_name						nvarchar(100),
		            display_module_name						nvarchar(100),
		            state									nvarchar(50),
		            original_value							nvarchar(max),
		            display_original_value					nvarchar(max),
		            new_value								nvarchar(max),
		            display_new_value						nvarchar(max),
		            display_column_id						nvarchar(4000),
		            last_updated_by							nvarchar(100),
		            last_updated_date						datetime,
		            description								nvarchar(max)
                )		
	
	            declare	audit_cursor cursor for
	            select	atd.row_id,
			            atd.table_name,
			            atd.column_name,
			            fm.display_field_name,
			            fm.display_page_name,
			            fm.display_module_name,
			            atd.state,
			            atd.original_value,
			            atd.new_value,
			            fm.is_foreign_key,
			            fm.foreign_key_table_name,
			            fm.foreign_key_field_name,
			            fm.foreign_key_field_to_display_name,
			            atd.is_active,
			            mu.name as last_updated_by,
			            atd.last_updated_date
	            from	dbo.sys_user_audit_trail_detail atd
			            left join dbo.sys_field_mapping fm on (atd.table_name = fm.table_name and atd.column_name = fm.field_name)
			            left join dbo.master_user mu on mu.user_id = atd.last_updated_by
	            where	user_audit_trail_id = @p_user_audit_trail_id	
	            and		atd.table_name <> 'incident_rca_history'
	            and		(LEN(ISNULL(atd.original_value, '')) > 0 or LEN(ISNULL(atd.new_value, '')) > 0)

	            open audit_cursor
	            fetch next from audit_cursor
	            into	@row_id,
			            @table_name,
			            @column_name,
			            @display_field_name,
			            @display_page_name,
			            @display_module_name,
			            @state,
			            @original_value,
			            @new_value,
			            @is_foreign_key,
			            @foreign_key_table_name,
			            @foreign_key_field_name,
			            @foreign_key_field_to_display_name,
			            @is_active,
			            @last_updated_by,
			            @last_updated_date
	
	            while @@FETCH_STATUS = 0
	            begin
		            set @display_original_value = @original_value
		            set @display_new_value = @new_value
		            if @is_foreign_key = 1
		            begin
			            set @sql =	'select @display_value=' + @foreign_key_field_to_display_name + ' ' +
						            'from ' + @foreign_key_table_name + ' ' +
						            'where ' + @foreign_key_field_name + ' = @original_value'
			            execute sp_executesql @sql, N'@display_value nvarchar(4000) output, @original_value nvarchar(4000)', @display_value = @display_original_value output, @original_value = @original_value

			            set @sql =	'select @display_value=' + @foreign_key_field_to_display_name + ' ' +
						            'from ' + @foreign_key_table_name + ' ' +
						            'where ' + @foreign_key_field_name + ' = @new_value'
			            execute sp_executesql @sql, N'@display_value nvarchar(4000) output, @new_value nvarchar(4000)', @display_value = @display_new_value output, @new_value = @new_value
		            end

		            select	@pk_field = column_name
		            from	information_schema.table_constraints tc
				            join information_schema.constraint_column_usage ccu on (tc.constraint_name = ccu.constraint_name)
		            where	tc.constraint_type = 'Primary Key'
		            and		tc.table_name = @table_name

		            select	top 1
				            @id_field_name = field_name,
				            @id_is_foreign_key = is_foreign_key,
				            @id_foreign_key_table_name = foreign_key_table_name,
				            @id_foreign_key_field_name = foreign_key_field_name,
				            @id_foreign_key_field_to_display_name = foreign_key_field_to_display_name
		            from	dbo.sys_field_mapping
		            where	table_name = @table_name
		            and		is_identifier = 1
		
		            set @sql = N'	select	@id_field_value = ' + @id_field_name +
					            '	from	' + @table_name + 
					            '	where	' + @pk_field + ' = @row_id' 
		
		            execute sp_executesql @sql, N'@id_field_value nvarchar(4000) output, @row_id bigint', @id_field_value = @id_field_value output, @row_id = @row_id
		
		            set @display_column_id = @id_field_value
		
		            if @id_is_foreign_key = 1
		            begin
			            set @sql = N'	select	@display_column_id = ' + @id_foreign_key_field_to_display_name +
						            '	from	' + @id_foreign_key_table_name +
						            '	where	' + @id_foreign_key_field_name + '= @id_field_value'
			            execute sp_executesql @sql, N'@display_column_id nvarchar(4000) output, @id_field_value nvarchar(4000)', @display_column_id = @display_column_id output, @id_field_value = @id_field_value
		            end
		

		            insert into @audit_trail_table
		            (	row_id ,
		                table_name ,
		                column_name ,
		                display_field_name ,
		                display_page_name ,
		                display_module_name ,
		                state ,
		                original_value ,
		                display_original_value ,
		                new_value ,
		                display_new_value,
			            display_column_id,
			            last_updated_by,
			            last_updated_date,
			            description
		            )
		            values  
		            (	@row_id ,
		                @table_name ,
		                @column_name ,
		                isnull(@display_field_name, @column_name),
		                @display_page_name ,
		                @display_module_name ,
		                @state ,
		                @original_value ,
		                @display_original_value ,
		                @new_value ,
		                @display_new_value,
			            @display_column_id,
			            @last_updated_by,
			            @last_updated_date,
			            dbo.fn_strip_html(CONCAT(IIF(@state = 'Modified', 'Changed', @state),' ', LOWER(isnull(@display_field_name, @column_name)), IIF(LEN(ISNULL(@display_original_value, '')) > 0 and LEN(ISNULL(@display_new_value, '')) > 0, (' from '''+ @display_original_value+ ''' to '''+ @display_new_value +''''), 
																									            (IIF(LEN(ISNULL(@display_new_value, '')) > 0, ' '''+ @display_new_value + '''', '')))))
		            )

		            fetch next from audit_cursor
		            into	@row_id,
				            @table_name,
				            @column_name,
				            @display_field_name,
				            @display_page_name,
				            @display_module_name,
				            @state,
				            @original_value,
				            @new_value,
				            @is_foreign_key,
				            @foreign_key_table_name,
				            @foreign_key_field_name,
				            @foreign_key_field_to_display_name,
				            @is_active,
				            @last_updated_by,
				            @last_updated_date
	            end			

	            close audit_cursor
	            deallocate audit_cursor

	            select	*
	            from	@audit_trail_table
            end";
        }

        public string TsqlScriptDrop()
        {
            return @"
            IF OBJECT_ID('dbo.sys_user_audit_trail_detail_fetch_with_mapping') IS NOT NULL
                drop procedure [dbo].[sys_user_audit_trail_detail_fetch_with_mapping]";
        }
    }
}
