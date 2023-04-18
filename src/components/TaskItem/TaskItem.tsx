import React from 'react';
import styles from './TaskItem.module.scss';
import { Task } from './TaskItem.types';

const TaskItem: React.FC<Task> = ({
  title,
  description,
  priority,
  estimate,
  asignee,
}) => {
  return (
    <>
      <div className={styles.TaskItem}>
        <h3>{title}</h3>
        <div className={styles.TaskItem_Properties}>
          {priority && <p>Priority: {estimate}</p>}
          {!priority && <i>No priority.</i>}

          {estimate && <p>Estimate: {estimate}h</p>}
          {!estimate && <i>No estimate.</i>}

          <button className={styles.TaskItem_Delete}>X</button>
        </div>
      </div>
    </>
  );
}

export { TaskItem };
