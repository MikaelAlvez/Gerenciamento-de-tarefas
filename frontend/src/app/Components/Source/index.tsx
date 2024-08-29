import styles from './Source.module.css';
import { FaSearch } from 'react-icons/fa';

export default function Source() {
  return (
    <div className={styles.buscarContainer}>
      <input 
        type="text" 
        className={styles.input} 
        placeholder="Pesquisar..." 
      />
      <button className={styles.button}>
        <FaSearch className={styles.icon} />
      </button>
    </div>
  );
}