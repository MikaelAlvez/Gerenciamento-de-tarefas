import styles from './ListTasks.module.css'
import TaskCards from '@/app/Components/TaskCards';

export default function ListTasks() {
  const tasks = [
    {titleTask: 'Prova', description: 'Prova Programação II', status: 'Em progresso', date: '01 de setembro, 2024'},
  ];

  return (
    <div className={styles.container}>
      {tasks.map((task, index) => (
        <TaskCards
          key={index}
          titleTask={task.titleTask}
          description={task.description}
          status={task.status as "Concluído" | "Pendente" | "Em progresso"}
          date={task.date}
        />
      ))}
    </div>
  );
}
