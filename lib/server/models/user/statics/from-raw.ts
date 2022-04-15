import { User } from '..';

type Data = {
  email: string;
  password: string;
};

const fromRaw = (data: Data) =>
  new User({
    email: User.normalizeEmail(data.email),
    passwordHash: User.hashPassword(data.password),
  });

export default fromRaw;
