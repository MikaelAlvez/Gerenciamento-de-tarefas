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
  const [observations, setObservations] = useState('');

  const handleInputChange = (e: { target: { id: any; value: any; }; }) => {
    const { id, value } = e.target;
    if (id === 'title') setTitle(value);
    if (id === 'data') setDate(value);
    if (id === 'obs') setObservations(value);
  };

  const handleSave = async () => {
    try {
      console.log('Salvando tarefa...');
      await axios.post('http://localhost:3000/api/tasks', {
        titleTask: title,
        date,
        observations,
        status: 'Pendente'
      });
      router.push('/ListTasks');
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
    }
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
                      value={observations}
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
    </div>
  );
}
