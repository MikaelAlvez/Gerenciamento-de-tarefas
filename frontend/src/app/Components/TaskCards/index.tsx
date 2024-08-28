import React from 'react';
import { MdEdit, MdDelete } from "react-icons/md";

import styles from './TaskCards.module.css';

export default function TaskCards({ titleTask, description, status, date }) {

  const getStatusClass = (status) => {
    switch (status) {
      case 'Concluído':
        return styles.statusConfirmado;
      case 'Pendente':
        return styles.statusCancelado;
      case 'Em progresso':
        return styles.statusPendente;
      default:
        return '';
    }
  };

  return (
    <div className={styles.listaContainer}>
      <div className={styles.info}>
        <span className={styles.field}>{titleTask}</span>
        <span className={styles.field}>{description}</span>
        <span className={`${styles.field} ${getStatusClass(status)}`}>{status}</span>
        <span className={styles.field}>{date}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.actionButtonConfirmar}><MdEdit /></button>
        <button className={styles.actionButtonCancelar}><MdDelete /></button>
      </div>
    </div>
  );
}