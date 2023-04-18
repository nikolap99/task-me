import React from 'react';
import styles from './SprintItem.module.scss';
import { Sprint } from './SprintItem.types';

const SprintItem: React.FC<Sprint> = ({
  title,
  startDate,
  endDate,
}) => {
  return (
    <div className={styles.SprintItem}>
      <h3>{title}</h3>
      <div className={styles.SprintItem_Properties}>
        {startDate && <p>From: {startDate}</p>}
        {endDate && <p>From: {endDate}</p>}

        <button className={styles.SprintItem_Delete}>X</button>
      </div>
    </div>
  );
}

export {SprintItem};
