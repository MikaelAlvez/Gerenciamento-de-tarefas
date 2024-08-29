import styles from './ListTasks.module.css'
import TaskCards from '@/app/Components/TaskCards';
import Source from '@/app/Components/Source';
import Button from '@/app/Components/Button';
import { IoMdAddCircle } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { useRouter } from 'next/navigation';

export default function ListTasks() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/NewTask');
  };

  const tasks = [
    {titleTask: 'Prova', description: 'Prova Programação II', status: 'Em progresso', date: '01 de setembro, 2024'},
    {titleTask: 'Atividade', description: 'Atividade Cálculo III', status: 'Pendente', date: '28 de agosto, 2024'},
    {titleTask: 'Sprint', description: 'Mostrar desenvolvimento da HomePage', status: 'Concluído', date: '25 de agosto, 2024'},
  ];

  return (
    <div className={styles.container}>
      <div>
        <label>Logout</label>
        <ImExit/>
      </div>
      <Source></Source>
      {tasks.map((task, index) => (
        <TaskCards
          key={index}
          titleTask={task.titleTask}
          description={task.description}
          status={task.status as "Concluído" | "Pendente" | "Em progresso"}
          date={task.date}
        />
      ))}
      <Button onClick={handleLoginRedirect}> 
        <IoMdAddCircle />
        Nova tarefa
      </Button>
    </div>
  );
}
