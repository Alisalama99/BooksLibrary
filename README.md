# 📚 Books Library

Books Library is a full-stack web application built with Angular, ASP.NET Core, Entity Framework Core, and SQLite. It provides a simple, responsive interface for managing a personal book collection.

Users can add new books, browse their collection, update existing records, delete books, and search instantly by title or author. The application connects an Angular frontend to an ASP.NET Core REST API, with Entity Framework Core handling data persistence in a SQLite database.

## ✨ Features

- Create, view, update, and delete books
- Search books by title or author
- Responsive book cards and forms
- Multi-page navigation with Angular Router
- Frontend registration form with basic validation (demonstration only; no account creation or authentication)
- Persistent storage using SQLite

## 🛠️ Tech Stack

**Frontend:** Angular, TypeScript, HTML, CSS

**Backend:** ASP.NET Core Minimal APIs, C#

**Database:** SQLite, Entity Framework Core

**Version Control:** Git and GitHub

## 🚀 Getting Started

### Prerequisites

Make sure the following tools are installed:

- Node.js and npm
- Angular CLI
- .NET 10 SDK
- Entity Framework Core CLI (`dotnet-ef`)

### 1. Clone the Repository

```bash
git clone https://github.com/Alisalama99/BooksLibrary.git
cd BooksLibrary
```

### 2. Set Up the Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

The API runs at `http://localhost:5168` when using the project's current development configuration.

The database is created locally using EF Core migrations. No existing book data is required.

### 3. Set Up the Frontend

Open a **second terminal** from the repository's root directory:

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:4200` in your browser.

### 4. Use the Application

You can now add, edit, delete, and search books through the Angular interface. Changes are saved to the local SQLite database.

### Note About Registration

The Register page demonstrates frontend form validation only. It does not create user accounts or implement authentication.
