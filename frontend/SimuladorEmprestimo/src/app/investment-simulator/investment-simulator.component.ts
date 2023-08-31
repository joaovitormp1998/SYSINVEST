import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/api'; // Importe a classe Message do PrimeNG
import jsPDF from 'jspdf';

@Component({
  selector: 'app-investment-simulator',
  templateUrl: './investment-simulator.component.html',
  styleUrls: ['./investment-simulator.component.scss']
})
export class InvestmentSimulatorComponent implements OnInit {
  investmentForm!: FormGroup;
  investmentResult: any;
  errorMessages: Message[] = []; // Array de mensagens de erro
  successMessages: Message[] = []; // Array de mensagens de sucesso
  initialAmount: number = 0 ;
  interestRate: number = 0;
  years: number = 0;
  currencyOptions:any;
  requestData:boolean =false;
  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.investmentForm = this.formBuilder.group({
      initialAmount: [0, Validators.required],
      interestRate: [1, [Validators.required, Validators.min(0), Validators.max(100)]],
      years: [0, Validators.required],
      monthlyContribution: [0] // Valor inicial para a contribuição mensal

    });
    this.currencyOptions = {
      prefix: 'R$ ',
      thousands: '.',
      decimal: ',',
      allowNegative: false,
      nullable: true
      // Outras opções de configuração aqui
    };
    this.investmentForm.get('interestRate')?.valueChanges.subscribe(value => {
      if (value >= 100 || value <= 0) {
        this.investmentForm.get('interestRate')?.setValue(100, { emitEvent: false });
      }
    });
  }

  validateInterestRate(control: any) {
    const value = control.value;
    if (value && (value < 0 || value > 100 || value.toString().indexOf('%') !== -1)) {
      return { 'invalidInterestRate': true };
    }
    return null;
  }

  simulateInvestment() {
    const apiUrl = 'http://localhost:5247/api/Investment/simulate';
    const requestData = this.investmentForm.value;
    this.requestData = true;


  // Atualize as propriedades do componente com os valores do formulário
  this.initialAmount = this.investmentForm.get('initialAmount')!.value;
  this.interestRate = this.investmentForm.get('interestRate')!.value;
  this.years = this.investmentForm.get('years')!.value;
    console.log(this.years,this.initialAmount,this.interestRate ,'vim do outro assim');

    this.http.post<any>(apiUrl, requestData).subscribe(
      result => {

        this.investmentResult = result;
        this.successMessages = [{ severity: 'success', summary: 'Sucesso', detail: 'Simulação gerada com Sucesso!' }];
        this.errorMessages = []; // Limpa mensagens de erro
      },
      error => {
        this.errorMessages = [{ severity: 'error', summary: 'Erro', detail: 'Ocorreu uma falha ao gerar Simulação.' }];
        this.successMessages = []; // Limpa mensagens de sucesso
      }
    );
  }
  
   gerarPdf() {
    const pdf = new jsPDF();

    const margin = 10;
    const divToPrint = document.getElementById("conteudo");

    const logoDataURL = '../../assets/logo.png';
    const logoWidth = pdf.internal.pageSize.width - 20;
    const logoHeight = 60;

    pdf.addImage(logoDataURL, 'PNG', 10, margin, logoWidth, logoHeight);

    pdf.setFont('times', 'bold');
    pdf.setFontSize(18);

    const title = 'Simulação de Investimento - JV Invest';
    const date = new Date().toLocaleDateString('pt-BR');
    pdf.text(title, 10, margin + logoHeight + 10);
    pdf.setFontSize(12);
    pdf.text(`Data da Simulação: ${date}`, 10, margin + logoHeight + 17);

    pdf.setFont('Helvetica', 'normal');
    pdf.setFontSize(14);
    const contentX = 10;
    let contentY = margin + logoHeight + 35;
    
    pdf.text(`Valor Futuro: R$ ${this.investmentResult.futureValue.toFixed(2)}`, contentX, contentY);
    contentY += 8;
    pdf.text(`Renda Mensal: R$ ${this.investmentResult.monthlyIncome.toFixed(2)}`, contentX, contentY);

    const table = document.getElementById("tabela");
    if (table) {
        const rows = table.getElementsByTagName("tr");
        const headerRow = rows[0];
        const headerCells = headerRow.getElementsByTagName("th");
        
        let tableData = [];

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName("td");
            const rowData = [];

            for (let j = 0; j < cells.length; j++) {
                rowData.push(cells[j].innerText);
            }
            
            tableData.push(rowData);
        }

        const lineHeight = 15;
        const cellPadding = 2;
        const cellWidth = (pdf.internal.pageSize.width - 20) / headerCells.length;

        for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
            if (contentY + lineHeight > pdf.internal.pageSize.height - margin) {
                pdf.addPage();
                contentY = margin;
            }

            const rowData = tableData[rowIndex];
            const bgColor = rowIndex % 2 === 0 ? '#f2f2f2' : '#ffffff';

            for (let colIndex = 0; colIndex < rowData.length; colIndex++) {
                pdf.setFillColor(bgColor);
                pdf.rect(contentX + colIndex * cellWidth, contentY, cellWidth, lineHeight, 'F');
                pdf.text(rowData[colIndex], contentX + colIndex * cellWidth + cellPadding, contentY + lineHeight / 2, { baseline: 'middle' });
            }

            contentY += lineHeight;
        }
    }

    pdf.save('investimento.pdf');
}





}
