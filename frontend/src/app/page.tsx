"use client"

import React from 'react';
import styles from './page.module.css';
import Button from '@/app/Components/Button';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter();
  
  const handleLoginRedirect = () => {
    router.push('/ListTasks');
  };

  return (
    <div className={styles.background}>
      <div className={styles.loginContainer}>
        <h2>Seja bem-vindo!</h2>
        <h5 className={styles.iniContainer}>Por favor, insira seus dados.</h5>

        <form>
          <input 
            type="email" 
            placeholder="Email"
            required
          />
          <input 
            type="password" 
            placeholder="Senha" 
            required
          />
          <div className={styles.check}>
            <div className={styles.checkbox}>
              <input
                type="checkbox"
                placeholder='Lembre-se de mim'
              ></input>
              <label className={styles.textBlue}>Lembre-se de mim</label>
            </div>
            <label className={styles.textBlue}>Esqueceu a senha?</label>
          </div>

          <Button onClick={handleLoginRedirect}>Log in</Button>

          <h4 className={styles.textConta}>Não tem uma conta? <Link className={styles.textBlue} href={"/RegisterUsers"}>Inscreva-se</Link></h4>
          <h4 className={styles.textConta}>Logar com</h4>
          <div className={styles.redes}>
            <FcGoogle size={'3em'}/>
            <FaFacebook size={'3em'} style={{ color: '#3b5998' }}/>
          </div>
        </form>
      </div>
    </div>
  );
}