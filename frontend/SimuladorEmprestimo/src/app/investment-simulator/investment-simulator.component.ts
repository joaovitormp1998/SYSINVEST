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

    const margin = 10; // Margin between logo and content
    const divToPrint = document.getElementById("conteudo");

    // Load the image from the assets folder and convert it to a data URL
    const logoDataURL = '../../assets/logo.png'; // Adjust the path and filename as needed
    const logoWidth = pdf.internal.pageSize.width - 20; // Logo spans the entire width
    const logoHeight = 60; // Adjust as needed

    // Add the company logo at the top
    pdf.addImage(logoDataURL, 'PNG', 10, margin, logoWidth, logoHeight);

    // Set font and size for title
    pdf.setFont('times', 'bold');
    pdf.setFontSize(18);

    // Add title and date
    const title = 'Simulação de Investimento - JV Invest';
    const date = new Date().toLocaleDateString('pt-BR');
    pdf.text(title, 10, margin + logoHeight + 10); // Adjust the Y-coordinate as needed
    pdf.setFontSize(12);
    pdf.text(`Data da Simulação: ${date}`, 10, margin + logoHeight + 17); // Adjust the Y-coordinate as needed

    // Set font and size for content
    pdf.setFont('times', 'normal');
    pdf.setFontSize(14);

    // Add content
    const contentX = 10;
    let contentY = margin + logoHeight + 35; // Adjust the starting Y-coordinate as needed
    pdf.text(`Valor Futuro: R$ ${this.investmentResult.futureValue.toFixed(2)}`, contentX, contentY);
    contentY += 10;
    pdf.text(`Renda Mensal: R$ ${this.investmentResult.monthlyIncome.toFixed(2)}`, contentX, contentY);

    const table = document.getElementById("tabela"); // ID of the HTML table element
    if (table) {
        const rows = table.getElementsByTagName("tr");
        let tableData = [];

        // Loop through the rows of the HTML table and extract the data
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName("td");
            const rowData = [];

            for (let j = 0; j < cells.length; j++) {
                rowData.push(cells[j].innerText);
            }

            tableData.push(rowData);
        }

        const lineHeight = 10; // Height of each line
        const cellPadding = 2; // Padding for cells
        const cellWidth = (pdf.internal.pageSize.width - 20) / tableData[0].length;

        // Add data rows
        for (let rowIndex = 0; rowIndex < tableData.length; rowIndex++) {
            if (contentY + lineHeight > pdf.internal.pageSize.height - margin) {
                pdf.addPage();
                contentY = margin;
            }

            const rowData = tableData[rowIndex];
            // const bgColor = rowIndex % 2 === 0 ? 'red' : 'blue'; // Convert to string

            for (let colIndex = 0; colIndex < rowData.length; colIndex++) {
                // pdf.setFillColor(bgColor);
                // pdf.rect(contentX + colIndex * cellWidth, contentY, cellWidth, lineHeight, 'F');
                pdf.text(rowData.join('\t'), contentX, contentY);
              }

            contentY += lineHeight;
        }
    }

    // Save the PDF
    pdf.save('investimento.pdf');
}




}
