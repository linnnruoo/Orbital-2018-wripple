const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

// requiring the post/get actions
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const projects = require('./routes/api/project');
const contact = require('./routes/api/contact');
const review = require('./routes/api/review');
const search = require('./routes/api/search');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// DB access and config
const db = require('./config/keys').mongoURI;

mongoose.connect(db)
        .then( () => console.log('MongoDB connected') )
        .catch( err => console.log(err) );

// Passport middleware
app.use(passport.initialize());

require('./config/passport')(passport);

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/project', projects);
app.use('/api/contact', contact);
app.use('/api/review', review);
app.use('/api/search', search);

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
        // set static folder
        app.use(express.static('client/build'));

        app.get('*', (req, res) => { 
            res.sendFile(path.resolve(__dirname, 'client', 'build/index.html'));
        });
}


// listen to the port of the live server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));