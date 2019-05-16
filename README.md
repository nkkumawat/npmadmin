# npmadmin
Admin panel for your MySql databse.
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
    user     : 'root',
    password : '1234',
    database : 'dbname'
};
var port = 3000;
npmadmin.init(config).then(res => {
    npmadmin.createUser('narendra' , "kumawat").then(res =>{
        npmadmin.start(port);
    }).catch(err => {
	console.log(err);
    })
}).catch(err =>{
    console.log(err);
});

```
#####  open this url in browser :
```url
http://localhost:port
```

#### Contribute
email me on nk0kumawat@gmail.com
