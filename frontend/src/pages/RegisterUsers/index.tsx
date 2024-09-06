import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import styles from './RegisterUsers.module.css';
import Button from '@/app/Components/Button';
import { useRouter } from 'next/navigation';
import { IoIosSave } from "react-icons/io";
import { GiReturnArrow } from "react-icons/gi";

export default function RegisterUsers() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleLoginRedirect = () => {
    router.push('/');
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setModalMessage("As senhas não coincidem.");
      setErrorMessage('');
      setShowModal(true);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        nome,
        email,
        password
      });
  
      if (response.status === 201) {
        setModalMessage("Usuário cadastrado com sucesso!");
        setErrorMessage('');
        setShowModal(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Checar a resposta do erro
          if (error.response.status === 409) {
            setModalMessage("Usuário já existe.");
          } else {
            setModalMessage("Erro ao registrar. Por favor, tente novamente.");
          }
        } else {
          setModalMessage("Erro desconhecido. Por favor, tente novamente.");
        }
        setErrorMessage('');
        setShowModal(true);
      } else {
        setModalMessage("Erro desconhecido. Por favor, tente novamente.");
        setErrorMessage('');
        setShowModal(true);
      }
      console.error(error);
    }
  };
  

  const closeModal = () => {
    setShowModal(false);
    router.push('/RegisterUsers');
  };

  return (
    <div className={styles.cadastro}>
        <h1>Cadastrar</h1>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <div className={styles.dados}>
            <form onSubmit={handleRegister}>
                <div>
                  <label htmlFor="nome">Nome</label>
                  <input 
                    id="nome"
                    type="text" 
                    placeholder="Nome"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input 
                    id="email"
                    type="email" 
                    placeholder="email@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password">Senha</label>
                  <input 
                    id="password"
                    type="password" 
                    placeholder="********"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword">Confirmar senha</label>
                  <input 
                    id="confirmPassword"
                    type="password" 
                    placeholder="********"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className={styles.buttons}>
                  <Button>
                    <IoIosSave />
                    Salvar
                  </Button>
                  <Button onClick={handleLoginRedirect}>
                    <GiReturnArrow />
                    Voltar
                  </Button>
                </div>
            </form>
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2>{modalMessage}</h2>
              <div className={styles.modalButtonContainer}>
                <Button onClick={closeModal}>
                  <GiReturnArrow />
                  Voltar
                </Button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
