using desafio.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;


namespace desafio.Infrastructure.Configurations
{
    public class DbFactoryDbContext : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer("Server=10.30.0.36;Database=DBTeste2;User Id=usrsquadra;Password=usrsquadra090807");
            DataContext context = new DataContext(optionsBuilder.Options);

            return context;
        }
    }
}
