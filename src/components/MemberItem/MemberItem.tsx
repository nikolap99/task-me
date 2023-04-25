import React, { useState } from 'react';
import styles from './MemberItem.module.scss';
import { MemberItemProps } from './MemberItem.types';
import { DeleteModal } from '../DeleteModal';
import axios from 'axios';

const MemberItem: React.FC<MemberItemProps> = ({
  id,
  email,
  firstName,
  lastName,
  priviledge,
  onDelete,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteMember = async () => {
    try {
      const formData = new FormData();
      formData.append("id", id || "");
      const { data } = await axios.delete(`http://localhost:8000/server.php/users?id=${id}`);
      console.log({ data });
      onDelete && await onDelete();
    } catch (e: any) {
      console.log({ e });
    }
    setIsModalVisible(false);
  }

  return (
    <div className={styles.MemberItem_Container}>
      {isModalVisible && (
        <DeleteModal
          onClose={() => setIsModalVisible(false)}
          onDelete={() => deleteMember()}
        />
      )}
      <div className={styles.MemberItem}>
        <h3>{firstName} {lastName}</h3>
        <p>|</p>
        <p>{email}</p>
      </div>
      <div className={styles.MemberItem_EndContainer}>
        {priviledge && <p>{priviledge}</p>}
        <button
          className={styles.MemberItem_Delete}
          onClick={() => setIsModalVisible(true)}
        >X</button>
      </div>
    </div>
  );
}

export { MemberItem };
