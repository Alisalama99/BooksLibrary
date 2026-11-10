import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../book';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  addBook(newBook: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, newBook);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateBook(id: number, updatedBook: Omit<Book, 'id'>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, updatedBook);
  }
}
