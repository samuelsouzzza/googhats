'use client';
import styles from './page.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { UseGlobalContext } from '@/globals/GlobalContext';
import { redirectPath } from '@/utils/redirectPath';
import { POST_USER } from '../actions/POST_USER';
import { Input } from '@/components/Input/Input';
import Image from 'next/image';
import React, { FormEvent } from 'react';
import { Button } from '@/components/Button/Button';

export default function AuthPage() {
  const { setUserLogged } = UseGlobalContext();
  const [txtEmail, setTxtEmail] = React.useState('');
  const [txtPassword, setTxtPassword] = React.useState('');

  function enterLogin(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image src={'/logo.png'} height={50} width={50} alt='Logo GooGhats' />
        <h3>Entre na sua conta</h3>
        <form className={styles.formLogin} onSubmit={enterLogin}>
          <label>
            E-Mail
            <Input value={txtEmail} setValue={setTxtEmail} />
          </label>
          <label>
            Senha
            <Input
              value={txtPassword}
              setValue={setTxtPassword}
              type='password'
            />
          </label>
          <Button
            text={'Entrar'}
            style={{ width: '100%', margin: '4% 0', height: '40px' }}
          />
          <div className={styles.boxLinks}>
            <a href='#'>Esqueci a senha</a>
            <a href='#'>Criar uma nova conta</a>
          </div>
        </form>
        <div className={styles.boxHr}>
          <span className={styles.hr} />
          <p>Ou</p>
          <span className={styles.hr} />
        </div>
        <GoogleLogin
          theme='filled_black'
          useOneTap
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
        {/* <span className={styles.hr} />
        <Image
          src={'http://jwt.io/img/logo-asset.svg'}
          height={35}
          width={50}
          alt='JWT Logo'
        /> */}
      </div>
    </div>
  );
}
