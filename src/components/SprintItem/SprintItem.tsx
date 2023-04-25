import React, { useState } from 'react';
import styles from './SprintItem.module.scss';
import { SprintProps } from './SprintItem.types';
import { DeleteModal } from '../DeleteModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SprintItem: React.FC<SprintProps> = ({
  id,
  title,
  startDate,
  endDate,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteSprint = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id || "");
      const { data } = await axios.delete(`http://localhost:8000/server.php/sprint?id=${id}`);
      console.log({ data });
      onDelete && await onDelete();
    } catch (e: any) {
      console.log({ e });
    }
    setIsModalVisible(false);
  };

  return (
    <div className={styles.SprintItem_Container}>
      {isModalVisible && (
        <DeleteModal
          onClose={() => setIsModalVisible(false)}
          onDelete={() => deleteSprint()}
          type="sprint"
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
