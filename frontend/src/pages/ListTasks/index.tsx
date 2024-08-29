import styles from './ListTasks.module.css'
import TaskCards from '@/app/Components/TaskCards';
import Source from '@/app/Components/Source';
import Button from '@/app/Components/Button';
import { IoMdAddCircle } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ListTasks() {
  const router = useRouter();

  const handleNewTaskRedirect = () => {
    router.push('/NewTask');
  };

  const handleHomeRedirect = () => {
    router.push('/');
  };

  const tasks = [
    {titleTask: 'Prova', description: 'Prova Programação II', status: 'Em progresso', date: '01 de setembro, 2024'},
    {titleTask: 'Atividade', description: 'Atividade Cálculo III', status: 'Pendente', date: '28 de agosto, 2024'},
    {titleTask: 'Sprint', description: 'Mostrar desenvolvimento da HomePage', status: 'Concluído', date: '25 de agosto, 2024'},
    {titleTask: 'Prova', description: 'Prova Programação II', status: 'Em progresso', date: '01 de setembro, 2024'},
    {titleTask: 'Atividade', description: 'Atividade Cálculo III', status: 'Pendente', date: '28 de agosto, 2024'},
    {titleTask: 'Sprint', description: 'Mostrar desenvolvimento da HomePage', status: 'Concluído', date: '25 de agosto, 2024'},
    {titleTask: 'Prova', description: 'Prova Programação II', status: 'Em progresso', date: '01 de setembro, 2024'},
    {titleTask: 'Atividade', description: 'Atividade Cálculo III', status: 'Pendente', date: '28 de agosto, 2024'},
    {titleTask: 'Sprint', description: 'Mostrar desenvolvimento da HomePage', status: 'Concluído', date: '25 de agosto, 2024'},
    {titleTask: 'Prova', description: 'Prova Programação II', status: 'Em progresso', date: '01 de setembro, 2024'},
    {titleTask: 'Atividade', description: 'Atividade Cálculo III', status: 'Pendente', date: '28 de agosto, 2024'},
    {titleTask: 'Sprint', description: 'Mostrar desenvolvimento da HomePage', status: 'Concluído', date: '25 de agosto, 2024'},
  ]

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.logout}>
          <Button onClick={handleHomeRedirect}>
            Logout
            <ImExit/>
          </Button>
        </div>
      </div>
        <div className={styles.source}>
        <Source/>
      </div>
      {tasks.map((task, index) => (
        <TaskCards
          key={index}
          titleTask={task.titleTask}
          description={task.description}
          status={task.status as "Concluído" | "Pendente" | "Em progresso"}
          date={task.date}
        />
      ))}
        <Button onClick={handleNewTaskRedirect}> 
          <IoMdAddCircle />
          Nova tarefa
        </Button>  
    </div>
  );
}
