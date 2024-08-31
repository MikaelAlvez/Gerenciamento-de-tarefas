"use client"

import React, { useState } from 'react';
import styles from './page.module.css';
import Button from '@/app/Components/Button';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Armazena o token JWT no localStorage
        localStorage.setItem('token', data.token);
        // Redireciona o usuário para a página de listagem de tarefas
        router.push('/ListTasks');
      } else {
        // Trata erro de login, ex: usuário ou senha incorretos
        console.error('Login falhou');
        alert('Email ou senha incorretos!');
      }
    } catch (error) {
      console.error('Erro ao conectar ao backend:', error);
      alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.loginContainer}>
        <h2>Seja bem-vindo!</h2>
        <h5 className={styles.iniContainer}>Por favor, insira seus dados.</h5>

        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <div className={styles.button}>
            <Button>Log in</Button>
          </div>

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
