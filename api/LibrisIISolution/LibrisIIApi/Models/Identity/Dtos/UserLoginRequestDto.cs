using System.ComponentModel.DataAnnotations;

namespace LibrisIIApi.Models.Identity.Dtos;

public class UserLoginRequestDto
{
    [Required]
    public string Email { get; set; }
    
    [Required]
    public string Password { get; set; }
}