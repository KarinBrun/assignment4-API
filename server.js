const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

if (require.main === module) {
    app.listen(port, () => {
         console.log(`API server running at http://localhost:${port}`);
    });
}

module.exports = app;


// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
];


app.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to the Book API", 
        endpoints: { 
            "GET /api/books": "Get all books", 
            "GET /api/books/:id": "Get a specific book by ID",
            'POST /api/books': 'Add a new book',
            'PUT /api/books/:id': 'Update a book',
            'DELETE /api/books/:id': 'Delete a book'
        } 
    }); 
});

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    let bookId = parseInt(req.params.id);
    let book = books.find(b => b.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
});

app.post('/api/books', (req, res) => {
    let { title, author, genre, copiesAvailable } = req.body;
  
    let newBook = {
        id: books.length + 1,
        title,
        author,
        genre,
        copiesAvailable
    };
  
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
    let bookId = parseInt(req.params.id);
    let { title, author, genre, copiesAvailable } = req.body;

    let bookIndex = books.findIndex(b => b.id === bookId);
  
    if (bookIndex === -1) {
          return res.status(404).json({ error: 'Book not found' });
    }

    books[bookIndex] = {
        id: bookId,
        title,
        author,
        genre,
        copiesAvailable
    };

    res.json(books[bookIndex]);
});

app.delete('/api/books/:id', (req, res) => {
    let bookId = parseInt(req.params.id);

    let bookIndex = books.findIndex(b => b.id === bookId);
  
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    let deletedBook = books.splice(bookIndex, 1)[0];

    res.json({ message: 'Book deleted successfully', book: deletedBook });
});
