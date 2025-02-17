import { useGoogleLogin } from '@react-oauth/google';

const Login = ({ setUser }) => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        setUser(data);
      });
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => login()}>Sign in with Google</button>
    </div>
  );
};

export default Login;