import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Curso } from '../models/curso';
import { Professor } from '../models/professor';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private url: string = "http://localhost:8080";
  cursoPesq: Curso = new Curso();
  curso: Curso = new Curso();

  constructor(
    private http: HttpClient
  ) { }

  public listarCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.url}/curso`);
  }

  public criarCurso(curso: Curso): void {
    this.http.post(`${this.url}/curso`, curso).subscribe();
  }

  public deletarCurso(id: number | undefined): void {
    this.http.delete(`${this.url}/servico/${id}`).subscribe();
  }

  public receberIdCurso(id: number | undefined): void {
    this.curso.id = id;
  }

  public novoCurso(curso: Curso): void {
    this.curso.titulo = curso.titulo;
    this.curso.descricao = curso.descricao;
    this.curso.valor = curso.valor;

    this.alterarCurso();
  }

  public alterarCurso(): void {
    this.http.put(`${this.url}/curso`, this.curso).subscribe();
  }

  // pesquisar servicos
  public pesquisarCursos(term: string): Observable<Curso[]> {
    if (!term.trim()) {
      return of([])
    }

    this.cursoPesq.titulo = term;

    let obs =  this.http.post<Curso[]>(`${this.url}/curso/pesquisa`, this.cursoPesq);
    obs.subscribe(
      (res) => {
        console.log(res)
      }                  
    )
    return obs;
  }

  public listarCursosProfessor(professor: Professor): Observable<Curso[]> {

    let obs =  this.http.post<Curso[]>(`${this.url}/curso/find-by-cliente`, professor);

    obs.subscribe(
      (cursos: Curso[]) => {
        console.log(cursos)
      }
    )

    return obs;
  }
}
