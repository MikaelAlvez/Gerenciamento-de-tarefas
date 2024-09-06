import styles from './Source.module.css';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

interface SourceProps {
  onSearch: (query: string) => void;
}

export default function Source({ onSearch }: SourceProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className={styles.buscarContainer}>
      <input 
        type="text" 
        className={styles.input} 
        placeholder="Pesquisar..." 
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className={styles.button} disabled>
        <FaSearch className={styles.icon} />
      </button>
    </div>
  );
}
