import { lazy } from 'solid-js';
import { useNavigate } from 'solid-start';
import './globals.scss';

const Feed = lazy(async () => import('~/components/Feed'));
const ValidUserCheck = lazy(async () => import('~/components/ValidUserCheck'));

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <ValidUserCheck
        redirectToIfNotLogged="/auth/sign_in"
        navigate={navigate}
      />
      <Feed />
    </>
  );
}
