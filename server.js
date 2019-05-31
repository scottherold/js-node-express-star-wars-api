// <---------- Server setup ---------->
var express = require('express');
var app = express();
// Requires axios for API calls (promises
const axios = require('axios');

// <---------- Dependencies ---------->
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// <---------- Routing ---------->
// Root
app.get('/', function(req, res) {
    res.render('index', {title: "star wars api"});
})

// people -- API call
app.get('/people', function(req, res) {
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get('http://swapi.co/api/people')
    .then(response => {
        // log the data before moving on!
        console.log(response);
        // rather than rendering, just send back the json data!
        // response.data must be returned, or an error will be thrown
        res.json(response.data);
    })
});

// all People -- API call -- Needs to be before ID
app.get('/people/all', function(req, res) {
    // Creates recursion using a function to pull all people data
    // need 'URL' due to URL changing
    var getAllPeople = (url, people) => {
        // use the axios .get() method - provide a url and chain the .then() and .catch() methods
        axios.get(url)
        .then(response => {
            // log the data before moving on!
            console.log(response);

            // Concats the data from previous call
            const allPeople = people.concat(response.data.results)

            // Checks the 'next' property to see if its not null
            if (response.data.next !== null) {
                // recursively calls itself with URL provided by next!
                getAllPeople(response.data.next, allPeople)
            } else {
                res.json(allPeople);
            }
            // rather than rendering, just send back the json data!
            // response.data must be returned, or an error will be thrown
        })
        .catch(error => {
            // log the error before moving on!
            console.log(error);
            res.json(error);
        })
    }

    // Calls function
    getAllPeople('http://swapi.co/api/people', []);
});

// prev/next people -- API call
app.get('/people/:id', function(req, res) {
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get(`http://swapi.co/api/people/?page=${req.params.id}`)
    .then(response => {
        // log the data before moving on!
        console.log(response);
        // rather than rendering, just send back the json data!
        // response.data must be returned, or an error will be thrown
        res.json(response.data);
    })
});

// planets -- API call -- Needs to be before ID
app.get('/planets', function(req, res) {
    // use the axios .get() metohd - provide a url and chain the .then() and .catch() methods
    axios.get('http://swapi.co/api/planets')
    .then(response => {
        // log the data before moving on!
        console.log(response);
        // rather than rendering, just send back the json data!
        // response.data must be returned, or an error will be thrown
        res.json(response.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        res.json(error);
    })
});

// all planets -- API call
app.get('/planets/all', function(req, res) {
    // Creates recursion using a function to pull all people data
    // need 'URL' due to URL changing
    var getAllPlanets = (url, planets) => {
        // use the axios .get() method - provide a url and chain the .then() and .catch() methods
        axios.get(url)
        .then(response => {
            // log the data before moving on!
            console.log(response);

            // Concats the data from previous call
            const allPlanets = planets.concat(response.data.results)

            // Checks the 'next' property to see if its not null
            if (response.data.next !== null) {
                // recursively calls itself with URL provided by next!
                getAllPlanets(response.data.next, allPlanets)
            } else {
                res.json(allPlanets);
            }
            // rather than rendering, just send back the json data!
            // response.data must be returned, or an error will be thrown
        })
        .catch(error => {
            // log the error before moving on!
            console.log(error);
            res.json(error);
        })
    }

    // Calls function
    getAllPlanets('http://swapi.co/api/planets', []);
});

// prev/next planet -- API call
app.get('/planets/:id', function(req, res) {
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get(`http://swapi.co/api/planets/?page=${req.params.id}`)
    .then(response => {
        // log the data before moving on!
        console.log(response);
        // rather than rendering, just send back the json data!
        // response.data must be returned, or an error will be thrown
        res.json(response.data);
    })
});

// <---------- Port listening ---------->
app.listen(8000, function() {
    console.log('listening on port 8000...')
})