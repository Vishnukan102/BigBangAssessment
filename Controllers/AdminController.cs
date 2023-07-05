using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoleBasedAuthentication3.Models;
using System.Data;
using System.Numerics;
using System.Security.Claims;

namespace RoleBasedAuthentication3.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly DPContext _context;

        public AdminController(DPContext context)
        {
            _context = context;
        }
        [HttpGet("alldoctors")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllDoctors()
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            var doctors = _context.Doctor_set.ToList();
            return Ok(doctors);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetDoctorById(int id)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

            
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            var doctor = _context.Doctor_set.FirstOrDefault(d => d.DoctorId == id);

            if (doctor == null)
            {
                return BadRequest();
            }

            return Ok(doctor);
        }
        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
           
            var existingUser = await _context.User_set.FirstOrDefaultAsync(a => a.UserEmail == model.UserEmail);
            if (existingUser != null)
            {
                return BadRequest("User with the same email already exists");
            }
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

           
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
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
                Specialization = model.Specialization,
                Experience = model.Experience,
                Hospital = model.Hospital,
                Address = model.Address,
                Reason = model.Reason
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
                    Specialization = model.Specialization,
                    Experience = model.Experience,
                    Hospital = model.Hospital,
                };

                _context.Doctor_set.Add(doctor);
                await _context.SaveChangesAsync();
            }

            return Ok("Registration successful");
        }
        [HttpDelete("{doctorId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteDoctor(int doctorId)
        {
   
           
                var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
                var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

                if (roleClaim == null || roleClaim.Value != "Admin")
                {
                    return Unauthorized("Only users with the 'Admin' role can register users");
                }

                var patientIds = await _context.Patient_set
                    .Where(p => p.DoctorID == doctorId)
                    .Select(p => p.PatientId)
                    .ToListAsync();

                var doctor = await _context.Doctor_set.FindAsync(doctorId);
            if (doctor == null)
            {
                return BadRequest("User with the same email already exists");
            }
            var doctorEmail = doctor?.Email;

            foreach (var patientId in patientIds)
                {
                    var deletePatientQuery = $"DELETE FROM Patient_set WHERE PatientId = {patientId} AND DoctorID = {doctorId}";
                    await _context.Database.ExecuteSqlRawAsync(deletePatientQuery);
                }

                var deleteDoctorQuery = $"DELETE FROM Doctor_set WHERE DoctorId = {doctorId}";
                await _context.Database.ExecuteSqlRawAsync(deleteDoctorQuery);

                var deleteUserQuery = $"DELETE FROM User_set WHERE UserEmail = '{doctorEmail}'";
                await _context.Database.ExecuteSqlRawAsync(deleteUserQuery);

                return Ok();
            }


        


        [HttpPut("doctor/{doctorId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateDoctor(int doctorId, Doctor updatedDoctor)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

          
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
          
            var doctor = _context.Doctor_set.FirstOrDefault(d => d.DoctorId == doctorId);
            
            if (doctor == null)
            {
               
                return BadRequest("Doctor does not exist");
            }
            var test_email = doctor.Email;
         
            if (updatedDoctor.FirstName != null && updatedDoctor.FirstName != "")
                doctor.FirstName = updatedDoctor.FirstName;

            if (updatedDoctor.LastName != null && updatedDoctor.LastName != "")
                doctor.LastName = updatedDoctor.LastName;

            if (updatedDoctor.ContactNumber != null && updatedDoctor.ContactNumber != "")
                doctor.ContactNumber = updatedDoctor.ContactNumber;

            if (updatedDoctor.Email != null && updatedDoctor.Email != "")
                doctor.Email = updatedDoctor.Email;

            if (updatedDoctor.Specialization != null && updatedDoctor.Specialization != "")
                doctor.Specialization = updatedDoctor.Specialization;

            if (updatedDoctor.Experience != null && updatedDoctor.Experience != "")
                doctor.Experience = updatedDoctor.Experience;

            if (updatedDoctor.Hospital != null && updatedDoctor.Hospital != "")
                doctor.Hospital = updatedDoctor.Hospital;

            if (updatedDoctor.Qualification != null && updatedDoctor.Qualification != "")
                doctor.Qualification = updatedDoctor.Qualification;

        
            await _context.SaveChangesAsync();

            
            var user = _context.User_set.FirstOrDefault(u => u.UserEmail == test_email);
            if (user != null)
            {
                if (updatedDoctor.FirstName != null && updatedDoctor.FirstName != "")
                    user.UserFirstName = updatedDoctor.FirstName;

                if (updatedDoctor.LastName != null && updatedDoctor.LastName != "")
                    user.UserLastName = updatedDoctor.LastName;

                if (updatedDoctor.ContactNumber != null && updatedDoctor.ContactNumber != "")
                    user.ContactNumber = updatedDoctor.ContactNumber;

                if (updatedDoctor.Email != null && updatedDoctor.Email != "")
                    user.UserEmail = updatedDoctor.Email;

                if (updatedDoctor.Qualification != null && updatedDoctor.Qualification != "")
                    user.Qualification = updatedDoctor.Qualification;

                if (updatedDoctor.Specialization != null && updatedDoctor.Specialization != "" )
                    user.Specialization = updatedDoctor.Specialization;

                if (updatedDoctor.Experience != null && updatedDoctor.Experience != "")
                    user.Experience = updatedDoctor.Experience;

                if (updatedDoctor.Hospital != null && updatedDoctor.Hospital != "")
                    user.Hospital = updatedDoctor.Hospital;


               
                await _context.SaveChangesAsync();
            }

      
            return Ok();
        }
        [HttpPost("doctor/{doctorId}/setActive")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SetDoctorActive(int doctorId)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

          
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            var doctor = await _context.Doctor_set.FindAsync(doctorId);
            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            doctor.IsActive = true;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("doctor/{doctorId}/setInactive")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SetDoctorInactive(int doctorId)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var roleClaim = claimsIdentity.FindFirst(ClaimTypes.Role);

          
            if (roleClaim == null || roleClaim.Value != "Admin")
            {
                return Unauthorized("Only users with the 'Admin' role can register users");
            }
            var doctor = await _context.Doctor_set.FindAsync(doctorId);
            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            doctor.IsActive = false;
            await _context.SaveChangesAsync();

            return Ok();
        }

    }



}



