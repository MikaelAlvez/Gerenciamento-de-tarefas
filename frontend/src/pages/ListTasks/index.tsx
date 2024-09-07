import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './ListTasks.module.css';
import TaskCards from '@/app/Components/TaskCards';
import Source from '@/app/Components/Source';
import Button from '@/app/Components/Button';
import { IoMdAddCircle } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { useRouter } from 'next/navigation';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Concluído' | 'Pendente' | 'Em progresso';
  date: string;
}

export default function ListTasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDialogElement>(null);
  const successModalRef = useRef<HTMLDialogElement>(null);

  const handleNewTaskRedirect = () => {
    router.push('/NewTask');
  };

  const handleHomeRedirect = () => {
    router.push('/');
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado!');
      return;
    }

    try {
      const response = await axios.get<Task[]>('http://localhost:3000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const fetchUserName = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado!');
      return;
    }

    try {
      const response = await axios.get<{ name: string }>('http://localhost:3000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserName(response.data.name);
    } catch (error) {
      console.error('Erro ao buscar nome do usuário:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(lowercasedQuery) ||
      task.status.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredTasks(filtered);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado!');
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setFilteredTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setSuccessMessage('Tarefa excluída com sucesso!');
      if (successModalRef.current) {
        successModalRef.current.showModal();
        setTimeout(() => {
          if (successModalRef.current) {
            successModalRef.current.close();
          }
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleEdit = async (id: number, updatedTask: Task) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado!');
      return;
    }
  
    try {
      // Atualize a tarefa no backend
      await axios.put(`http://localhost:3000/api/tasks/${id}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Atualize a lista de tarefas no frontend
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
      setFilteredTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };
  

  useEffect(() => {
    fetchTasks();
    fetchUserName();
  }, []);

  useEffect(() => {
    if (userName && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [userName]);

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div className={styles.container}>
      <dialog ref={successModalRef} className={styles.successModal}>
        {successMessage}
      </dialog>

      <div className={styles.layout}>
        <Source onSearch={handleSearch} />
        <div className={styles.logout}>
          <Button onClick={handleHomeRedirect}>
            Logout
            <ImExit />
          </Button>
        </div>
      </div>
      <div className={styles.list}>
        {filteredTasks.length === 0 ? (
          <div className={styles.noTasks}>
            Nenhuma tarefa registrada!
          </div>
        ) : (
          <>
            {filteredTasks.map(task => (
              <TaskCards
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                date={task.date}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </>
        )}
        <Button onClick={handleNewTaskRedirect}>
          <IoMdAddCircle />
          Nova tarefa
        </Button>
      </div>
    </div>
  );
}
