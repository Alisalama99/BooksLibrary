using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200",     "https://bookslibrary.pages.dev"
)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = builder.Configuration
        .GetConnectionString("DefaultConnection");

    if (builder.Configuration.GetValue<bool>("UseSqlite"))
    {
        options.UseSqlite(connectionString);
    }
    else
    {
        options.UseSqlServer(connectionString);
    }
});

var app = builder.Build();
app.UseCors("AngularApp");

var books = new List<Book>
{
    new Book
    {
        Id = 1,
        Title = "Dune",
        Author = "Frank Herbert",
        Price = 20
    },

    new Book
    {
        Id = 2,
        Title = "1984",
        Author = "George Orwell",
        Price = 15
    },

    new Book
    {
        Id = 3,
        Title = "Clean Code",
        Author = "Robert C. Martin",
        Price = 25
    },

    new Book
    {
        Id = 4,
        Title = "Animal Farm",
        Author = "George Orwell",
        Price = 12
    }
};


// GET ALL BOOKS
// GET ALL BOOKS — filtering, sorting, and pagination
app.MapGet("/books", async (
    decimal? maxPrice,
    decimal? minPrice,
    string? sortBy,
    AppDbContext db,
    int page = 1,
    int pageSize = 10) =>
{
    // 1. Validate price range
    if (minPrice.HasValue &&
        maxPrice.HasValue &&
        minPrice.Value > maxPrice.Value)
    {
        return Results.BadRequest(
            "minPrice cannot be greater than maxPrice."
        );
    }

    // 2. Validate pagination parameters
    if (page <= 0 || pageSize <= 0 || pageSize > 100)
    {
        return Results.BadRequest(
            "page must be at least 1 and pageSize must be between 1 and 100."
        );
    }

    // 3. Build the query
    var query = db.Books.AsNoTracking();

    // 4. Apply price filters
    if (minPrice.HasValue)
    {
        query = query.Where(b => b.Price >= minPrice.Value);
    }

    if (maxPrice.HasValue)
    {
        query = query.Where(b => b.Price <= maxPrice.Value);
    }

    // 5. Apply sorting
    if (sortBy == "price")
    {
        query = query
            .OrderBy(b => b.Price)
            .ThenBy(b => b.Id);
    }
    else if (sortBy == "priceDesc")
    {
        query = query
            .OrderByDescending(b => b.Price)
            .ThenBy(b => b.Id);
    }
    else
    {
        // Default: sort by ID
        query = query.OrderBy(b => b.Id);
    }

    // 6. Apply pagination
    int skip = (page - 1) * pageSize;

    query = query
        .Skip(skip)
        .Take(pageSize);

    // 7. Execute the database query
    var books = await query.ToListAsync();

    // 8. Return the result
    return Results.Ok(books);
});


// GET ONE BOOK BY ID
app.MapGet("/books/{id:int}", async (
    int id,
    AppDbContext db) =>
{
    var book = await db.Books.FindAsync(id);

    return book is not null
        ? Results.Ok(book)
        : Results.NotFound();
});


// CREATE A BOOK
app.MapPost("/books", async (CreateBookRequest request, AppDbContext db) =>
{
    var errors = ValidateBook(request.Title, request.Author, request.Price);
    if (errors.Count> 0)
    {
        return Results.ValidationProblem(errors);
    }
var book = new Book
    {
        Title = request.Title,
        Author = request.Author,
        Price = request.Price
    };

    db.Books.Add(book);
    await db.SaveChangesAsync();

    return Results.Created($"/books/{book.Id}", book);
});


// UPDATE A BOOK
app.MapPut("/books/{id}", async (int id, UpdateBookRequest request, AppDbContext db) =>
{
    var book = await db.Books.FindAsync(id);

if (book is null)
{
    return Results.NotFound();
}
    var errors = ValidateBook(request.Title, request.Author, request.Price);
    if (errors.Count > 0)
    return Results.ValidationProblem(errors);

    book.Title = request.Title ;
    book.Author = request.Author;
    book.Price = request.Price;

    await db.SaveChangesAsync();
    return Results.NoContent();

});


// DELETE A BOOK
app.MapDelete("/books/{id}", async (int id, AppDbContext db) =>
{
    var book = await db.Books.FindAsync(id);

    if (book is null)
    {
        return Results.NotFound();
    }

    db.Books.Remove(book);
    await db.SaveChangesAsync();

    return Results.NoContent();
});


app.Run();


// MODELS / DTOs

static Dictionary<string, string[]> ValidateBook(string title, string author, decimal price)
{
    var errors = new Dictionary<string, string[]>();

    if(string.IsNullOrWhiteSpace(title))
    errors["Title"] = new[]{"Title is Required"};

    if(string.IsNullOrWhiteSpace(author))
    errors["Author"] = new[]{"Author is Required"};

    if(price<=0)
    errors["Price"] = new[]{"Price must be greater than zero"};

    return errors;
    
}

public class Book
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Author { get; set; } = string.Empty;

    public decimal Price { get; set; }
}

record CreateBookRequest(
    string Title,
    string Author,
    decimal Price
);

record UpdateBookRequest(
    string Title,
    string Author,
    decimal Price
);

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Book> Books { get; set; }
}

