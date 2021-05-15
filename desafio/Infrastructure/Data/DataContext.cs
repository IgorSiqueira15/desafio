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
        /*public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
           
        }
        */
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UsuarioMapping());
        }
        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=10.30.0.36;Database=DBTeste2;User Id=usrsquadra;Password=usrsquadra090807");
        }

        public DbSet<Usuario> Usuario { get; set; }
    }
}
