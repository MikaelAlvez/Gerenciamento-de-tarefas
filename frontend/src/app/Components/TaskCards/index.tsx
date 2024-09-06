import React from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import styles from './TaskCards.module.css';

interface TaskCardsProps {
  title: string;
  description: string;
  status: 'Concluído' | 'Pendente' | 'Em progresso';
  date: string;
}

export default function TaskCards({ title, description, status, date }: TaskCardsProps) {
  console.log({ title, description, status, date });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Concluído':
        return styles.statusConcluido;
      case 'Pendente':
        return styles.statusPendente;
      case 'Em progresso':
        return styles.statusProgresso;
      default:
        return '';
    }
  };

  return (
    <div className={styles.listaContainer}>
      <div className={styles.info}>
        <span className={styles.field}>{title}</span>
        <span className={styles.field}>{description}</span>
        <span className={`${styles.field} ${getStatusClass(status)}`}>{status}</span>
        <span className={styles.field}>{date}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.actionButtonEdit}><MdEdit /></button>
        <button className={styles.actionButtonDelete}><MdDelete /></button>
      </div>
    </div>
  );
}
