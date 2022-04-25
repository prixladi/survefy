import joi from 'joi';
import nc from 'next-connect';

import { bootstrap } from '~lib/server';
import validation from '~lib/server/api/validation';
import { User } from '~lib/server/models';
import { ApiRequest, ApiResponse } from '~lib/server/types';
import { UserCreateDto } from '~types';

const router = nc();

const bodySchema = {
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
};

router.post<ApiRequest<UserCreateDto>, ApiResponse>(
  bootstrap({ DB: true }),
  validation({ body: bodySchema }),
  async (req, res) => {
    const email = User.normalizeEmail(req.body.email);

    if ((await User.countDocuments({ email })) > 0) {
      return res.status(409).json({
        error: 'Email already exists',
      });
    }

    const user = await User.fromRaw(req.body);
    await user.save();

    return res.status(200).json({
      email: user.email,
      _id: user._id,
    });
  },
);

export default router;
