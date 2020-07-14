const http = require('http')
const fs = require('fs')

const homePage = fs.readFileSync('html/index.html')
const aboutPage = fs.readFileSync('html/about.html')
const contactPage = fs.readFileSync('html/index.html')
const notFoundPage = fs.readFileSync('html/notfound.html')

const server = http.createServer((req, res) => {
  if (req.url == '/about')
    res.end(aboutPage)
  else if (req.url == '/contact')
    res.end(contactPage)
  else if (req.url == '/')
    res.end(homePage)
  else {
    res.writeHead(404)
    res.end(notFoundPage)
  }
})

server.listen(3000)

