const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3002;

//app instance
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

const routes = require("./api/routes");
// routes(app);
app.use("/", routes);

app.get('/service1', (req, res) => {
    res.json({ message: 'Hello from Service 1!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Service 1 is running on port ${PORT}`);
});

module.exports = app;