const express = require('express');
const databaseConnection = require('./database');
const bookRouter = require('./route/book.routes');
const cors = require('cors');

databaseConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/book", bookRouter);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});