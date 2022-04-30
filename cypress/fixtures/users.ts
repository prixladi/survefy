import { randomBytes } from "crypto";

export const defaultUser = {
  email: 'el.ix@atlas.cz',
  password: 'el.ix@atlas.cz',
};

export const factoryUser = () => ({
  email: `${randomBytes(5).toString('hex')}@email.com`,
  password: 'password',
});
