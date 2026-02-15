const request = require('supertest');
const app = require('../server');

describe('Book API', () => {
    test('should return all books', async () => {
        let response = await request(app).get('/api/books');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(3); 
    });

    test('should return book by ID', async () => {
        let response = await request(app).get('/api/books/1');
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 1);
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('author');
        expect(response.body).toHaveProperty('genre');
        expect(response.body).toHaveProperty('copiesAvailable');
    });

    test('should return an error when ID not found', async () => {
        const response = await request(app).get('/api/books/999');
    
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });

    test('should create a new book', async () => {
        let newBook = {
            title: "Vengeful",
            author: "V.E. Schwab",
            genre: "Fantasy",
            copiesAvailable: 4
        };

        let response = await request(app)
            .post('/api/books')
            .send(newBook);
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Vengeful');
    });

    test('should update existing book', async () => {
        let updatedBook = {
            title: "The Greatest Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Fiction",
            copiesAvailable: 5
        };

        let response = await request(app)
            .put('/api/books/1')
            .send(updatedBook);
    
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('The Greatest Gatsby');
    });

    test('should delete existing book', async () => {
        let response = await request(app).delete('/api/books/1');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
    });
});
