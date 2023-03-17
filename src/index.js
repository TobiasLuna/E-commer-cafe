require('dotenv').config();
const app = require('./server');
require('./database.js');

app.listen(app.get('port'), () => {
    console.log("server on port ",app.get('port'))
})