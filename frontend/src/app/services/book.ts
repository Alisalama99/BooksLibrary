import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from '../book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:5168/books');
  }

  addBook(newBook: Omit<Book, 'id'>): Observable<Book> {
    return this.http.post<Book>('http://localhost:5168/books', newBook);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:5168/books/${id}`);
  }

  updateBook(id: number, updatedBook: Omit<Book, 'id'>): Observable<void> {
    return this.http.put<void>(`http://localhost:5168/books/${id}`, updatedBook);
  }
}
