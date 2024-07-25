const express = require('express');
//app instance
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

const PORT = 3003;

app.get('/service2', (req, res) => {
    res.json({ message: 'Hello from Service 2!' });
});

app.listen(PORT, () => {
    console.log(`Service 2 is running on port ${PORT}`);
});
module.exports = app;