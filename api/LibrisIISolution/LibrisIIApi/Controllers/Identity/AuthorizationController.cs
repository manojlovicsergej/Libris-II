using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LibrisIIApi.Configurations;
using LibrisIIApi.Models.Identity.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace LibrisIIApi.Controllers.Identity;

[ApiController]
[Route("api/[controller]")]
public class AuthorizationController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IOptionsMonitor<JwtConfig> _optionsMonitor;
    private readonly JwtConfig _jwtConfig;

    public AuthorizationController(UserManager<IdentityUser> userManager, IOptionsMonitor<JwtConfig> optionsMonitor)
    {
        _userManager = userManager;
        _jwtConfig = optionsMonitor.CurrentValue;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDto requestDto)
    {
        if (ModelState.IsValid)
        {
            var emailExist = await _userManager.FindByEmailAsync(requestDto.Email);
            if (emailExist is not null)
            {
                return BadRequest("Email already exists");
            }

            var newUser = new IdentityUser()
            {
                Email = requestDto.Email,
                UserName = requestDto.Email
            };

            var isCreated = await _userManager.CreateAsync(newUser, requestDto.Password);

            if (isCreated.Succeeded)
            {
                var token = GenerateJwtToken(newUser);
                return Ok(new RegistrationRequestResponse
                {
                    Result = true,
                    Token = token
                });
            }

            return BadRequest(isCreated.Errors.Select(x => x.Description).ToList());
        }

        return BadRequest("Invalid request payload");
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequestDto requestDto)
    {
        if (ModelState.IsValid)
        {
            var existingUser = await _userManager.FindByEmailAsync(requestDto.Email);

            if (existingUser is null)
                return BadRequest("Invalid authentication");

            var isPasswordValid = await _userManager.CheckPasswordAsync(existingUser, requestDto.Password);

            if (isPasswordValid)
            {
                var token = GenerateJwtToken(existingUser);
                return Ok(new LoginRequestResponse
                {
                    Result = true,
                    Token = token
                });
            }
        }

        return BadRequest("Invalid request payload");
    }

    private string GenerateJwtToken(IdentityUser user)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("Id", user.Id),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            }),
            Expires = DateTime.Now.AddHours(4),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512)
        };

        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = jwtTokenHandler.WriteToken(token);
        return jwtToken;
    }
}