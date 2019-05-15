# npmadmin

### how to start
#####  open terminal and  :
```
$ npm install npmadmin --save
```
#####  write this into your server file  :
```javascript
var npmadmin = require('npmadmin');
var config = {
    host     : 'localhost',
    user     : 'username',
    password : 'password',
    database : 'databasename'
};
var port = XXXX;
npmadmin.init(config);
npmadmin.start(port);
```
#####  open this url in browser :
```url
http://localhost:port/dashboard
```
