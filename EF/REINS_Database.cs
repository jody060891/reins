using System.CodeDom;
using System.Data.Entity;
using EF.Database.master;
using EF.Database.sys;
using EntityFramework.Functions;
using EntityFramework.OracleHelpers;

namespace EF
{
    [DbConfigurationType(typeof(MyDbConfiguration))]
    public class REINS_Database : DbContext
    {
        public REINS_Database() : base("REINS_Database")
        {
           
        }

        //        public DbSet<irpc_sys_field_mapping> SysFieldMapping { get; set; }
        //        public DbSet<irpc_sys_user_audit_trail> SysUserAuditTrails { get; set; }
        //        public DbSet<irpc_sys_user_audit_trail_detail> SysUserAuditTrailDetails { get; set; }
        //
        //        public DbSet<irpc_master_data_occupation> MasterOccupation{ get; set; }
        //        public DbSet<irpc_master_user> MasterUser { get; set; }
        //
        //        public DbSet<irpc_master_data_fh> MasterFh { get; set; }
        //        public DbSet<irpc_master_data_hub_konven> MasterHubKonven { get; set; }
        //        public DbSet<irpc_master_data_hub_syariah> MasterHubSyariah { get; set; }
        //        public DbSet<irpc_master_data_huk_cedant_lf> MasterHukCedantLf { get; set; }
        //        public DbSet<irpc_master_data_huk_cedant_lf_syariah> MasterHukCedantLfSyariah { get; set; }
        //        public DbSet<irpc_master_data_huk_cedant_nl> MasterHukCedantNl { get; set; }
        //        public DbSet<irpc_master_data_huk_cedant_nl_syariah> MasterHukCedantNlSyariah { get; set; }
        //
        //        public DbSet<irpc_master_data_risk_polis> MasterRiskPolise { get; set; }
        //
        //        public DbSet<irpc_sys_login_attempts> LoginAttempts { get; set; }

        public DbSet<Facul> Facul { get; set; }
        public DbSet<MasterUser> MasterUser { get; set; }
        public DbSet<MasterUwriter> Uwriter { get; set; }

        public DbSet<MasterSubType> MasterSubTypes { get; set; }
        public DbSet<MasterRole> MasterRoles { get; set; }

        public DbSet<MasterUserRole> MasterUserRoles { get; set; }
        public DbSet<MasterMenuListRole> MasterMenuListRoles { get; set; }

        public DbSet<MasterMenuList> MasterMenuList { get; set; }
        public DbSet<MasterSterr> MasterSterr { get; set; }
        public DbSet<MasterStatus> MasterStatus { get; set; }
        public DbSet<MasterCurrency> MasterCurrency { get; set; }
        public DbSet<MasterCompany> MasterCompany { get; set; }
        public DbSet<MasterCountry> MasterCountry { get; set; }
        public DbSet<MasterClass> MasterClass { get; set; }
        public DbSet<MasterTreaty> MasterTreaty { get; set; }
        public DbSet<MasterAtkJenisBisnis> MasterAtkJenisBisnis { get; set; }
        public DbSet<MasterAtkBagian> MasterAtkBagian { get; set; }
        public DbSet<MasterAtkBhatk> MasterAtkBhatk { get; set; }
        public DbSet<MasterAtkBdatk> MasterAtkBdatk { get; set; }
        public DbSet<MasterOpenCover> MasterOpenCover { get; set; }
        public DbSet<MasterMainClass> MasterMainClass { get; set; }
        public DbSet<MasterOpenCoverDoc> MasterOpenCoverDoc { get; set; }
        public DbSet<MasterStatement> MasterStatement { get; set; }
        public DbSet<MasterStatLine> MasterStatLine { get; set; }
        public DbSet<MasterStshed> MasterStshed { get; set; } 
        public DbSet<MasterJenisPremi> MasterJenisPremi { get; set; } 
        

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            //            

            //
            modelBuilder.Entity<Facul>()
                .HasOptional(f => f.MasterUwriter)
                .WithMany()
                .HasForeignKey(f => f.FacUwriter);
            modelBuilder.Entity<Facul>()
                .HasOptional(f => f.MasterSubType)
                .WithMany()
                .HasForeignKey(f => f.FacSubType);

            modelBuilder.Entity<MasterMenuList>()
                .HasOptional(f => f.ParentMenuList)
                .WithMany()
                .HasForeignKey(f => f.MenuParent);

            modelBuilder.Entity<MasterCompany>()
                .HasOptional(c => c.MasterCountry)
                .WithMany()
                .HasForeignKey(c => c.CompCont);



            modelBuilder.Entity<MasterTreaty>()
                .HasOptional(c => c.MasterSubType)
                .WithMany()
                .HasForeignKey(c => c.TrtSubType);

            modelBuilder.Entity<MasterTreaty>()
                .HasOptional(c => c.MasterSterr)
                .WithMany()
                .HasForeignKey(c => c.TrtSterr);

            modelBuilder.Entity<MasterTreaty>()
                .HasOptional(c => c.MasterStatus)
                .WithMany()
                .HasForeignKey(c => c.TrtAccSts);

            modelBuilder.Entity<MasterTreaty>()
                .HasOptional(c => c.MasterCurrency)
                .WithMany()
                .HasForeignKey(c => c.TrtCurrency);

            modelBuilder.Entity<MasterTreaty>()
                .HasOptional(c => c.MasterClass)
                .WithMany()
                .HasForeignKey(c => c.TrtClass);

            modelBuilder.Entity<MasterTreaty>()
                .HasOptional(c => c.MasterCompany)
                .WithMany()
                .HasForeignKey(c => c.TrtCedant);

            modelBuilder.Entity<MasterTreaty>()
                .HasOptional(c => c.MasterBroker)
                .WithMany()
                .HasForeignKey(c => c.TrtBroker);



            modelBuilder.Entity<MasterAtkBhatk>()
                .HasOptional(c => c.MasterAtkJenisBisnis)
                .WithMany()
                .HasForeignKey(c => c.KdBisns);

            modelBuilder.Entity<MasterAtkBhatk>()
               .HasOptional(c => c.MasterAtkBagian)
               .WithMany()
               .HasForeignKey(c => c.KodeBag);


            modelBuilder.Entity<MasterOpenCover>()
                .HasOptional(oc => oc.MasterSubType)
                .WithMany()
                .HasForeignKey(cv => cv.FacSubType);

            modelBuilder.Entity<MasterOpenCover>()
                .HasOptional(oc => oc.MasterCompany)
                .WithMany()
                .HasForeignKey(oc => oc.FacCedant);

            modelBuilder.Entity<MasterOpenCover>()
               .HasOptional(oc => oc.MasterBroker)
               .WithMany()
               .HasForeignKey(oc => oc.FacBroker);

            modelBuilder.Entity<MasterOpenCover>()
                .HasOptional(oc => oc.MasterSterr)
                .WithMany()
                .HasForeignKey(oc => oc.FacSterr);

            modelBuilder.Entity<MasterOpenCover>()
                .HasOptional(oc => oc.MasterMainClass)
                .WithMany()
                .HasForeignKey(oc => oc.FacMainClass);

            modelBuilder.Entity<MasterOpenCover>()
                .HasOptional(oc => oc.MasterSubClass)
                .WithMany()
                .HasForeignKey(oc => oc.FacSubClass);

            modelBuilder.Entity<MasterOpenCover>()
                .HasOptional(oc => oc.MasterStatus)
                .WithMany()
                .HasForeignKey(oc => oc.FacAccSts);

//            modelBuilder.Entity<MasterOpenCoverDoc>()
//                .HasOptional(opd => opd.MasterOpenCover)
//                .WithMany()
//                .HasForeignKey(opd => opd.TrtimgCode);

            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.Treaty)
                .WithMany()
                .HasForeignKey(st => st.StatTrt);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.JenisPremi)
                .WithMany()
                .HasForeignKey(st => st.StatJpc);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.Currency)
                .WithMany()
                .HasForeignKey(st => st.StatCurr);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.Cedant)
                .WithMany()
                .HasForeignKey(st => st.StatCedant);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.Broker)
                .WithMany()
                .HasForeignKey(st => st.StatBroker);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.SubClass)
                .WithMany()
                .HasForeignKey(st => st.StatSclass);

            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine1)
                .WithMany()
                .HasForeignKey(st => st.StatLn01);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine2)
                .WithMany()
                .HasForeignKey(st => st.StatLn02);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine3)
                .WithMany()
                .HasForeignKey(st => st.StatLn03);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine4)
                .WithMany()
                .HasForeignKey(st => st.StatLn04);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine5)
                .WithMany()
                .HasForeignKey(st => st.StatLn05);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine6)
                .WithMany()
                .HasForeignKey(st => st.StatLn06);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine7)
                .WithMany()
                .HasForeignKey(st => st.StatLn07);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine8)
                .WithMany()
                .HasForeignKey(st => st.StatLn08);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine9)
                .WithMany()
                .HasForeignKey(st => st.StatLn09);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine10)
                .WithMany()
                .HasForeignKey(st => st.StatLn10);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine11)
                .WithMany()
                .HasForeignKey(st => st.StatLn11);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine12)
                .WithMany()
                .HasForeignKey(st => st.StatLn12);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine13)
                .WithMany()
                .HasForeignKey(st => st.StatLn13);
            modelBuilder.Entity<MasterStatement>()
                .HasOptional(st => st.StatLine14)
                .WithMany()
                .HasForeignKey(st => st.StatLn14);


            modelBuilder.Entity<MasterStatLine>()
                .HasOptional(st => st.Stshed)
                .WithMany()
                .HasForeignKey(st => st.LineStsGrp);

            System.Data.Entity.Database.SetInitializer<REINS_Database>(null);
            modelBuilder.Conventions.Add(new FunctionConvention(typeof(OracleFunctions)));
            this.ApplyAllConventionsIfOracle(modelBuilder);
            modelBuilder.HasDefaultSchema("REINS");
            base.OnModelCreating(modelBuilder);
           
            
        }

    }
}