const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

router.render = (req, res) => {
  res.json({
    data: res.locals.data
  })
}

server.use(router)

server.listen(4000, () => {
  console.log('JSON Server is running')
})
