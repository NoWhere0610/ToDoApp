using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int Id { get; set; }

    [MaxLength(20)]
    public string Name { get; set;}
    [MaxLength(50)]
    public string Email { get; set; }
    [MaxLength(20)]
    public string Password { get; set; }
}