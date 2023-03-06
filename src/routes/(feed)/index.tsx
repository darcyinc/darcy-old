import { lazy } from 'solid-js';
import { useNavigate } from 'solid-start';
import './globals.css';

const Feed = lazy(() => import('~/components/Feed'));
const ValidUserCheck = lazy(() => import('~/components/ValidUserCheck'));

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
