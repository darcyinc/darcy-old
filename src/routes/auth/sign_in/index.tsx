import { useNavigate } from '@solidjs/router';
import { createMemo, createSignal, lazy } from 'solid-js';
import { A, Title } from 'solid-start';
import Logo from '~/assets/logo-cropped.png?webp&w=80&h=72&imagetools';
import type { SyntheticEvent } from '~/types/imagetools';
import emailRegex from '~/utils/emailRegex';
import { Actions, Card, Container, Form, LogoContainer } from './styles';

const ValidUserCheck = lazy(() => import('~/components/ValidUserCheck'));

const EMAIL_REGEX = emailRegex();

export default function Home() {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const [emailError, setEmailError] = createSignal('');
  const [passwordError, setPasswordError] = createSignal('');

  const hasValidationErrors = createMemo(
    () => emailError() !== '' || passwordError() !== ''
  );

  const navigate = useNavigate();

  const handleValidations = () => {
    // Cleanup errors
    setEmailError('');
    setPasswordError('');

    // Length validation
    if (email().length === 0) setEmailError('O campo email é obrigatório.');
    if (password().length === 0)
      setPasswordError('O campo senha é obrigatório.');

    // Email validation
    if (!email().includes('@') || !EMAIL_REGEX.test(email()))
      setEmailError('O campo email deve ser um email válido.');

    // Password validation
    if (password().length < 8)
      setPasswordError('A senha deve ter no mínimo 8 caracteres.');
  };

  const handleEmail = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setEmail(value);
    handleValidations();
  };

  const handlePassword = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setPassword(value);
    handleValidations();
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasValidationErrors()) return;

    try {
      const doUserLogin = (await import('~/api/doUserLogin')).default;
      const res = await doUserLogin({ email: email(), password: password() });

      if (res.errors?.[0]) {
        setEmailError(res.errors[0].message);
        setPasswordError(res.errors[0].message);
        return;
      }

      localStorage.setItem('token', res.token);
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch {
      setEmailError('Ocorreu um erro ao tentar se autenticar.');
      setPasswordError('Ocorreu um erro ao tentar se autenticar.');
    }
  };

  return (
    <Container>
      <Title>Darcy - Log in</Title>
      <ValidUserCheck redirectToIfLogged="/" navigate={navigate} />

      <Card>
        <LogoContainer>
          <img
            alt="Logo"
            // class={styles.logo}
            draggable={false}
            height={72}
            src={Logo}
            width={80}
          />
          <span>Darcy</span>
        </LogoContainer>

        <Form onSubmit={handleSubmit}>
          <div
          // class={styles.email}
          >
            <div>
              <label for="email">E-mail</label>
              {emailError && <label for="email">{emailError()}</label>}
            </div>

            <input
              id="email"
              name="email"
              onInput={handleEmail}
              placeholder="me@example.com"
              type="email"
              value={email()}
            />
          </div>

          <div
          // class={styles.password}
          >
            <div>
              <label for="password">Senha</label>
              {passwordError && <label for="password">{passwordError()}</label>}
            </div>

            <input
              id="password"
              name="password"
              onInput={handlePassword}
              placeholder="********"
              type="password"
              value={password()}
            />
          </div>

          <Actions>
            <button
              // class={styles.login}
              disabled={
                emailError().length > 0 ||
                passwordError().length > 0 ||
                email().length === 0 ||
                password().length === 0 ||
                password().length < 8 ||
                !email().includes('@')
              }
              type="submit"
            >
              Entrar
            </button>

            <span>
              <A href="/auth/sign_up">Criar conta</A>
              {' - '}
              <a href="#forgot_password">Esqueceu sua senha?</a>
            </span>
          </Actions>
        </Form>
      </Card>
    </Container>
  );
}
