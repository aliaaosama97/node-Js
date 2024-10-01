const express = require('express');

//express app 
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);


app.get('/', (req, res) =>{
  const blogs =[
    {title: 'yoshi finds eggs', snippet: 'lorem ipsum dolor sit amet consectetur'},
    {title: 'yoshi finds eggs', snippet: 'lorem ipsum dolor sit amet consectetur'},
    {title: 'yoshi finds eggs', snippet: 'lorem ipsum dolor sit amet consectetur'}
  ];
  res.render('index', {title: 'home' ,blogs} );
});

app.get('/about', (req, res) =>{
  //res.send('<p>about page</p>');
  res.render('about', {title: 'About'});
});

//redirects
app.get('/about-us',(req,res) =>{
  res.redirect('/about');
});

app.get('/blogs/create',(req, res) =>{
  res.render('create', {title: 'Creat a new blog'});
});

//404 page
app.use((req,res) =>{
  res.status(404).render('404', {title: '404'});
});