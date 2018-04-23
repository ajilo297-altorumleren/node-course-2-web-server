const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs', {
//         title: 'Unavailable',
//         pageTitle: 'Server under maintainance',
//         message: 'This website is being updated right now and will be available very soon'
//     })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/home', (req, res) => {
    res.render('home.hbs', {
        title: 'Home',
        pageTitle: 'Welcome',
        message: 'This is just a test. Nothing to see here. Please move on'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad Request',
        description: 'We cannot find the page you requested. Please recheck the address you have entered.'
    })
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        title: 'Projects',
        pageTitle: 'My Portfolio',
        message: 'This page is supposed to be my portfolio.'
    });
});

app.listen(port, () => {
    console.log(`Server is listening at localhost:${port}`);
});