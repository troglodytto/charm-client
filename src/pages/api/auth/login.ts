import APIS from 'app/services/urls';
import axios from 'axios';
import { NextApiHandler } from 'next';
import { setCookie } from 'nookies';

const login: NextApiHandler = async (req, res) => {
  const { idToken } = req.body;
  const { data } = await axios.post(APIS.LOGIN, { id_token: idToken });

  const { refresh_token: refreshToken, ...response } = data;

  setCookie({ res }, 'refreshToken', refreshToken, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  res.status(200).json(response);
};

export default login;
