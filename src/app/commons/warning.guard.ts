import { CanDeactivateFn } from '@angular/router';
import { FuncionarioFormComponent } from '../components/funcionario-form/funcionario-form.component';

export const warningGuard: CanDeactivateFn<FuncionarioFormComponent> = (component, currentRoute, currentState, nextState) => {
  return true;
};
