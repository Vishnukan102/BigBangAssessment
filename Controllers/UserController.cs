using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace RoleBasedAuthentication3.Models
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class UserController : ControllerBase
    {
        private readonly DPContext _context;

        public UserController(DPContext context)
        {
            _context = context;
        }

       
  


       
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
           
            var existingUser = await _context.User_set.FirstOrDefaultAsync(a => a.UserEmail == model.UserEmail);
            if (existingUser != null)
            {
                return BadRequest("User with the same email already exists");
            }

           
            var admin = new User
            {
                UserFirstName = model.UserFirstName,
                UserLastName = model.UserLastName,
                UserEmail = model.UserEmail,
                Gender = model.Gender,
                ContactNumber = model.ContactNumber,
                Password = model.Password,
                Role = model.Role,
                Qualification = model.Qualification,
                Specialization=model.Specialization,
                Experience=model.Experience,
                Hospital=model.Hospital,
                Address=model.Address,
                Reason=model.Reason
            };

            _context.User_set.Add(admin);
            await _context.SaveChangesAsync();

            if (model.Role == "Doctor")
            {
                var doctor = new Doctor
                {
                    FirstName = model.UserFirstName,
                    LastName = model.UserLastName,
                    Email = model.UserEmail,
                    ContactNumber = model.ContactNumber,
                    Qualification = model.Qualification,
                    Specialization=model.Specialization,
                    Experience=model.Experience,
                    Hospital=model.Hospital,
                };

                _context.Doctor_set.Add(doctor);
                await _context.SaveChangesAsync();
            }

            return Ok("Registration successful");
        }


    }
}