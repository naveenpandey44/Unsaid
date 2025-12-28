import { defineConfig } from '@prisma/internals'

export default defineConfig({
  datasourceUrls: {
    db: 'file:./dev.db'
  }
})
