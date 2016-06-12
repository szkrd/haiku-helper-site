const serve = require('koa-static')
const koa = require('koa')
const app = koa()
const port = process.env.PORT || 8080

app.use(serve('./client'))
// $ GET /hello.txt
// app.use(serve('test/fixtures'))
// or use absolute paths
//app.use(serve(__dirname + '/test/fixtures'))

app.listen(port)
console.log(`listening on port ${port}`)
