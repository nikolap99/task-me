import React, { useState } from 'react';
import styles from './SprintItem.module.scss';
import { Sprint } from './SprintItem.types';
import { DeleteTaskModal } from '../DeleteTaskModal';
import { useNavigate } from 'react-router-dom';

const SprintItem: React.FC<Sprint> = ({
  id,
  title,
  startDate,
  endDate,
}) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteSprint = async () => {
    console.log("Remove sprint:");
    console.log(id);
    setIsModalVisible(false);
  };

  return (
    <div className={styles.SprintItem_Container}>
      {isModalVisible && (
        <DeleteTaskModal
          onClose={() => setIsModalVisible(false)}
          onDelete={() => deleteSprint()}
        />
      )}
      <div className={styles.SprintItem} onClick={() => navigate(`/sprints/${id}`)}>
        <h3>{title}</h3>
        <div className={styles.SprintItem_Properties}>
          {startDate && <p>From: {startDate}</p>}
          {endDate && <p>From: {endDate}</p>}
        </div>
      </div>
      <button
        className={styles.SprintItem_Delete}
        onClick={() => setIsModalVisible(true)}
      >X</button>
    </div>
  );
}

export {SprintItem};
