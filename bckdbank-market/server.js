
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const TOKEN = process.env.FINNHUB_TOKEN

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use(express.json())

async function finnhubRequest(endpoint, symbol) {
  if (!TOKEN) {
    throw new Error('Falta configurar FINNHUB_TOKEN en .env')
  }

  const url = new URL(`https://finnhub.io/api/v1/${endpoint}`)
  url.searchParams.set('symbol', symbol)
  url.searchParams.set('token', TOKEN)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Finnhub respondió con estado ${response.status}`)
  }

  return response.json()
}

app.get('/finnhub/quote', async (req, res) => {
  try {
    const symbol = String(req.query.symbol || '').trim().toUpperCase()

    if (!/^[A-Z0-9.-]{1,15}$/.test(symbol)) {
      return res.status(400).json({ message: 'Símbolo inválido' })
    }

    const data = await finnhubRequest('quote', symbol)
    res.json(data)
  } catch (error) {
    console.error('Error en quote:', error.message)
    res.status(502).json({ message: 'No se pudo obtener la cotización' })
  }
})

app.get('/finnhub/profile', async (req, res) => {
  try {
    const symbol = String(req.query.symbol || '').trim().toUpperCase()

    if (!/^[A-Z0-9.-]{1,15}$/.test(symbol)) {
      return res.status(400).json({ message: 'Símbolo inválido' })
    }

    const data = await finnhubRequest('stock/profile2', symbol)
    res.json(data)
  } catch (error) {
    console.error('Error en profile:', error.message)
    res.status(502).json({ message: 'No se pudo obtener el perfil de la empresa' })
  }
})

app.listen(PORT, () => {
  console.log(`Servicio financiero activo en http://localhost:${PORT}`)
})
