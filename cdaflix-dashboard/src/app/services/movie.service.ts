import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../models/Movie';


@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private movies!: Array<Movie>

  // getMovies() : Array<Movie> {
  //   return this.movies
  // }

  // setMovies(movies: Array<Movie>) {
  //   this.movies = movies
  // }

  constructor(private http: HttpClient) {}

  getAll() {
    const res = this.http.get<any[]>("http://localhost:8081/api/film/all")
    return res
  }

  create(data: any): Observable<any>{

    const formData: FormData = new FormData();
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('img', data.img)
    formData.append('actors', 'list d\'acteurs')
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data; boundary=-------------movieBoudnary12345'
    })}

    const res = this.http.post<any>("http://localhost:8081/api/film/create", formData)
    return res
  }

  find(args: string) {

    args = args.trim()
    const options = args ? {
      params: new HttpParams().set('title', args)
    } : {}

    const res = this.http.get<any>("http://localhost:8081/api/film/find", options)
    return res
  }


}
