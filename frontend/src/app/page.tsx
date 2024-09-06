"use client"

import React, { useState } from 'react';
import styles from './page.module.css';
import Button from '@/app/Components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
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
        localStorage.setItem('token', data.token);
        router.push('/ListTasks');
      } else {
        setModalMessage('Email ou senha incorretos!');
        setShowModal(true);
      }
    } catch (error) {
      console.error('Erro ao conectar ao backend:', error);
      setModalMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      setShowModal(true);
    } 
  };

  const closeModal = () => {
    setShowModal(false);
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
              />
              <label className={styles.textBlue}>Lembre-se de mim</label>
            </div>
            <label className={styles.textBlue}>Esqueceu a senha?</label>
          </div>

          <div className={styles.button}>
            <Button>
              Log in
            </Button>
          </div>

          <h4 className={styles.textConta}>Não tem uma conta? <Link className={styles.textBlue} href={"/RegisterUsers"}>Inscreva-se</Link></h4>
        </form>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{modalMessage}</h2>
            <div className={styles.modalButtonContainer}>
              <Button 
                onClick={closeModal}>
                Voltar
                </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
