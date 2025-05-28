const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

app.use((req, res, next) => {
    req.body = req.body || {};
    next();
  });



app.use(express.json());
  

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);
    const result = num1 + num2;
    console.log(req.body);
    res.send(`The result is: ${result}`);
});


app.post('/sendEvent', (req, res) => {
    console.log(req);
    const x = req.body;
    res.send(x);  
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
