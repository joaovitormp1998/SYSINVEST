using Microsoft.AspNetCore.Mvc;
using SimuladorEmprestimo.API.Models;
using System;

namespace SimuladorEmprestimo.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoanController : ControllerBase
    {
        [HttpPost("simulate")]
        public ActionResult<LoanSimulationResult> SimulateLoan([FromBody] LoanRequest request)
        {
            decimal totalPayment = CalculateTotalPayment(request);
            decimal installmentAmount = CalculateInstallmentAmount(request, totalPayment);

            var result = new LoanSimulationResult
            {
                TotalPayment = totalPayment,
                InstallmentAmount = installmentAmount
            };

            return result;
        }

        private decimal CalculateTotalPayment(LoanRequest request)
        {
            decimal interestFactor = (decimal)Math.Pow(1 + (double)(request.InterestRate / 100), request.TermMonths);
            decimal totalPayment = request.Amount * interestFactor;

            return totalPayment;
        }

        private decimal CalculateInstallmentAmount(LoanRequest request, decimal totalPayment)
        {
            decimal installmentAmount = totalPayment / request.TermMonths;
            return installmentAmount;
        }
    }
}
