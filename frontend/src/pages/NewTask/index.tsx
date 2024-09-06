import { useState } from 'react';
import styles from './NewTask.module.css';
import Button from '@/app/Components/Button';
import { useRouter } from 'next/navigation';
import { IoIosSave } from "react-icons/io";
import { GiReturnArrow } from "react-icons/gi";
import axios from 'axios';

export default function NewTask() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    if (id === 'title') setTitle(value);
    if (id === 'data') setDate(value);
    if (id === 'obs') setDescription(value);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      console.error('Token de autenticação não encontrado!');
      return;
    }
  
    try {
      console.log('Salvando tarefa...');
      await axios.post('http://localhost:3000/api/tasks', {
        title: title,
        date,
        description,
        status: 'Pendente'
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setShowModal(true);
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/ListTasks');
  };

  return (
    <div className={styles.cadastro}>
      <h1>Nova tarefa</h1>
      <div className={styles.dados}>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="title">Título</label>
            <input 
              id="title"
              type="text" 
              placeholder="Ex.: Tarefa 1"
              value={title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="data">Data</label>
            <input 
              id="data"
              type="date" 
              value={date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="obs">Observações</label>
            <textarea 
              id="obs"
              maxLength={150} 
              placeholder="Digite suas observações aqui..."
              value={description}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <div className={styles.buttons}>
          <Button onClick={() => router.push('/ListTasks')}>
            <GiReturnArrow />
            Voltar
          </Button>
          <Button onClick={handleSave}>
            <IoIosSave />
            Salvar
          </Button>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Tarefa salva com sucesso!</h2>
            <p>Sua tarefa foi salva e estará disponível na lista de tarefas.</p>
            <div className={styles.modalButtons}>
              <Button onClick={handleCloseModal}>
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
