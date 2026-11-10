import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  username = '';
  email = '';

  register(): void {
    if (this.username.trim() === '') {
      alert('Please enter a username!');
      return;
    }
    if (this.email.trim() === '') {
      alert('Please enter an email!');
      return;
    }
    alert('form validated successfully!');
  }
}
