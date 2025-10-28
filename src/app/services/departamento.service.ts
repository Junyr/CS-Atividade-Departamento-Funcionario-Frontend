import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { DepartamentoResponse } from "../models/departamentoResponse";
import { DepartamentoRequest } from "../models/departamentoRequest";

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private readonly baseUrl = `${environment.apiUrl}/departamentos`;
  
  // Estado reativo básico (loading e cache simples)
  loading = signal(false);
  private _cache$ = new BehaviorSubject<DepartamentoResponse[] | null>(null);
  cache$ = this._cache$.asObservable();

  constructor(private http: HttpClient) {}

  // Listar todos os departamentos
  listar(): Observable<DepartamentoResponse[]> {
    return this.http.get<DepartamentoResponse[]>(this.baseUrl);
  }

  // Listar apenas departamentos ativos
  listarAtivos(): Observable<DepartamentoResponse[]> {
    return this.http.get<DepartamentoResponse[]>(`${this.baseUrl}/ativos`);
  }

  // Buscar por ID
  buscarPorId(id: number): Observable<DepartamentoResponse> {
    return this.http.get<DepartamentoResponse>(`${this.baseUrl}/${id}`);
  }

  // Criar novo departamento
  criar(req: DepartamentoRequest): Observable<DepartamentoResponse> {
    return this.http.post<DepartamentoResponse>(this.baseUrl, req);
  }

  // Atualizar departamento
  atualizar(id: number, req: DepartamentoRequest): Observable<DepartamentoResponse> {
    return this.http.put<DepartamentoResponse>(`${this.baseUrl}/${id}`, req);
  }

  // Inativar departamento
  inativar(id: number): Observable<DepartamentoResponse> {
    return this.http.patch<DepartamentoResponse>(`${this.baseUrl}/${id}/inativar`, {});
  }

  // Helpers de cache
  setCache(list: DepartamentoResponse[]) { this._cache$.next(list); }
  clearCache() { this._cache$.next(null); }
}
