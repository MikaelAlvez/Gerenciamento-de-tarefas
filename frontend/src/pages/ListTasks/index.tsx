import styles from './ListTasks.module.css'
import TaskCards from '@/app/Components/TaskCards';
import Source from '@/app/Components/Source';
import Button from '@/app/Components/Button';
import { IoMdAddCircle } from "react-icons/io";
import { ImExit } from "react-icons/im";

export default function ListTasks() {
  const tasks = [
    {titleTask: 'Prova', description: 'Prova Programação II', status: 'Em progresso', date: '01 de setembro, 2024'},
    {titleTask: 'Prova', description: 'Prova Programação II', status: 'Em progresso', date: '01 de setembro, 2024'},
    {titleTask: 'Prova', description: 'Prova Programação II', status: 'Em progresso', date: '01 de setembro, 2024'},
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
      <Button> 
        <IoMdAddCircle />
        Nova tarefa
      </Button>
    </div>
  );
}
