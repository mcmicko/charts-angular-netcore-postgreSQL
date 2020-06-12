using System;
using System.Linq;
using Backend.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.API.Controllers
{
  [ApiController]
  [Route("/api/{controller}")]
  public class OrderController : Controller
  {
    private readonly ApiContext _ctx;

    public OrderController(ApiContext ctx)
    {
      _ctx = ctx;
    }

    [HttpGet("{pageIndex:int}/{pageSize:int}")]
    public IActionResult GetOrders(int pageIndex, int pageSize)
    {
      var data = _ctx.Orders.Include(o => o.Id).OrderByDescending(c => c.Placed);
      var page = new PaginatedResponse<Order>(data, pageIndex, pageSize);
      var totalCount = data.Count();
      var totalPages = Math.Ceiling((double)totalCount / pageSize);

      var response = new
      {
        Page = page,
        TotalPages = totalPages
      };

      return Ok(response);
    }
  }
}