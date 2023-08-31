namespace SimuladorEmprestimo.API.Models
{
    public class InvestmentRequest
    {
        public decimal InitialAmount { get; set; } = 0;
        public decimal InterestRate { get; set; } = 0;
        public int Years { get; set; }

        // Novos campos opcionais
        public decimal MonthlyContribution { get; set; } = 0;
    }


    public class InvestmentSimulationResult
    {
        public decimal FutureValue { get; set; }
        public decimal MonthlyIncome { get; set; }
        public List<MonthlyContributionResult> MonthlyContributions { get; set; }
    }

    public class MonthlyContributionResult
    {
        public int MonthNumber { get; set; }
        public decimal Contribution { get; set; }
        public decimal TotalValue { get; set; }
    }

}
