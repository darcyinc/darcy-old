'use client';

import type { Navigator } from '@solidjs/router';
import { createEffect } from 'solid-js';
import getUserFromToken from '~/api/getUserFromToken';
import { useAccountStore } from '~/hooks/accountStore';

export interface ValidUserCheckProps {
  // without this, useNavigate() throws an error
  navigate: Navigator;
  redirectToIfLogged?: string;
  redirectToIfNotLogged?: string;
}

export default function ValidUserCheck({
  redirectToIfLogged,
  redirectToIfNotLogged,
  navigate,
}: ValidUserCheckProps) {
  const [account, setAccountData] = useAccountStore();

  let currentToken = '';

  createEffect(() => {
    if (!currentToken) return;

    getUserFromToken()
      .then((d) => {
        setAccountData(d);
        if (redirectToIfLogged) {
          navigate(redirectToIfLogged, { replace: true });
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        window.dispatchEvent(new Event('storage'));
        setAccountData({});
        if (redirectToIfNotLogged)
          navigate(redirectToIfNotLogged, { replace: true });
      });
  });

  if (typeof window !== 'undefined') {
    currentToken = localStorage.getItem('token') ?? account().token ?? '';

    if (!currentToken && redirectToIfNotLogged) {
      navigate(redirectToIfNotLogged, { replace: true });
      return null;
    }
  }

  return null;
}
