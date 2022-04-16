import { User } from '..';

type Data = {
  email: string;
  password: string;
};

const fromRaw = async (data: Data) =>
  new User({
    email: User.normalizeEmail(data.email),
    passwordHash: await User.hashPassword(data.password),
  });

export default fromRaw;
