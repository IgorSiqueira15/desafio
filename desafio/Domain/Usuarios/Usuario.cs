using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace desafio.Domain.Usuarios
{
    public class Usuario
    {
        public int ID { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }
        public int Escolaridade { get; set; }
     
        private Usuario() { }

        public static Usuario New(string nome, string sobrenome, string email, DateTime dataNascimento, int escolaridade)
        {
            var usuario = new Usuario
            {
                Nome = nome,
                Sobrenome = sobrenome,
                Email = email,
                DataNascimento = dataNascimento,
                Escolaridade = escolaridade
            };

            usuario.Validate();

            return usuario;
        }

        private void Validate()
        {
            if(DataNascimento > DateTime.Now)
            {
                throw new ValidationException("A data de nascimento não pode ser maior que a data atual.");
            }
            if (Escolaridade <= 0)
            {
                throw new ValidationException("Escolaridade é um campo obrigatório.");
            }
        }
        
    }
}
