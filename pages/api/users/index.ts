import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';

const router = nc();

router.post<NextApiRequest, NextApiResponse>(async (req, res) => {
  res.status(200).json({ name: 'John Doe' });
});

export default router;
