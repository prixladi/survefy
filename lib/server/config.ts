const config = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/survefy',
  },
  session: {
    secret:
      process.env.SESSION_SECRET ||
      'U`Psl|{D$~%-6EJ}h0(v)s]w1Q4v?j+giu+lN]j%B1wIVdf$P,P3UY9Z56lO."{',
  },
};

export default config;
