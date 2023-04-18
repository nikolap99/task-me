import React, { useState } from 'react';
import styles from './TaskItem.module.scss';
import { Task, TaskPriority } from './TaskItem.types';
import { useNavigate } from 'react-router-dom';
import { DeleteTaskModal } from '../DeleteTaskModal';

const TaskItem: React.FC<Task> = ({
  id,
  title,
  description,
  priority,
  estimate,
  asignee,
}) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteTask = async () => {
    console.log("Remove task:");
    console.log(id);
    setIsModalVisible(false);
  };

  const priorityStyle = priority === TaskPriority.HIGH ? styles.High
    : priority === TaskPriority.MEDIUM
    ? styles.Medium : styles.Low;

  return (
    <div className={styles.TaskItem_Container}>
      {isModalVisible && (
        <DeleteTaskModal
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
