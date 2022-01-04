using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorContoller : BaseApiController
    {
        public ActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }

        // [HttpGet("testauth")]
        // [Authorize]
        // public ActionResult<string> GetSecretText()
        // {
        //     return "secret stufffff";
        // }
    }
}