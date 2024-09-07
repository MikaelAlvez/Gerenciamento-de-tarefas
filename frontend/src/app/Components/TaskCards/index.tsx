import React, { useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import styles from './TaskCards.module.css';
import Button from '../Button';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Concluído' | 'Pendente' | 'Em progresso';
  date: string;
}

interface TaskCardsProps {
  id: number;
  title: string;
  description: string;
  status: 'Concluído' | 'Pendente' | 'Em progresso';
  date: string;
  onDelete: (id: number) => void;
  onEdit: (id: number, updatedTask: Task) => void;
}

export default function TaskCards({ id, title, description, status, date, onDelete, onEdit }: TaskCardsProps) {
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
    onEdit(id, { ...editedTask, id });
    closeEditModal();
  };

  const handleDelete = () => {
    onDelete(id);
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
        <>
          <div className={styles.overlay} onClick={closeEditModal} />
          <div className={styles.modal}>
            <h2>Editar tarefa</h2>
            <div className={styles.modalContent}>
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
              />

              <label htmlFor="description">Descrição:</label>
              <input
                type="text"
                name="description"
                value={editedTask.description}
                onChange={handleChange}
              />

              <label htmlFor="status">Status:</label>
              <select
                name="status"
                value={editedTask.status}
                onChange={handleChange}
              >
                <option value="Concluído">Concluído</option>
                <option value="Pendente">Pendente</option>
                <option value="Em progresso">Em progresso</option>
              </select>

              <label htmlFor="date">Data:</label>
              <input
                type="date"
                name="date"
                value={editedTask.date}
                onChange={handleChange}
              />
            </div>
            <div className={styles.modalActions}>
              <Button onClick={handleSave}>Salvar</Button>
              <Button onClick={closeEditModal}>Cancelar</Button>
            </div>
          </div>
        </>
      )}

      {isDeleteModalOpen && (
        <>
          <div className={styles.overlay} onClick={closeDeleteModal} />
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Excluir tarefa</h2>
              <p>Tem certeza que deseja excluir esta tarefa?</p>
              <div className={styles.modalActions}>
                <Button onClick={handleDelete}>Excluir</Button>
                <Button onClick={closeDeleteModal}>Cancelar</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
