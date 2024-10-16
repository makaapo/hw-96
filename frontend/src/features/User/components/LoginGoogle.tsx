import { googleLogin } from '../usersThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
const LoginGoogle = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      await dispatch(googleLogin(credentialResponse.credential)).unwrap();
      navigate('/');
    }
  };
  return (
    <>
      <GoogleLogin
        onSuccess={googleLoginHandler}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </>
  );
};
export default LoginGoogle;
