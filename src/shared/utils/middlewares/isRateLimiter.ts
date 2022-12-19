import rateLimit, { MemoryStore } from 'express-rate-limit'

export const isRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  store: new MemoryStore(),
  message: 'Too many requests, please try again later.'
})
