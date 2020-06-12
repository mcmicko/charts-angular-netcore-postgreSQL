using System.Linq;
using Backend.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CustomerController : Controller
  {
    private readonly ApiContext _ctx;

    public CustomerController(ApiContext ctx)
    {
      _ctx = ctx;
    }

    [HttpGet]
    public IActionResult GetCustomers()
    {
      var data = _ctx.Customers.OrderBy(c => c.Id);
      return Ok(data);
    }

    [HttpGet("{id}", Name = "GetCustomer")]
    public IActionResult GetAction(int id)
    {
      var customer = _ctx.Customers.Find(id);
      return Ok(customer);
    }

    [HttpPost]
    public IActionResult Post([FromBody] Customer customer)
    {
      if (customer == null)
      {
        return BadRequest();
      }

      _ctx.Customers.Add(customer);
      _ctx.SaveChanges();

      return CreatedAtRoute("GetCustomer", new { id = customer.Id }, customer);
    }
  }
}