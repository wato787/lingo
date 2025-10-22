const { Hono } = require('hono')
const { cors } = require('hono/cors')

const app = new Hono()

// CORS設定
app.use('*', cors({
  origin: ['http://localhost:3000'],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

// ヘルスチェックエンドポイント
app.get('/', (c) => {
  return c.json({ 
    message: 'Lingo API Server', 
    status: 'healthy',
    timestamp: new Date().toISOString()
  })
})

// APIバージョン情報
app.get('/api/version', (c) => {
  return c.json({
    version: '1.0.0',
    name: 'Lingo API',
    description: 'Language learning application API'
  })
})

// 開発サーバー起動
const port = process.env.PORT || 3001

console.log(`🚀 Server is running on http://localhost:${port}`)

// Node.js環境での起動
const { serve } = require('@hono/node-server')
serve({
  fetch: app.fetch,
  port: Number(port)
})
