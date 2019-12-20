//Creating express server
const express = require('express');
const app = express();
//Importing projects data and storing in projects object
const {projects} = require('./data/projects');
//Setting PUG as view engine
app.set('view engine', 'pug');
//Setting static server 
app.use('/static',express.static('public'));
//Home route
app.get('/', (req, res)=>{
    res.render('index', {projects});
});
//about route
app.get('/about', (req, res)=>{
    res.render('about');
});
//project route
app.get('/project', (req, res, next)=>{
    const {id} = req.query;
    if(id > 0 && id <= projects.length){
        res.render('project', {id, projects});
    }
    else{
        const err = new Error('Page Not found');
        err.status = 404;
        next(err);    
    }
});
//Error handling route
app.use((req, res, next)=>{
    const err = new Error('Page Not found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next)=>{
    res.locals.error = err;
    console.error(err);
    res.render('error');
    next();
});

app.listen(3000, () => {
    console.log("Application is running on Port: 3000");
});//Port number that server runs