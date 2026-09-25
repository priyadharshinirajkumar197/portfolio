import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import nodePath from 'node:path'
import { pathToFileURL } from 'node:url'

export default defineConfig(({ mode }) => {
  // Load env variables into a variable we can reference safely. Vite's config
  // loader shimms process.env in the config file itself, so reading
  // process.env.RESEND_API_KEY returns the string "undefined" (truthy!)
  // instead of the real undefined value. loadEnv() reads the real process.env
  // internally and returns the actual values, so env.RESEND_API_KEY is the
  // real undefined when no .env file is present.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.startsWith('/api/contact')) {
              // Attach body listeners synchronously BEFORE any async work so
              // we never miss the 'data'/'end' events. Previously an awaited
              // dynamic import between listener setup caused the request body
              // to be lost, making every POST fail name validation.
              let body = ''
              req.on('data', (chunk) => {
                body += chunk
              })
              req.on('end', async () => {
                try {
                  const apiModulePath = nodePath.resolve(import.meta.dirname, './api/contact.js')
                  // Use pathToFileURL for correct file:// URL handling on all platforms
                  const apiModule = await import(
                    pathToFileURL(apiModulePath).href + '?update=' + Date.now()
                  )

                  let parsedBody = {}
                  try {
                    parsedBody = body ? JSON.parse(body) : {}
                  } catch {
                    parsedBody = body
                  }

                  // Pass real env values to the handler. Vite's config loader
                  // shimms process.env in the config file itself, so we use the
                  // `env` object from loadEnv() which captured the real values
                  // at config load time.
                  const mockReq = {
                    method: req.method,
                    headers: req.headers,
                    socket: req.socket,
                    body: parsedBody,
                    env: {
                      RESEND_API_KEY: env.RESEND_API_KEY,
                      CONTACT_FROM_EMAIL: env.CONTACT_FROM_EMAIL,
                      CONTACT_TO_EMAIL: env.CONTACT_TO_EMAIL,
                    },
                  }
                  const mockRes = {
                    statusCode: 200,
                    headers: {} as Record<string, string>,
                    setHeader(name: string, value: string) {
                      this.headers[name] = value
                      res.setHeader(name, value)
                    },
                    status(code: number) {
                      this.statusCode = code
                      res.statusCode = code
                      return this
                    },
                    json(data: any) {
                      res.setHeader('Content-Type', 'application/json')
                      res.end(JSON.stringify(data))
                    },
                  }
                  await apiModule.default(mockReq, mockRes)
                } catch (err) {
                  console.error('Error running API:', err)
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(
                    JSON.stringify({
                      error: err instanceof Error ? err.message : 'Internal Server Error',
                    })
                  )
                }
              })
            } else {
              next()
            }
          })
        }
      }
    ],
    resolve: {
      alias: {
        '@': nodePath.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
      strictPort: true,
    },
    preview: {
      host: '0.0.0.0',
      port: parseInt(process.env.PORT || '8443'),
    },
  }
})
