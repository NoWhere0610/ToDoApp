using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Task
{
    [Key]
    public int Id { get; set; }

    [MaxLength(255)]
    public string Title { get; set; }

    [MaxLength(255)]
    public string Description { get; set; }

    [MaxLength(20)]
    public string Priority { get; set; }

    [DataType(DataType.Date)]
    public DateTime? Expire_Date { get; set; }

    public TimeSpan? Time { get; set; }

    public bool Status { get; set; }

    [Column("category_id")]
    public int? CategoryId { get; set; }

    [Column("user_id")]
    public int? UserId { get; set; }

    [ForeignKey("CategoryId")]
    public Category? Category { get; set; }

    [ForeignKey("UserId")]
    public User? User { get; set; }
}