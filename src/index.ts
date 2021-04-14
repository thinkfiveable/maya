import { MayaClient } from './client/MayaClient'
import { config } from 'dotenv'
import { join } from 'path'

config({ path: join(__dirname, '..', '.env') })

const requiredENVS = ['OWNER_ID', 'MONGO_URI', 'TOKEN']
for (const requiredENV of requiredENVS) {
  if (!process.env[requiredENV]) throw new Error(`Missing the ENV variable ${requiredENV}`)
}

const client = new MayaClient({
  OWNER_ID: process.env.OWNER_ID!,
  MONGO_URI: process.env.MONGO_URI!,
  TOKEN: process.env.TOKEN!,
  DEFAULT_PREFIX: '!'
})

client.start()
