const config = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/survefy',
    options: {
      connectTimeoutMS:
        (process.env.MONGO_CONNECT_TIMEOUT_MS && parseInt(process.env.MONGO_CONNECT_TIMEOUT_MS)) ||
        10 * 1000,
      socketTimeoutMS:
        (process.env.MONGO_SOCKET_TIMEOUT_MS && parseInt(process.env.MONGO_SOCKET_TIMEOUT_MS)) ||
        100 * 1000,
        maxIdleTimeMS:
        (process.env.MONGO_MAX_TIME_MS && parseInt(process.env.MONGO_MAX_TIME_MS)) || 10 * 1000,
    },
  },
  session: {
    secret:
      process.env.SESSION_SECRET ||
      'U`Psl|{D$~%-6EJ}h0(v)s]w1Q4v?j+giu+lN]j%B1wIVdf$P,P3UY9Z56lO."{',
  },
};

export default config;
