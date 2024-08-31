import { useState } from 'react';
import axios from 'axios';
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

  const handleLoginRedirect = () => {
    router.push('/');
  };

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        nome,
        email,
        password
      });

      if (response.status === 201) {
        setShowModal(true);
      }
    } catch (error) {
      setErrorMessage("Erro ao registrar. Por favor, tente novamente.");
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.push('/');
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
                  <Button onClick={handleLoginRedirect}>
                    <GiReturnArrow />
                    Voltar
                  </Button>
                  <Button>
                    <IoIosSave />
                    Salvar
                  </Button>
                </div>
            </form>
        </div>

        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2>Usuário cadastrado com sucesso!</h2>
              <div className={styles.modalButtonContainer}>
                <Button
                  onClick={closeModal}>
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
