import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import jwt from 'jsonwebtoken'

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser('my super duper secret lol'))

// CREATE cookies
app.get('/cookie', (req, res) => {
  res.cookie('volume', '0.3')
  res.cookie('token', '12435676ui7696sfz`x214r23rwfa')
  res.send({ message: 'I will set a cookie here soon!' })
})

// UPDATE cookies
app.get('/update-cookie', (req, res) => {
  res.cookie('token', 'LOL!')
  res.send({ message: 'Cookie updated!' })
})

// DELETE cookies
app.get('/remove-cookie', (req, res) => {
  res.clearCookie('token')
  res.clearCookie('volume')
  res.send({ message: 'Bye bye cookies!' })
})

// READ cookies
app.get('/log-cookies', (req, res) => {
  console.log("The user's token is:", req.signedCookies.token)

  res.send({ message: 'I just logged all the cookies in the console lol :D' })
})

app.get('/signed-cookie', (req, res) => {
  res.cookie('my-super-secure-token', '213456adsfghj12e3456', {
    signed: true,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 3
  })
  res.send({ message: 'I just set a signed cookie, yay!' })
})

app.post('/sign-in', (req, res) => {
  const { email, password } = req.body

  if (email === 'nicolas@email.com' && password === 'Nicolas') {
    res.cookie('token', jwt.sign({ id: 1 }, 'shhhh'), {
      signed: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3
    })
    res.send({ message: 'Welcome Nico!' })
  } else {
    res.send({ message: 'Police!!!!' })
  }
})

app.get('/validate', (req, res) => {
  const token = req.signedCookies.token
  // getCurrentUserFromToken(token)
  if (token) {
    res.send({ message: 'Yay you has token!' })
  } else {
    res.send({ message: 'How dare you!?' })
  }
})

app.get('/sign-out', (req, res) => {
  res.clearCookie('token')
  res.send({ message: 'You are now signed out!' })
})

app.listen(4000, () => {
  console.log(`Server up: http://localhost:4000`)
})
