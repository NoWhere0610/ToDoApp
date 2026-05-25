using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ToDoApi.Controllers;

[ApiController]
[Authorize]
[Route ("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoryController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllController()
    {
        try
        {
            var categories = await _context.Categories
                .ToListAsync();

            if (categories == null || !categories.Any())
            {
                return NotFound("No categories found in the database.");
            }

            return Ok(categories);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}