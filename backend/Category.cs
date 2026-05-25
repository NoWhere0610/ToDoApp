using System.ComponentModel.DataAnnotations;

public class Category
{
    [Key]
    public int Id {get; set;}
    
    [MaxLength(20)]
    [Required]
    public string Name {get; set;}
    
    public int Quantity {get; set;}
}