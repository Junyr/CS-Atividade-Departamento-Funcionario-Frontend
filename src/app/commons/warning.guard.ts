import { CanDeactivateFn } from '@angular/router';
import { FuncionarioFormComponent } from '../components/funcionario-form/funcionario-form.component';

export interface hasUnsavedChanges {
  hasUnsavedChanges: boolean;
}

export const warningGuard: CanDeactivateFn<hasUnsavedChanges> = (component, currentRoute, currentState, nextState) => {
  return confirm('Existem alterações não salvas. Deseja realmente sair?')
};
