import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentSimulatorComponent } from './investment-simulator/investment-simulator.component';

const routes: Routes = [
  { path: 'simulate-investment', component: InvestmentSimulatorComponent },
  // Outras rotas, se necessário
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
