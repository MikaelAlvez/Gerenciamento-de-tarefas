import axios from 'axios';
import { useState } from 'react';
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
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleRegister = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setModalMessage('As senhas não coincidem.');
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        nome,
        email,
        password,
      });

      if (response.status === 201) {
        setModalMessage('Usuário cadastrado com sucesso!');
        setShowModal(true);
      }
    } catch (error) {
      setModalMessage('Usuário já cadastrado!');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.refresh();
  };

  const handleLoginRedirect = () => {
    router.push('/');
  };

  return (
    <div className={styles.cadastro}>
      <h1>Cadastrar</h1>
      <div className={styles.dados}>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="nome">Nome</label>
            <input 
              id="nome"
              type="text" 
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Senha</label>
            <input 
              id="password"
              type="password" 
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input 
              id="confirmPassword"
              type="password" 
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttons}>
            <Button onClick={handleLoginRedirect}>
              <GiReturnArrow />
              Voltar
            </Button>
          </div>
          <div className={styles.buttons}>
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
            <h2>{modalMessage}</h2>
            <button onClick={handleCloseModal} className={styles.closeButton}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
