using desafio.Domain.Usuarios;
using desafio.Infrastructure.Data.Mappings;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace desafio.Infrastructure.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
           
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UsuarioMapping());
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Usuario> Usuario { get; set; }
    }
}
