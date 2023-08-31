namespace SimuladorEmprestimo.API.Models
{
    public class LoanRequest
    {
        public decimal Amount { get; set; }
        public int TermMonths { get; set; }
        public decimal InterestRate { get; set; }
    }
}
