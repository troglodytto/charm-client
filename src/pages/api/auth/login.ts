import httpClient from 'app/services/http';
import { NextApiHandler } from 'next';
import { setCookie } from 'nookies';

const login: NextApiHandler = async (req, res) => {
  const { idToken } = req.body;

  const { data } = await httpClient.post('auth/login', { id_token: idToken });
  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    ...response
  } = data;

  setCookie({ res }, 'accessToken', accessToken, {
    maxAge: 900,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  setCookie({ res }, 'refreshToken', refreshToken, {
    maxAge: 30000,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  res.status(200).json(response);
};

export default login;
