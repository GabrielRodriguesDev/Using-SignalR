﻿using Finansist.Database;
using Finansist.Database.Contexts;
using Finansist.Database.Helpers;
using Finansist.Database.Repositories;
using Finansist.Domain.Interfaces.Database;
using Finansist.Domain.Interfaces.Database.Helpers;
using Finansist.Domain.Interfaces.Database.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Finansist.CrossCutting
{
    public class ConfigureRepository
    {
        public static void ConfigureDI(IServiceCollection services)
        {
            var connectionString = "Server=localhost;Port=3306;Database=finansist;Uid=root;Pwd=fx870";
            #region Context And Transaction
            services.AddDbContext<FinansistContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)).LogTo(Console.Write));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            #endregion

            #region Repository
            services.AddScoped<FinansistContext, FinansistContext>();
            services.AddScoped<IEntidadeRepository, EntidadeRepository>();
            #endregion

            #region Helpers
            services.AddScoped<IControleSequenciaHelper, ControleSequenciaHelper>();
            #endregion
        }
    }
}
