const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//express app 
const app = express();

//conect to mangodb
const dbURI ='mongodb+srv://netninja:test1234@nodetuts.uzsyc.mongodb.net/node-tuts';
mongoose.connect(dbURI)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');





//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) =>{
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) =>{
      console.log(err);
    });
})

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