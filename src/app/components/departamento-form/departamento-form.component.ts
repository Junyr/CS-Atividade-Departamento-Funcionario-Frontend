import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento.service';
import { MessageService } from 'primeng/api';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DepartamentoRequest } from "../../models/departamentoRequest";

@Component({
  selector: 'app-departamento-form',
  standalone: true,
  imports: [ 
    CommonModule, 
    FormsModule, 
    RouterModule,
    InputTextModule,
    ButtonModule, 
    ToastModule
  ],
  templateUrl: './departamento-form.component.html',
  styleUrl: './departamento-form.component.css'
})
export class DepartamentoFormComponent {
  id: number | null = null;
  isEdicao = false;
  carregando = this.service.loading;

  departamento: DepartamentoRequest = {
    nome: '',
    sigla: ''
  };

  constructor(
    private service: DepartamentoService,
    private route: ActivatedRoute,
    private router: Router,
    private msg: MessageService
  ) {

    const paramId = this.route.snapshot.paramMap.get('id');

    if (paramId) {
      this.isEdicao = true;
      this.id = Number(paramId);
      this.carregarDepartamento(this.id);
    }
  }

  private hojeISO(): string {
    return new Date().toISOString().substring(0, 10);
  }

  private carregarDepartamento(id: number) {
    this.service.loading.set(true);
    this.service.buscarPorId(id).subscribe({
      next: (f) => {
        this.departamento = {
          nome: f.nome,
          sigla: f.sigla
        };
        this.service.loading.set(false);
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Funcionário não encontrado' });
        this.service.loading.set(false);
        this.router.navigate(['/departamentos']);
      }
    });
  }

  salvar() {
    if (!this.validarCampos()) return;

    this.service.loading.set(true);
    if (this.isEdicao && this.id) {
      this.service.atualizar(this.id, this.departamento).subscribe({
        next: () => {
          this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Funcionário atualizado' });
          this.service.loading.set(false);
          this.router.navigate(['/departamentos']);
        },
        error: (err) => this.tratarErroHttp(err)
      });
    } else {
      this.service.criar(this.departamento).subscribe({
        next: () => {
          this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Funcionário cadastrado' });
          this.service.loading.set(false);
          this.router.navigate(['/departamentos']);
        },
        error: (err) => this.tratarErroHttp(err)
      });
    }
  }

  limpar() {
    this.departamento = {
      nome: '',
      sigla: ''
    };
  }

  private validarCampos(): boolean {
    const f = this.departamento;

    if (!f.nome || f.nome.trim().length < 3) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Nome deve ter pelo menos 3 caracteres' });
      return false;
    }

    if (!f.sigla || f.sigla.trim().length < 1 || f.sigla.trim().length > 5) {
      this.msg.add({ severity: 'warn', summary: 'Validação', detail: 'Sigla deve ter pelo menos 2 à 5 caracteres' });
      return false;
    }

    return true;
  }

  private tratarErroHttp(err: any) {
    this.service.loading.set(false);
    const status = err?.status;
    if (status === 400) {
      this.msg.add({ severity: 'warn', summary: 'Regras', detail: err?.error?.message || 'Violação de regra de negócio' });
    } else {
      this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao salvar' });
    }
  }

}
