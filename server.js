const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const port = process.env.port || 3000;
 var app =  express();

 hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
var now = new Date().toString();
var log = `${now}:${req.method} ${req.url}`;

console.log(log);

fs.appendFile('server.log', log + '\n', (err)=>{

});

next();
})


// app.use((req, res, next)=>{
// res.render('maintenance.hbs');
// })

hbs.registerHelper('getCurrentYear', () => {
return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    debugger;
return text.toUpperCase();
})

// what to do when system gets a GET request at the RROt level of the local server
app.get('/', (req, res) =>{
//ROUTE
   // res.send('<h1>Hello Express from GET- / </h1>');
    res.render('home.hbs', {
        welcomeMessage: 'Hello Vipin welcome!!!',
        pageTitle : 'About Page'
        
    })
});

app.get('/about', (req, res) =>{
//res.send('Inside About route');
res.render('about.hbs', {
    pageTitle: 'About Page from HBS',
    welcomeMessage: 'Hello Vipin welcome!!!'
    
});
});


app.get('/bad', (req, res) =>{
    res.send({
        
        error : 'BAD request',
        valid: true
    })
})
// app.listen(3000, () => {
//     console.log('Starting Express Server on port 3000!!')
// });


app.listen(port, function(){
    console.log(`Starting Express Server on ${port}`);
    //console.log('Starting Express Server on Port 3000 not by =>')
})