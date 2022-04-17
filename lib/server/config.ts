import { getIntOrDefault } from '~lib/utils';

const config = {
  db: {
    url: process.env.MONGO_URL || 'mongodb://localhost:27017/survefy',
    options: {
      maxTimeMS: getIntOrDefault(process.env.MONGO_MAX_TIME_MS, 15 * 1000),
    },
    connectOptions: {
      connectTimeoutMS: getIntOrDefault(process.env.MONGO_CONNECT_TIMEOUT_MS, 10 * 1000),
      serverSelectionTimeoutMS: getIntOrDefault(
        process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS,
        5 * 1000,
      ),
    },
  },
  session: {
    secret:
      process.env.SESSION_SECRET ||
      'U`Psl|{D$~%-6EJ}h0(v)s]w1Q4v?j+giu+lN]j%B1wIVdf$P,P3UY9Z56lO."{',
  },
  bootstrap: {
    timeoutMS: getIntOrDefault(process.env.BOOTSTRAP_TIMEOUT_MS, 5 * 1000),
  },
};

export default config;
