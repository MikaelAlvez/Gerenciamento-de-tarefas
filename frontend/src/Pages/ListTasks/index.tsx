import styles from './ListTasks.module.css'
import TaskCards from '@/app/Components/TaskCards';

export default function ListTasks() {
  
  return (
    <div className={styles.container}>
      <TaskCards></TaskCards>
    </div>
  );
}