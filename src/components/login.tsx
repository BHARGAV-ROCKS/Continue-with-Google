import { useGoogleLogin } from '@react-oauth/google';

const Login = ({ setUser }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const userData = await userInfoResponse.json();
      setUser(userData);

      // Send user data to the backend
      await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
        }),
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