import React, { useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import styles from './TaskCards.module.css';

interface TaskCardsProps {
  title: string;
  description: string;
  status: 'Concluído' | 'Pendente' | 'Em progresso';
  date: string;
}

export default function TaskCards({ title, description, status, date }: TaskCardsProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title,
    description,
    status,
    date
  });

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

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    closeEditModal();
  };

  const handleDelete = () => {
    closeDeleteModal();
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
        <button className={styles.actionButtonEdit} onClick={openEditModal}><MdEdit /></button>
        <button className={styles.actionButtonDelete} onClick={openDeleteModal}><MdDelete /></button>
      </div>
      
      {isEditModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Editar Tarefa</h2>
            <label>
              Título:
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Descrição:
              <input
                type="text"
                name="description"
                value={editedTask.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Status:
              <select
                name="status"
                value={editedTask.status}
                onChange={handleChange}
              >
                <option value="Concluído">Concluído</option>
                <option value="Pendente">Pendente</option>
                <option value="Em progresso">Em progresso</option>
              </select>
            </label>
            <label>
              Data:
              <input
                type="text"
                name="date"
                value={editedTask.date}
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSave}>Salvar</button>
            <button onClick={closeEditModal}>Cancelar</button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Confirmar Exclusão</h2>
            <p>Você realmente deseja remover a tarefa "{title}"?</p>
            <button onClick={handleDelete}>Excluir</button>
            <button onClick={closeDeleteModal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
