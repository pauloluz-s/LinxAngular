import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './Cliente';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' :'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  url = 'https://localhost:5001/api/clientes';

  constructor(private http: HttpClient) {}

  ListarClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.url);
  }

  ObterCliente(ID: number): Observable<Cliente>{
    const apiUrl = `${this.url}/${ID}`;
    return this.http.get<Cliente>(apiUrl);
  }

  SalvarCliente(cliente: Cliente) : Observable<any>{
    return this.http.post<Cliente>(this.url, cliente, httpOptions);
  }

  AtualizarCliente(cliente: Cliente) : Observable<any>{
    return this.http.put<Cliente>(this.url, cliente, httpOptions);
  }

  ExcluirCliente(ID: number): Observable<any>{
    const apiUrl = `${this.url}/${ID}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
