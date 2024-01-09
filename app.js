const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


//express app
const app = express();

//connect to monodb
const dbURI = 'mongodb+srv://krushangisheth:dhabu26@cluster0.u3cvqhn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(3000))
.catch((err) => console.log(err));


//register view engine
app.set('view engine' , 'ejs');


//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

//routes
app.get('/', (req , res) => {
    res.redirect('/blogs');
});


app.get('/about', (req , res) => {
   res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs',blogRoutes);

//404  page 
app.use((req , res) => {
      res.status(404).render('404', {title: '404'});
  });

//   hve dhyaan thi joje aa error jethaernet saathe connect kris etli var avse 
//   hu kru e step repeat krvnu rese every time haannn
// Steps
// Goto MongoDB
// security>network access>edit>add my current ip>wait until its updated 
// re run code again
