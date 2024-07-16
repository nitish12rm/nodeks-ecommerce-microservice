/*
The API gateway routes requests to the authentication microservice for user authentication and authorization. 
It directs product-related requests to the product microservice 
and order-related requests to the order microservice.

*/

// Api Gateway
const express = require('express');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const app = express();

//Route requests to auth service
app.use("/auth",(req,res)=>{
    proxy.web(req,res, {target:"http://auth:3000"});
});

//route request to product service
app.use("/products",(req,res)=>{
    proxy.web(req,res,{target:"http://product:3001"});
});

//route request to order service 
app.use("/orders", (req, res) => {
    proxy.web(req, res, { target: "http://order:3002" });
  });

// Start the server
const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`API Gateway listening on port ${port}`);
});