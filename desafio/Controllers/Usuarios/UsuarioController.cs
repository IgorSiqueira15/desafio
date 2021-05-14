using desafio.Domain.Usuarios;
using desafio.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace desafio.Controllers.Usuarios
{
    [ApiController]
    [Route("/Usuario")]
    public class UsuarioController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Usuario>>> Get([FromServices] DataContext context)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer("Server=10.30.0.36;Database=DBTeste2;User Id=usrsquadra;Password=usrsquadra090807");
            context = new DataContext(optionsBuilder.Options);

            var migracoesPendentes = context.Database.GetPendingMigrations();

            if (migracoesPendentes.Count() > 0)
            {
                context.Database.Migrate();
            }

            var usuarios = context.Usuario.ToList();

            return usuarios;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Usuario>> Post([FromServices] DataContext context, [FromBody] Usuario model)
        {
            var usuario = Usuario.New(model.Nome, model.Sobrenome, model.Email, model.DataNascimento, model.Escolaridade);
             context.Usuario.Add(usuario);
                
             await context.SaveChangesAsync();
                
             return model;       
        }

        [HttpPut]
        [Route("{usuarioId:int}")]
        public async Task<ActionResult<Usuario>> Put([FromServices] DataContext context, [FromBody] Usuario model, int usuarioId)
        {
            var usuario = context.Usuario.FirstOrDefault(x => x.ID == usuarioId);

            usuario.Nome = model.Nome;
            usuario.Sobrenome = model.Sobrenome;
            usuario.Email = model.Email;
            usuario.DataNascimento = model.DataNascimento;
            usuario.Escolaridade = model.Escolaridade;

            context.Usuario.Update(usuario);

            await context.SaveChangesAsync();

            return model;
        }

        [HttpDelete]
        [Route("{usuarioId:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<Usuario>> Delete([FromServices] DataContext context, int usuarioId)
        {
            var usuario = context.Usuario.FirstOrDefault(x => x.ID == usuarioId);
            context.Usuario.Remove(usuario);

            await context.SaveChangesAsync();

            return usuario;
        }


    }
}
