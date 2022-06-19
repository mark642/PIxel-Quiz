const express = require('express');
const app = express()
const fs = require('fs');
const path = require('path')
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/', (req, res) => {
  let data = req.body; //gettin data from request body
  console.log(data);
  const file = JSON.parse(fs.readFileSync('data.json')) //reading data from json file
  file.push(data) 
  console.log(file)
  fs.writeFileSync('data.json', JSON.stringify(file)) //updating data from json file
  res.send('Hello!')
})

app.delete('/', (req, res) => {
  fs.writeFileSync('data.json', JSON.stringify([]));
  res.send('Hello2!');
})

/* 
  Queries for sql:

  create table PIXEL (
    id int,
    r int,
    g int,
    b int,
  )

  insert into PIXEL (id, r, g, b) values (req.body.id, req.body.genes.r, req.body.genes.g, req.body.genes.b);
*/

app.listen(3000)