import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartamentoService } from '../../services/departamento.service';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DepartamentoResponse } from "../../models/departamentoResponse";

@Component({
  selector: 'app-departamento-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './departamento-list.component.html',
  styleUrl: './departamento-list.component.css'
})
export class DepartamentoListComponent implements OnInit {

  departamento: DepartamentoResponse[] = [];
  filtroAtivo: boolean | null = null;
  carregando = false;

  statusOptions = [
    { label: 'Todos', value: null },
    { label: 'Ativos', value: true },
    { label: 'Inativos', value: false }
  ];

  constructor(
    private service: DepartamentoService,
    private msg: MessageService,
    private confirm: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.carregando = true;

    let obs;
    if (this.filtroAtivo === true) {
      obs = this.service.listarAtivos();
    } else {
      obs = this.service.listar();
    }

    obs.subscribe({
      next: (lista) => {
        // Se filtroInativo = false, filtra os inativos manualmente
        if (this.filtroAtivo === false) {
          this.departamento = lista.filter(d => !d.ativo);
        } else {
          this.departamento = lista;
        }
        this.carregando = false;
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao carregar departamentos' });
        this.carregando = false;
      }
    });
  }

  limparFiltros(): void {
    this.filtroAtivo = null;
    this.carregar();
  }

  editar(id: number): void {
    this.router.navigate(['/departamento', id]);
  }

  confirmarInativacao(d: DepartamentoResponse): void {
    this.confirm.confirm({
      message: `Confirma inativar ${d.nome}?`,
      header: 'Confirmar',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => this.inativar(d.id)
    });
  }

  private inativar(id: number): void {
    this.carregando = true;
    this.service.inativar(id).subscribe({
      next: () => {
        this.msg.add({ severity: 'success', summary: 'Sucesso', detail: 'Departamento inativado' });
        this.carregar();
      },
      error: () => {
        this.msg.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível inativar' });
        this.carregando = false;
      }
    });
  }

  novo(): void {
    this.router.navigate(['/departamentos/novo']);
  }

  funcionarios(): void {
    this.router.navigate(['/funcionarios']);
  }
}
