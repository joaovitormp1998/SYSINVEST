# Sistema de Cálculo de Investimento usando Angular 14 e API .NET 6.0

Este documento descreve como executar um sistema de cálculo de investimento que permite aos usuários calcular o crescimento de um investimento ao longo do tempo, utilizando Angular 14 como o front-end e uma API .NET 6.0 para processar os cálculos.

## Configuração Inicial

1. **Configuração do Ambiente:**
   Certifique-se de ter o Angular CLI e o .NET SDK 6.0 instalados em sua máquina.

2. **Execute o Projeto Angular:**
   No terminal, navege até o seguinte caminho :
   cd frontend 
   npm install 
   npm start


3. **Execute o Projeto .NET:**
No terminal, execute o seguinte comando :
   cd backend\SimuladorEmprestimo\SimuladorEmprestimo.API
   dotnet run


## Exemplo de Uso

1. **Usuário Preenche os Campos:**
O usuário acessa a interface do sistema, preenche o montante inicial, taxa de juros e anos.

2. **Clique no Botão de Cálculo:**
Ao clicar no botão de Simular Investimento, o front-end envia os dados para a API por meio de uma solicitação POST.
http://localhost:4200/simulate-investment
3. **API Processa o Cálculo:**
A API .NET recebe os dados, realiza o cálculo de crescimento de investimento e retorna os resultados.

4. **Resultado Exibido na Interface:**
O front-end recebe os resultados da API e os exibe na interface para o usuário, mostrando como o investimento crescerá ao longo do tempo.