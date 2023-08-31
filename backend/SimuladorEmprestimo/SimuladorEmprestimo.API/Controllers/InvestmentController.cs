using Microsoft.AspNetCore.Mvc;
using SimuladorEmprestimo.API.Models;
using System;
using System.Collections.Generic;

namespace SimuladorEmprestimo.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvestmentController : ControllerBase
    {
        [HttpPost("simulate")]
        public ActionResult<InvestmentSimulationResult> SimulateInvestment([FromBody] InvestmentRequest request)
        {
            decimal futureValue = CalculateFutureValue(request);
            decimal monthlyIncome = CalculateMonthlyIncome(request, futureValue);

            var result = new InvestmentSimulationResult
            {
                FutureValue = futureValue,
                MonthlyIncome = monthlyIncome
            };

            return result;
        }

        private decimal CalculateFutureValue(InvestmentRequest request)
        {
            int compoundingFrequency = 12; // Juros compostos mensais
            decimal ratePerPeriod = request.InterestRate / (compoundingFrequency * 100); // Taxa por período

            int totalPeriods = request.Years * compoundingFrequency;

            decimal futureValue = request.InitialAmount * (decimal)Math.Pow(1 + (double)ratePerPeriod, totalPeriods);

            // Adicionar aportes mensais opcionais
            List<MonthlyContributionResult> contributions = new List<MonthlyContributionResult>();

            for (int i = 1; i <= totalPeriods; i++)
            {
                // Calcular a contribuição mensal para este período
                decimal monthlyContribution = request.MonthlyContribution * (decimal)Math.Pow(1 + (double)ratePerPeriod, i);

                // Adicionar a contribuição mensal ao valor futuro no início deste período
                futureValue += monthlyContribution;

                contributions.Add(new MonthlyContributionResult
                {
                    MonthNumber = i,
                    Contribution = monthlyContribution,
                    TotalValue = futureValue
                });
            }

            // ...

            return futureValue;
        }

        private decimal CalculateMonthlyIncome(InvestmentRequest request, decimal futureValue)
        {
            decimal totalMonths = request.Years * 12;

            // Se houver aportes mensais, calcular a renda mensal com base no valor futuro
            decimal monthlyIncome = futureValue / totalMonths;

            return monthlyIncome;
        }
    }
}
