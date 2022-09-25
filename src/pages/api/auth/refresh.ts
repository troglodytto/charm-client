import APIS from 'app/services/urls';
import axios from 'axios';
import { NextApiHandler } from 'next';
import { parseCookies, setCookie } from 'nookies';

const logout: NextApiHandler = async (req, res) => {
  const { refreshToken } = parseCookies({ req });

  const { data } = await axios.post(APIS.REFRESH, { refresh: refreshToken });

  const { refresh_token: updatedRefreshToken, access_token: accessToken } =
    data;

  setCookie({ res }, 'refreshToken', updatedRefreshToken, {
    path: '/',
    httpOnly: true,
    sameSite: true,
    secure: true,
  });

  res.status(200).json({ accessToken });
};

export default logout;
