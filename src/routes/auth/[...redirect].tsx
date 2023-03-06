import { useNavigate } from 'solid-start';

export default function Redirector() {
  const navigate = useNavigate();

  navigate('/auth/sign_in', { replace: true });
}
