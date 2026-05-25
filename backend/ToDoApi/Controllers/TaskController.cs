using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ToDoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly TaskContext _context;

    public TaskController(TaskContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTasks()
    {
        try
        {
            var tasks = await _context.Tasks
                .Include(t => t.Category)
                .Include(t => t.User)
                .ToListAsync();

            if (tasks == null || !tasks.Any())
            {
                return NotFound("No tasks found in the database.");
            }

            return Ok(tasks);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTaskById(int id)
    {
        var task = await _context.Tasks
            .Include(t => t.Category)
            .Include(t => t.User)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (task == null)
        {
            return NotFound($"Task with ID {id} not found.");
        }

        return Ok(task);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTask([FromBody] Task newTask)
    {
        try
        {
            if (newTask == null)
            {
                return BadRequest("Task data is null.");
            }

            newTask.User = null;

            _context.Tasks.Add(newTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTaskById), new { id = newTask.Id }, newTask);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}