using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
using Core.DTO.Sys;

namespace EF.SP
{
    public class sys_user_audit_trail_header_detail_fetch_with_mapping : IStoredProcedure<UserAuditTrailDetailMappingModel>
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public string Name { get; set; }
        public string ItemID { get; set; }
        public string TsqlScriptCreate()
        {
            return @"
            /*************************************************************************************************************************************
            Purpose:
            * This procedure will get the audit trail details
            **************************************************************************************************************************************
            * Revision History 
            **************************************************************************************************************************************
            * Name								Date							Description
            * ------------------------------------------------------------------------------------------------------------------------------------
            * SMT		 						04/19/2016						Created
            * Justinus Okky                     06/27/2016                      Updated, Refactor looping using cursor, refine incident details description
            * SMT                               07/01/2016                      Remove html tags for description
            **************************************************************************************************************************************
            Example: 
	            exec [dbo].[sys_user_audit_trail_header_detail_fetch_with_mapping] '05-05-2016', '05-05-2016', 'Eileen Cheah Lilian', null
            **************************************************************************************************************************************/

            ALTER PROCEDURE [dbo].[sys_user_audit_trail_header_detail_fetch_with_mapping]
            (
	            @DateFrom       DATE = NULL,
	            @DateTo         DATE = NULL,
	            @Name			NVARCHAR(MAX) = NULL,
	            @ItemID			NVARCHAR(MAX) = NULL
            )
            AS
            BEGIN
                IF OBJECT_ID(N'tempdb..#TempAuditTrail', N'U') IS NOT NULL DROP TABLE #TempAuditTrail;
	            IF OBJECT_ID(N'tempdb..#audit_trail_table', N'U') IS NOT NULL DROP TABLE #audit_trail_table;

		        declare @user_audit_trail_detail_id					bigint,
						@sql										nvarchar(4000),
				        @sql_orig									nvarchar(4000),
				        @sql_new									nvarchar(4000),
				        @action										nvarchar(max),
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
			            @display_original_value						nvarchar(max),
			            @display_new_value							nvarchar(max),
			            @display_column_id							nvarchar(4000),
			            @id_field_name								nvarchar(100),
			            @id_field_value								nvarchar(max),
			            @id_is_foreign_key							bit,
			            @id_foreign_key_table_name					nvarchar(100),
			            @id_foreign_key_field_name					nvarchar(100),
			            @id_foreign_key_field_to_display_name		nvarchar(100),
			            @pk_field									nvarchar(100),
			            @last_updated_by							nvarchar(100),
			            @last_updated_date							datetime,
				        @item_id									nvarchar(max)

				declare @old_value_json table
				(	name		nvarchar(200),
					value		nvarchar(200)
				)       
				       
				declare @new_value_json table
				(	name		nvarchar(200),
					value		nvarchar(200)
				)              

				CREATE TABLE #audit_trail_table 
				(
					action									nvarchar(max),
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
		            description								nvarchar(max),
					item_id									nvarchar(max)
				)

	            SELECT	atd.user_audit_trail_detail_id,
						row_no = ROW_NUMBER() OVER (ORDER BY atd.row_id),
						at.action,
						atd.row_id, --Data ID
			            atd.table_name, -- Module
			            atd.column_name,
			            fm.display_field_name,
			            fm.display_page_name, -- Page
			            fm.display_module_name,
			            atd.state,
			            atd.original_value,
			            atd.new_value,
			            fm.is_foreign_key,
			            fm.foreign_key_table_name,
			            fm.foreign_key_field_name,
			            fm.foreign_key_field_to_display_name,
			            atd.is_active,
			            at.name as last_updated_by, --user
			            IIF(atd.last_updated_date IS NULL, at.last_updated_date, atd.last_updated_date) AS last_updated_date, --action date / Timestamp
						fm.primary_key_field_name,
						at.item_id
				INTO	#TempAuditTrail
	            FROM	dbo.sys_user_audit_trail at
						LEFT JOIN dbo.sys_user_audit_trail_detail atd on atd.user_audit_trail_id = at.user_audit_trail_id
			            LEFT JOIN dbo.sys_field_mapping fm on (atd.table_name = fm.table_name AND atd.column_name = fm.field_name)
			            --LEFT JOIN dbo.master_user mu on mu.user_id = atd.last_updated_by
	            WHERE	CONVERT(DATE, at.created_date) BETWEEN @DateFrom AND @DateTo
	            AND		atd.table_name <> 'incident_rca_history'
				AND		atd.table_name <> 'incident_gcs'
				and		atd.table_name <> 'incident_gcs_detail'
				and		atd.table_name <> 'email_queue'
	            --AND		(LEN(ISNULL(atd.original_value, '')) > 0 OR LEN(ISNULL(atd.new_value, '')) > 0)
				AND		(@Name IS NULL OR at.name LIKE '%' + @Name + '%')
				AND		(@ItemID IS NULL OR at.item_id LIKE '%' + @ItemID + '%')
							
				declare main_cursor cursor for
				select	user_audit_trail_detail_id,
						action ,
						row_id ,
						table_name ,
						column_name ,
						display_field_name ,
						display_page_name ,
						display_module_name ,
						state ,
						original_value ,
						new_value ,
						is_foreign_key ,
						foreign_key_table_name ,
						foreign_key_field_name ,
						foreign_key_field_to_display_name ,
						is_active ,
						last_updated_by ,
						last_updated_date ,
						primary_key_field_name ,
						item_id
				FROM	#TempAuditTrail at

				open main_cursor
				fetch next from main_cursor
				into	@user_audit_trail_detail_id,
						@action,				@row_id,				@table_name,			@column_name,			
						@display_field_name,	@display_page_name,		@display_module_name,	@state,
						@original_value,		@new_value,				@is_foreign_key,		@foreign_key_table_name,
						@foreign_key_field_name,	@foreign_key_field_to_display_name ,		@is_active ,
						@last_updated_by,		@last_updated_date,		@pk_field,				@item_id

				while @@fetch_status = 0
				begin
					SET @display_original_value = @original_value
					SET @display_new_value = @new_value

					if (@table_name = 'incident_main_info' and @column_name = 'main_template_value')
					begin
						
						if @original_value is null or @original_value = ''
							set @original_value = '{}'
						
						insert into @old_value_json
						        ( name, value )
						select	Name, StringValue from dbo.parseJSON(@original_value)
						
						insert into @new_value_json
						        ( name, value )
						select	Name, StringValue from dbo.parseJSON(@new_value)						
						
						declare @json_field_name	nvarchar(200),
								@json_old_value		nvarchar(200),
								@json_new_value		nvarchar(200),
								@sentence_old		nvarchar(500) = '',
								@sentence_new		nvarchar(500) = '',
								@old_value_desc		nvarchar(200)
						
						declare	incident_detail_cursor cursor for
						select	name ,
						        value 
						from	@new_value_json	                      
						where	name <> '-'

						open incident_detail_cursor
						fetch next from incident_detail_cursor into @json_field_name, @json_new_value

						while @@fetch_status = 0
						begin
							set @json_old_value = ''
							select	top 1
									@json_old_value = value
							from	@old_value_json 
							where	name = @json_field_name

							if @json_old_value is null or @json_old_value = ''
							begin
								set @old_value_desc = '<empty>'                          
							end 
							else set @old_value_desc = @json_old_value
							
							if @old_value_desc <> @json_new_value
							begin
								set @sentence_old = @sentence_old + @json_field_name + ': ' + @old_value_desc +'; '
								set @sentence_new = @sentence_new + @json_field_name + ': ' + @json_new_value + '; '
							end
							                      
							fetch next from incident_detail_cursor into @json_field_name, @json_new_value                      
						end 

						close incident_detail_cursor
						deallocate incident_detail_cursor

						SET @display_original_value = '(' + @sentence_old + ')'
						SET @display_new_value = '(' + @sentence_new + ')'
					end                  

					IF @is_foreign_key = 1
					BEGIN
						BEGIN TRY
							IF LEN(ISNULL(@original_value, '')) > 0
							BEGIN
								SET @sql =	'SELECT @display_value=' + @foreign_key_field_to_display_name + ' ' +
											'FROM ' + @foreign_key_table_name + ' ' +
											'WHERE ' + @foreign_key_field_name + ' = @original_value'
								execute sp_executesql @sql, N'@display_value nvarchar(4000) output, @original_value nvarchar(4000)', @display_value = @display_original_value output, @original_value = @original_value
							END
									
							IF LEN(ISNULL(@new_value, '')) > 0
							BEGIN
								SET @sql =	'SELECT @display_value=' + @foreign_key_field_to_display_name + ' ' +
											'FROM ' + @foreign_key_table_name + ' ' +
											'WHERE ' + @foreign_key_field_name + ' = @new_value'
								execute sp_executesql @sql, N'@display_value nvarchar(4000) output, @new_value nvarchar(4000)', @display_value = @display_new_value output, @new_value = @new_value
							END
						END TRY
						BEGIN CATCH
							PRINT CONCAT('ERROR AT LINE ', ERROR_LINE(), ', SEVERITY=', ERROR_SEVERITY(), ', MESSAGE=', ERROR_MESSAGE())
						END CATCH
					end
  
					INSERT INTO #audit_trail_table
					(	action,
						row_id ,
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
						description,
						item_id
					)
					values  
					(	@action,
						@row_id ,
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
						dbo.fn_strip_html(CONCAT(IIF(@state = 'Modified', 'Changed', @state),' ', LOWER(isnull(@display_field_name, @column_name)), IIF(LEN(ISNULL(@display_original_value, '')) > 0 AND LEN(ISNULL(@display_new_value, '')) > 0, (' FROM '''+ @display_original_value+ ''' to '''+ @display_new_value +''''), 
																												(IIF(LEN(ISNULL(@display_new_value, '')) > 0, ' '''+ @display_new_value + '''', ''))))),
						@item_id																										
					)                              
                            
					fetch next from main_cursor
					into	@user_audit_trail_detail_id,
							@action,				@row_id,				@table_name,			@column_name,			
							@display_field_name,	@display_page_name,		@display_module_name,	@state,
							@original_value,		@new_value,				@is_foreign_key,		@foreign_key_table_name,
							@foreign_key_field_name,	@foreign_key_field_to_display_name ,		@is_active ,
							@last_updated_by,		@last_updated_date,		@pk_field,				@item_id                          
				end                          

				close main_cursor
				deallocate main_cursor
                            
	            SELECT	t.last_updated_date as [Action Date],
						t.last_updated_by AS [User],
						t.action AS [Activity Description],
						t.item_id AS [Data ID],
						t.display_module_name AS [Module],
						t.display_page_name AS [Page],
						t.description AS [Description]
				FROM	#audit_trail_table t
				ORDER BY t.last_updated_date
            END";
        }

        public string TsqlScriptDrop()
        {
            return @"
            IF OBJECT_ID('dbo.sys_user_audit_trail_header_detail_fetch_with_mapping') IS NOT NULL
                drop procedure [dbo].[sys_user_audit_trail_header_detail_fetch_with_mapping]";
        }
    }
}
