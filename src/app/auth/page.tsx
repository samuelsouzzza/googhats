'use client';
import styles from './page.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { redirectPath } from '@/utils/redirectPath';
import { POST_USER } from '../actions/POST_USER';

export default function AuthPage() {
  const { setUserLogged } = UseGlobalContext();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3>Entre na sua conta</h3>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const authUser = jwtDecode<
              JwtPayload & { name: string; email: string; picture: string }
            >(credentialResponse.credential as string);

            const { name, email, picture } = authUser;

            const data = {
              name,
              email,
              picture,
            };

            const response = await POST_USER(data);
            setUserLogged(response);

            redirectPath('/');
          }}
          onError={() => {
            alert('Não foi possível autenticar com o Google.');
          }}
        />
      </div>
    </div>
  );
}
