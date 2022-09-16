import httpClient from 'app/services/http';
import { NextApiHandler } from 'next';
import { setCookie } from 'nookies';

const login: NextApiHandler = async (req, res) => {
  const { idToken } = req.body;
  const { data } = await httpClient.post('auth/login', { id_token: idToken });

  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    max_age: maxAge,
    ...response
  } = data;

  setCookie({ res }, 'accessToken', accessToken, {
    maxAge,
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  setCookie({ res }, 'refreshToken', refreshToken, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: true,
  });

  res.status(200).json(response);
};

export default login;
