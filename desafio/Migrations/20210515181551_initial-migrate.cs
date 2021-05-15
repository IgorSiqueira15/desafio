using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace desafio.Migrations
{
    public partial class initialmigrate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TB_Usuario",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "VARCHAR(50)", nullable: true),
                    Sobrenome = table.Column<string>(type: "VARCHAR(80)", nullable: true),
                    Email = table.Column<string>(type: "VARCHAR(120)", nullable: true),
                    DataNascimento = table.Column<DateTime>(type: "DATE", nullable: false),
                    Escolaridade = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TB_Usuario", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TB_Usuario");
        }
    }
}
