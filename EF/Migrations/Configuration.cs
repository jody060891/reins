using System;
using System.Data.Entity;
using System.IO;


namespace EF.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<REINS_Database>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        private static string GetSeed(string file)
        {
            var baseDir = string.Format("{0}/../../Seeder", AppDomain.CurrentDomain.BaseDirectory);
            return File.ReadAllText(string.Format("{0}/{1}", baseDir, file));
        }

        protected override void Seed(REINS_Database context)
        {
            /*
            DropObjects(context);
            CreateObjects(context);
             * */
            /*
            context.Database.ExecuteSqlCommand(GetSeed("master_institution.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_discipline.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_department.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_designation.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_employee_category.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_incident_type.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_incident_sub_type.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_location.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_routing_flow_level.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_user.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_root_cause_category.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_root_cause.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_gcs.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_gcs_detail.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("sys_application.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("sys_module_group.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("sys_module.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("sys_application_setting.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_role.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_role_acl.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_user_role.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_patient_class.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_patient_location.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_email_template.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_incident_type_severe.sql"));
            context.Database.ExecuteSqlCommand(GetSeed("master_incident_sac_severe.sql"));
            
            var sw = new SpWrapper(context);
            sw.ExecuteNonQueryStoredProcedure(new master_acl_data_seeder());
            sw.ExecuteNonQueryStoredProcedure(new master_acl_seeder());
             */ 
        }

        private static void DropObjects(DbContext context)
        {
            //context.Database.ExecuteSqlCommand(new master_acl_data_create().TsqlScriptDrop());
            //context.Database.ExecuteSqlCommand(new master_acl_create().TsqlScriptDrop());

            //context.Database.ExecuteSqlCommand(new master_acl_data_seeder().TsqlScriptDrop());
            //context.Database.ExecuteSqlCommand(new master_acl_seeder().TsqlScriptDrop());

            /*
            context.Database.ExecuteSqlCommand(new master_acl_insert().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new master_acl_delete().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new master_acl_update_parent_node().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_one().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_all().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_all_descendant().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_all_by_institution_id().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_all_by_role_id().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_all_by_user_id().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new incident_main_info_fecth_top_five().TsqlScriptDrop());

            context.Database.ExecuteSqlCommand(new ens_incidence_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new ens_police_report_logged_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new ens_sharp_injury_among_hcw_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new ens_sharp_injury_by_department_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new ens_sharps_injury_mot_dsot_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new ens_workplace_aggression_n7_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new ens_workplace_aggression_report().TsqlScriptDrop());

            context.Database.ExecuteSqlCommand(new me_safety_committee_by_location().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new me_safety_committee_by_staff().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new me_type_of_medication_error().TsqlScriptDrop());

            context.Database.ExecuteSqlCommand(new ham_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new hospital_occurrence_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new root_cause_classification_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new sac_score_per_incident_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new sac_score_report().TsqlScriptDrop());
            context.Database.ExecuteSqlCommand(new sre_number_report().TsqlScriptDrop());
            //context.Database.ExecuteSqlCommand(new type_of_incident_report().TsqlScriptDrop());
             * */
        }

        private static void CreateObjects(DbContext context)
        {
            //context.Database.ExecuteSqlCommand(new master_acl_data_create().TsqlScriptCreate());
            //context.Database.ExecuteSqlCommand(new master_acl_create().TsqlScriptCreate());

           // context.Database.ExecuteSqlCommand(new master_acl_data_seeder().TsqlScriptCreate());
            //context.Database.ExecuteSqlCommand(new master_acl_seeder().TsqlScriptCreate());
            /*
            context.Database.ExecuteSqlCommand(new master_acl_insert().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new master_acl_delete().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new master_acl_update_parent_node().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_one().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_all().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_all_descendant().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_all_by_institution_id().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_all_by_role_id().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new master_acl_fetch_all_by_user_id().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new incident_main_info_fecth_top_five().TsqlScriptCreate());

            context.Database.ExecuteSqlCommand(new ens_incidence_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new ens_police_report_logged_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new ens_sharp_injury_among_hcw_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new ens_sharp_injury_by_department_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new ens_sharps_injury_mot_dsot_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new ens_workplace_aggression_n7_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new ens_workplace_aggression_report().TsqlScriptCreate());

            context.Database.ExecuteSqlCommand(new me_safety_committee_by_location().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new me_safety_committee_by_staff().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new me_type_of_medication_error().TsqlScriptCreate());

            context.Database.ExecuteSqlCommand(new ham_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new hospital_occurrence_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new root_cause_classification_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new sac_score_per_incident_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new sac_score_report().TsqlScriptCreate());
            context.Database.ExecuteSqlCommand(new sre_number_report().TsqlScriptCreate());
            //context.Database.ExecuteSqlCommand(new type_of_incident_report().TsqlScriptCreate());
             * */
        }
    }
}
