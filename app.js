const express = require('express');
const app = express();

const {projects} = require('./data/projects');

app.set('view engine', 'pug');

app.use('/static',express.static('public'));
console.log(projects[0]);
app.get('/', (req, res)=>{
    res.render('index', {projects});
});
app.get('/about', (req, res)=>{
    res.render('about');
});
app.get('/:id', (req, res, next)=>{
    const {id} = req.params;
    console.log(id)
    if(id > 0 && id <= projects.length){
        res.render('project', {id, projects});
    }
    else{
        const err = new Error('Project Not found');
        err.status = 404;
        next(err);    
    }
});
app.use((req,res, next) =>{
    const err = new Error('Not found');
    err.status = 404;
    next(err);
 });
app.use((err, req, res, next)=>{
    res.locals.error = err;
    console.error("Page not found: 404",err);
    res.render('error', err);
    next();
});

app.listen(3000, () => {
    console.log("Application is running on Port: 3000");
});//Port number that server runs