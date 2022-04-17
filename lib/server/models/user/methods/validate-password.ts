import { compare } from 'bcrypt';
import { User } from '..';

async function validatePassword(this: User, password: string) {
  return compare(password, this.passwordHash);
}

export default validatePassword;
