import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ListTasks.module.css';
import TaskCards from '@/app/Components/TaskCards';
import Source from '@/app/Components/Source';
import Button from '@/app/Components/Button';
import { IoMdAddCircle } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { useRouter } from 'next/navigation';

interface Task {
  titleTask: string;
  description: string;
  status: 'Concluído' | 'Pendente' | 'Em progresso';
  date: string;
}

export default function ListTasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleNewTaskRedirect = () => {
    router.push('/NewTask');
  };

  const handleHomeRedirect = () => {
    router.push('/');
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('http://localhost:3000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.logout}>
          <Button onClick={handleHomeRedirect}>
            Logout
            <ImExit />
          </Button>
        </div>
      </div>
      <div className={styles.source}>
        <Source />
      </div>
      <div className={styles.list}>
        {tasks.length === 0 ? (
          <div className={styles.noTasks}>
            Nenhuma tarefa registrada!
          </div>
        ) : (
          <>
            <div className={styles.spans}>
              <span>Título</span>
              <span>Descrição</span>
              <span>Status</span>
              <span>Data agendada</span>
              <span></span>
            </div>
            {tasks.map((task, index) => (
              <TaskCards
                key={index}
                titleTask={task.titleTask}
                description={task.description}
                status={task.status}
                date={task.date}
              />
            ))}
          </>
        )}
      </div>
      <Button onClick={handleNewTaskRedirect}>
        <IoMdAddCircle />
        Nova tarefa
      </Button>
    </div>
  );
}
