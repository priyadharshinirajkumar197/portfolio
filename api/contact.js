const requests = new Map()
const MAX_MESSAGE_LENGTH = 5000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const record = requests.get(ip) || { count: 0, startedAt: now }

  if (now - record.startedAt > RATE_LIMIT_WINDOW_MS) {
    requests.set(ip, { count: 1, startedAt: now })
    return false
  }

  record.count += 1
  requests.set(ip, record)
  return record.count > RATE_LIMIT_MAX_REQUESTS
}

function readBody(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return body || {}
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { name, email, message, company } = readBody(req.body)
  const cleanName = typeof name === 'string' ? name.trim() : ''
  const cleanEmail = typeof email === 'string' ? email.trim() : ''
  const cleanMessage = typeof message === 'string' ? message.trim() : ''

  if (company) return res.status(200).json({ ok: true })
  if (isRateLimited(getClientIp(req))) {
    return res.status(429).json({ error: 'Please wait a minute before sending another message.' })
  }
  if (cleanName.length < 2 || cleanName.length > 100) {
    return res.status(400).json({ error: 'Please enter your name.' })
  }
  if (!/^\S+@\S+\.\S+$/.test(cleanEmail) || cleanEmail.length > 254) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }
  if (cleanMessage.length < 10 || cleanMessage.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Your message must be between 10 and 5,000 characters.' })
  }

  // Prefer env injected by the dev middleware (avoids Vite's process.env shim
  // which returns the string "undefined" for unset keys). In production (e.g.
  // Vercel serverless functions), req.env is undefined and we fall back to the
  // real process.env.
  const apiKey = req.env ? req.env.RESEND_API_KEY : process.env.RESEND_API_KEY
  const from = req.env ? req.env.CONTACT_FROM_EMAIL : process.env.CONTACT_FROM_EMAIL
  const to = req.env ? req.env.CONTACT_TO_EMAIL : process.env.CONTACT_TO_EMAIL

  if (!apiKey || !from || !to) {
    console.error('Contact email environment variables are missing.')
    return res.status(503).json({ error: 'Contact service is not configured yet. Please email me directly.' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: cleanEmail,
        subject: `Portfolio message from ${cleanName}`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
      }),
    })

    if (!response.ok) {
      let errorBody = ''
      try {
        errorBody = await response.text()
      } catch {
        // ignore body read errors
      }
      console.error('Email provider request failed:', response.status, errorBody ? '- body: ' + errorBody : '')
      return res.status(502).json({ error: 'Unable to send your message right now. Please try again shortly.' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact endpoint failed:', error)
    return res.status(500).json({ error: 'Unable to send your message right now. Please try again shortly.' })
  }
}
