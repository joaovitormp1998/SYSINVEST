import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-compound-interest-table',
  templateUrl: './compound-interest-table.component.html',
  styleUrls: ['./compound-interest-table.component.scss']
})
export class CompoundInterestTableComponent implements OnChanges {
  tableData: any[] = [];
  @Input()
  initialAmount: number = 0;
  @Input()
  interestRate: number = 0;
  @Input()
  years: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialAmount'] || changes['interestRate'] || changes['years']) {
      this.calculateTableData();
    }
  }

  calculateTableData(): void {
    this.tableData = []; // Inicializa uma array vazia chamada tableData.
    
    // Calcula a taxa de juros mensal dividindo a taxa anual por 12.
    const monthlyInterestRate = (this.interestRate / 12)/100;
    console.log(monthlyInterestRate, 'TAXA DE JUROS MENSAL');
    // Calcula o número total de meses com base nos anos fornecidos.
    const totalMonths = this.years * 12;
    
    // Inicializa uma variável para rastrear o montante atual, começando com o montante inicial.
    let currentAmount = this.initialAmount;
    
    // Inicia um loop que itera através de cada mês.
    for (let month = 1; month <= totalMonths; month++) {
        
        // Calcula o valor do juro para o montante atual.
        const interest = currentAmount * monthlyInterestRate;
        
        // Adiciona o juro ao montante atual.
        currentAmount += interest;

        // Cria um objeto que representa os dados deste mês e o adiciona à array tableData.
        this.tableData.push({
            month, // Número do mês.
            amount: currentAmount.toFixed(2), // Montante atual formatado com 2 casas decimais.
            interest: interest.toFixed(2) // Valor do juro formatado com 2 casas decimais.
        });
    }
}

}
