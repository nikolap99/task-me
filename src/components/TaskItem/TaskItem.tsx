import React, { useState } from 'react';
import styles from './TaskItem.module.scss';
import { TaskPriority, TaskProps } from './TaskItem.types';
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from '../DeleteModal';
import axios from 'axios';

const TaskItem: React.FC<TaskProps> = ({
  id,
  title,
  description,
  priority,
  estimate,
  asignee,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteTask = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id || "");
      const { data } = await axios.delete(`http://localhost:8000/server.php/task?id=${id}`);
      console.log({ data });
      onDelete && await onDelete();
    } catch (e: any) {
      console.log({ e });
    }
    setIsModalVisible(false);
  }

  const priorityStyle = priority === TaskPriority.HIGH ? styles.High
    : priority === TaskPriority.MEDIUM
    ? styles.Medium : styles.Low;

  return (
    <div className={styles.TaskItem_Container}>
      {isModalVisible && (
        <DeleteModal
          onClose={() => setIsModalVisible(false)}
          onDelete={() => deleteTask()}
        />
      )}
      <div className={styles.TaskItem} onClick={() => navigate(`/tasks/${id}`)}>
        <h3>{title}</h3>
        <div className={styles.TaskItem_Properties}>
          {priority && <p>Priority: <span className={priorityStyle}>{priority}</span></p>}
          {!priority && <i>No priority.</i>}

          {estimate && <p>Estimate: {estimate}h</p>}
          {!estimate && <i>No estimate.</i>}

        </div>
      </div>
      <button
        className={styles.TaskItem_Delete}
        onClick={() => setIsModalVisible(true)}
      >X</button>
    </div>
  );
}

export { TaskItem };
