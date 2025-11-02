import { Routes } from '@angular/router';
import { FuncionarioListComponent } from "./components/funcionario-list/funcionario-list.component";
import { FuncionarioFormComponent } from "./components/funcionario-form/funcionario-form.component";
import { DepartamentoListComponent } from "./components/departamento-list/departamento-list.component";
import { DepartamentoFormComponent } from "./components/departamento-form/departamento-form.component";
import { authGuard } from './commons/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { warningGuard } from './commons/warning.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  // Rotas de funcionários
  { path: 'funcionarios', component: FuncionarioListComponent, canActivate: [authGuard] },
  { path: 'funcionarios/novo', component: FuncionarioFormComponent, canActivate: [authGuard], canDeactivate: [warningGuard] },
  { path: 'funcionarios/:id', component: FuncionarioFormComponent, canActivate: [authGuard] },

  // Rotas de departamentos
  { path: 'departamentos', component: DepartamentoListComponent, canActivate: [authGuard]},
  { path: 'departamentos/novo', component: DepartamentoFormComponent, canActivate: [authGuard], canDeactivate: [warningGuard]},
  { path: 'departamentos/:id', component: DepartamentoFormComponent, canActivate: [authGuard]}
];
