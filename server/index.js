const express = require('express')
const films = require('./datas/films.json')

const rootRouter = require('./router')

const app = express()
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/films', (req, res) => {
  res.json({
    data: films,
    totalItems: films.length,
  })
})

app.get('/filmDetail', (req, res) => {
  const authentication = req.headers.authorization
  const token = authentication.split(' ')[1]

  const filmDetail = films.find(
    (element) => element.id === parseInt(req.query.id),
  )

  if (!filmDetail) {
    res.sendStatus(404)
  }

  if (filmDetail.isFree) {
    res.json({
      data: filmDetail,
    })
  } else {
    if (!token) {
      res.sendStatus(403)
    }
  }
})

app.use(rootRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () =>
  console.log(`Server stated at http://localhost/:${PORT}`),
)
