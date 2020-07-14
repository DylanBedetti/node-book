// import express from 'express';
const express = require('express')
const app = express();
const path = require('path')

// adding middleware for static pages
app.use(express.static('public'))

// variables
const PORT = 3000

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`)
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/html/index.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/html/about.html'))
})

app.get('/contact', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/html/contact.html'))
})