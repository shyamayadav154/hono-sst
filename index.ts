// create a hono api
import { Hono } from 'hono'
import { handle } from "hono/aws-lambda";

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/ip',async (c) => {
  const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip')
  return c.json({ ip })
})


export const handler = handle(app)
