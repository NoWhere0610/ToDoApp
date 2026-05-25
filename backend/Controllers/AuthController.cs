using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace ToDoApi;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _config = config;
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
    {
        try
        {
            var userDb = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginModel.Email);
            if (userDb == null || !BCrypt.Net.BCrypt.Verify(loginModel.Password, userDb.Password))
            {
                return Unauthorized("Email hoặc mật khẩu không chính xác");
            }
            var token = GenerateJwtToken(userDb.Name);
            return Ok(new { token });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

[HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterModel registerModel)
{
    try
    {
        if (registerModel == null || string.IsNullOrEmpty(registerModel.Email) || string.IsNullOrEmpty(registerModel.Password))
        {
            return BadRequest("Dữ liệu đăng ký không hợp lệ.");
        }

        var isEmailExist = await _context.Users.AnyAsync(u => u.Email == registerModel.Email.Trim());
        if (isEmailExist)
        {
            return BadRequest("Email này đã được sử dụng bởi một tài khoản khác.");
        }

        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerModel.Password);

        var newUser = new User
        {
            Name = registerModel.Name.Trim(),
            Email = registerModel.Email.Trim().ToLower(),
            Password = hashedPassword
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok("Đăng ký tài khoản thành công!");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}
    private string GenerateJwtToken(string username)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}