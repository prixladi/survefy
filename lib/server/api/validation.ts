import joi, { SchemaLike } from 'joi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

const validationKeys = ['body', 'query', 'params'] as const;
type ValidationKeys = typeof validationKeys[number];
type Options = Partial<Record<ValidationKeys, SchemaLike>>;

const validate =
  (schemas: Options) => async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const bodySchema = schemas.body;

    if (bodySchema) {
      const { error } = joi.compile(bodySchema).validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        return res.status(400).json({
          error: error.message,
          details: error.details,
        });
      }
    }

    return next();
  };

export default validate;
