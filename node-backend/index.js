/*
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const helmet = require("helmet");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = 3001;

//app instance
const app = express();

// parse application/json
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const routes = require("./service1/api/routes");
// routes(app);

//middleware setup for http-proxy and routes 
app.use(cors()); // enable cors
// app.use(helmet()); // use http added secure headers
app.use(morgan("combined"));// Log HTTP requests
app.disable("x-powered-by");// Hide Express server information

// Define routes and corresponding microservices
const services = [
    {
        route: "/api/service1",
        target: "http://localhost:3002"
    },
    {
        route: "/api/service2",
        target: "http://localhost:3003"
    }
];

// Define rate limit constants
const rateLimit = 20; // Max requests per minute
const interval = 60 * 1000; // Time window in milliseconds (1 minute)

// Object to store request counts for each IP address
const requestCounts = {};

// setInterval(() => {
//     Object.keys(requestCounts).forEach((ip) => {
//         requestCounts[ip] = 0;
//     })
// }, interval);

function rateLimitAndTimeout(req, res, next) {
    const ip = req.ip; //get client ip

    requestCounts[ip] = (requestCounts[ip] || 0) + 1;
    // Check if request count exceeds the rate limit

    if (requestCounts[ip] > rateLimit) {
        return res.status(429).json({
            code: 429,
            status: "Error",
            message: "No of request limit exccedded",
            data: null
        })
    }

    // Set timeout for each request (example: 10 seconds) 
    //within 10sec response should trigger

    req.setTimeout(15000, () => {
        //handle timeout error
        res.status(504).json({
            code: 504,
            status: "Error",
            message: "Gateway timeout.",
            data: null,
        })
        req.abort();
    });
    next(); // Continue to the next middleware
}

// Apply the rate limit and timeout middleware to the proxy
// app.use(rateLimitAndTimeout);

// Set up proxy middleware for each microservice
const service1Proxy = createProxyMiddleware({
    target: 'http://localhost:3002',
    changeOrigin: true,
    pathRewrite: {
        '^/api/service1': '/', // remove /api/service1 from the URL
    },
});

const service2Proxy = createProxyMiddleware({
    target: 'http://localhost:3003',
    changeOrigin: true,
    pathRewrite: {
        '^/api/service2': '', // remove /api/service2 from the URL
    },
});

// Use the proxy middleware
app.use('/api/service1', service1Proxy);
app.use('/api/service2', service2Proxy);

//handle route not found
app.use((_req, res) => {
    res.status(404).json({
        code: 404,
        status: "Error",
        message: "Route not found.",
        data: null,
    })
});

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to APIs.');
});

//define ports
const port = process.env.PORT || PORT;
app.listen(port, () => {
    console.log(`Gateway is running on port ${port}`);
});
*/



const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require("cors");

const app = express();
const PORT = 3001;
app.use(cors());

// Proxy middleware for Service1
const service1Proxy = createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/service1': '/', // rewrite path
  },
});

// Proxy middleware for Service2
const service2Proxy = createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true,
});

// Use the proxy middleware
app.use('/api/service1', service1Proxy);
app.use('/api/service2', service2Proxy);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});