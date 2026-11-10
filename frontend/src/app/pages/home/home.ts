import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../../book';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private bookService = inject(BookService);
  title = '';
  author = '';
  price = 0;
  editingBookId: number | null = null;

  books = signal<Book[]>([]);
  searchTerm = signal('');

  ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books.set(data);
      },
      error: (error) => {
        console.error('Failed to load books:', error);
      },
    });
  }

  addBook(): void {
    if (this.title.trim() === '') {
      alert('Please enter a book title!');
      return;
    }
    if (this.author.trim() === '') {
      alert('Please enter an author name! ');
      return;
    }
    if (this.price <= 0) {
      alert('Price must be greater than zero!');
      return;
    }
    const newBook = {
      title: this.title,
      author: this.author,
      price: this.price,
    };
    this.bookService.addBook(newBook).subscribe({
      next: (createdBook) => {
        console.log('Book saved successfully:', createdBook);
        this.books.update((currentBooks) => [...currentBooks, createdBook]);
        this.title = '';
        this.author = '';
        this.price = 0;
      },
      error: (error) => {
        console.error('Failed to save book', error);
      },
    });
  }

  deleteBook(id: number): void {
    console.log('Delete requested for book ID', id);

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books.update((currentBooks) => currentBooks.filter((book) => book.id !== id));
        console.log('Book deleted successfully!');
      },
      error: (error) => {
        console.error('Failed to delete book:', error);
      },
    });
  }

  editBook(book: Book): void {
    console.log('Editing book:', book);
    this.title = book.title;
    this.author = book.author;
    this.price = book.price;
    this.editingBookId = book.id;
  }

  saveBook(): void {
    if (this.title.trim() === '') {
      alert('Please enter a book title');
      return;
    }
    if (this.author.trim() === '') {
      alert('Please enter a book author');
      return;
    }
    if (this.price <= 0) {
      alert('Enter a book price!');
      return;
    }
    if (this.editingBookId === null) {
      this.addBook();
    } else {
      this.updateBook();
      console.log('Editing book ID:', this.editingBookId);
    }
  }

  updateBook(): void {
    if (this.editingBookId === null) {
      return;
    }
    const updatedBook = {
      id: this.editingBookId,
      title: this.title,
      author: this.author,
      price: this.price,
    };
    console.log('Updated Book Data:', updatedBook);
    this.bookService.updateBook(this.editingBookId, updatedBook).subscribe({
      next: () => {
        console.log('Book updated succesffuly');
        this.books.update((currentBooks) =>
          currentBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book)),
        );
        this.editingBookId = null;
        this.title = '';
        this.author = '';
        this.price = 0;
      },
      error: (error) => {
        console.error('Failed to update book:', error);
      },
    });
  }

  filteredBooks = computed(() => {
    return this.books().filter(
      (book) =>
        book.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm().toLowerCase()),
    );
  });
}
