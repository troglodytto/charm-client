import { NextApiHandler } from 'next';
import { destroyCookie } from 'nookies';

const logout: NextApiHandler = async (req, res) => {
  destroyCookie({ res }, 'accessToken', { path: '/' });
  destroyCookie({ res }, 'refreshToken', { path: '/' });

  res.status(200).json({ message: 'Success' });
};

export default logout;
