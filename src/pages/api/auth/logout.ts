import APIS from 'app/services/urls';
import axios from 'axios';
import { NextApiHandler } from 'next';
import { destroyCookie } from 'nookies';

const logout: NextApiHandler = async (req, res) => {
  destroyCookie({ res }, 'accessToken', { path: '/' });
  destroyCookie({ res }, 'refreshToken', { path: '/' });

  const { data } = await axios.get(APIS.LOGOUT);

  res.status(200).json(data);
};

export default logout;
