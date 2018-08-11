# Mlab to MongoDB
Mlab is used to host the DB on cloud
* Register done
* Host is set up on local server @ 5000
### To access the DB
* Create a keys.js file under ./config
```
module.exports = {
    mongoURI:
    'mongodb://<dbUser>:<dbPassword>@ds016148.mlab.com:16148/wripple_users',
    secretOrKey: 'secret'
};
```