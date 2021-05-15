using desafio.Domain.Usuarios;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace desafio.Infrastructure.Data.Mappings
{
    public class UsuarioMapping : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("TB_Usuario");

            builder.HasKey(x => x.ID);
            builder.Property(x => x.Nome).HasColumnType("VARCHAR(50)");
            builder.Property(x => x.Sobrenome).HasColumnType("VARCHAR(80)");
            builder.Property(x => x.Email).HasColumnType("VARCHAR(120)");
            builder.Property(x => x.DataNascimento).HasColumnType("DATE");
            builder.Property(x => x.Escolaridade).HasConversion<int>();
        }
    }
}
