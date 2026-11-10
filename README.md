# 📚 Books Library

A full-stack web application for managing a personal book collection, built with **Angular, ASP.NET Core 10, Entity Framework Core, and Microsoft SQL Server**.

Books Library features a responsive interface for browsing, searching, adding, editing, and deleting books. It connects an Angular frontend to an ASP.NET Core REST API, with Entity Framework Core handling database operations.

The application is publicly deployed, using **Cloudflare Pages** for the frontend and **MonsterASP.NET** for the backend and SQL Server database.

## 🌐 Live Demo

- **Live Website:** https://bookslibrary.pages.dev
- **Live REST API:** https://bookslibrary-api.runasp.net/books
- **GitHub Repository:** https://github.com/Alisalama99/BooksLibrary

## ✨ Features

- Create, view, update, and delete books (CRUD)
- Search books by title or author
- Filter books by price and sort results
- Backend pagination support
- Responsive book cards and forms
- Multi-page navigation using Angular Router
- Form validation for book information
- Frontend registration form with basic validation (demonstration only)
- Persistent storage using Entity Framework Core
- Separate development and production database configurations
- Publicly deployed frontend and backend connected through a REST API

## 🛠️ Tech Stack

| Layer                      | Technologies                     |
| -------------------------- | -------------------------------- |
| Frontend                   | Angular, TypeScript, HTML, CSS   |
| Backend                    | ASP.NET Core 10 Minimal APIs, C# |
| ORM                        | Entity Framework Core 10         |
| Development Database       | SQLite                           |
| Production Database        | Microsoft SQL Server             |
| Frontend Hosting           | Cloudflare Pages                 |
| Backend & Database Hosting | MonsterASP.NET                   |
| Version Control            | Git, GitHub                      |

## 🏗️ Application Architecture

```text
Angular Frontend
  Cloudflare Pages
        |
        | HTTPS / REST API
        v
ASP.NET Core 10 Backend
  MonsterASP.NET
        |
        | Entity Framework Core
        v
Microsoft SQL Server
  MonsterASP.NET
```

For local development, the backend uses SQLite instead of SQL Server.

## 🚀 Getting Started

### Prerequisites

Install the following tools:

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

The backend uses **SQLite by default** for local development.

The local database is created using the existing Entity Framework Core migration.

With the current development configuration, the API runs at:

`http://localhost:5168`

Example endpoint:

`http://localhost:5168/books`

### 3. Set Up the Frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm install
npm start
```

Visit:

`http://localhost:4200`

The development frontend should connect to the locally running ASP.NET Core API.

### 4. Use the Application

You can now add, edit, delete, browse, and search books.

Changes are saved to your local SQLite database and remain available after refreshing the page.

## ⚙️ Environment Configuration

The application uses separate configurations for development and production.

**Development**

- Angular connects to the local ASP.NET Core API.
- ASP.NET Core uses SQLite.
- The database is created through EF Core migrations.

**Production**

- Angular connects to the deployed HTTPS API.
- ASP.NET Core uses Microsoft SQL Server.
- The SQL Server connection string is configured privately through hosting environment variables.

Sensitive credentials are not stored in the repository.

**Note:** The initial production SQL Server table was created manually. SQL Server migration tracking has not yet been established, so the existing SQLite migration should not be applied directly to the production database.

## 🔌 REST API Endpoints

| Method | Endpoint      | Description                                                    |
| ------ | ------------- | -------------------------------------------------------------- |
| GET    | `/books`      | Retrieve books, with optional filters, sorting, and pagination |
| GET    | `/books/{id}` | Retrieve a book by ID                                          |
| POST   | `/books`      | Create a new book                                              |
| PUT    | `/books/{id}` | Update an existing book                                        |
| DELETE | `/books/{id}` | Delete a book                                                  |

Example book JSON:

```json
{
  "title": "JoJo's Bizarre Adventure: Stardust Crusaders",
  "author": "Hirohiko Araki",
  "price": 19.99
}
```

## 🔐 Authentication Note

The Register page is a frontend demonstration of form validation.

It does **not** create user accounts or implement authentication or authorization.

The book management API is currently public and does not require user login.

## 📈 Future Improvements

- Implement user authentication and authorization
- Add personal book collections for registered users
- Establish dedicated SQL Server EF Core migrations
- Add automated tests
- Improve production error handling and monitoring
- Add automated deployment checks

## 👨‍💻 About the Project

Books Library was developed as a hands-on full-stack project to practice building and deploying a complete web application.

It demonstrates frontend development with Angular, REST API development with ASP.NET Core, database integration through Entity Framework Core, Git-based version control, and deployment to cloud hosting platforms.

---

Built with Angular, ASP
