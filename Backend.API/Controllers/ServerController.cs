using System.Linq;
using Backend.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
  [ApiController]
  [Route("/api/[controller]")]
  public class ServerController : Controller
  {
    private readonly ApiContext _ctx;

    public ServerController(ApiContext ctx)
    {
      _ctx = ctx;
    }


    [HttpGet]
    public IActionResult Get()
    {
      var response = _ctx.Servers.OrderBy(s => s.Id).ToList();
      return Ok(response);
    }

    [HttpPut("{id}")]
    public IActionResult Message(int id, [FromBody] ServerMessage msg)
    {
      var server = _ctx.Servers.Find(id);

      if (server == null)
        return NotFound();

      if (msg.Payload == "c")
      {
        server.IsOnline = true;
        _ctx.SaveChanges();
      }

      if (msg.Payload == "deactive")
        server.IsOnline = false;

      _ctx.SaveChanges();

      return new NoContentResult();
    }
  }
}