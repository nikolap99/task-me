import React, { useState } from 'react';
import styles from './MemberItem.module.scss';
import { MemberItemProps } from './MemberItem.types';
import { DeleteTaskModal } from '../DeleteTaskModal';

const MemberItem: React.FC<MemberItemProps> = ({
  id,
  email,
  firstName,
  lastName,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteMember = async () => {
    console.log("Remove member:");
    console.log(id);
    setIsModalVisible(false)
  };

  return (
    <div className={styles.MemberItem_Container}>
      {isModalVisible && (
        <DeleteTaskModal
          onClose={() => setIsModalVisible(false)}
          onDelete={() => deleteMember()}
        />
      )}
      <div className={styles.MemberItem}>
        <h3>{firstName} {lastName}</h3>
        <p>|</p>
        <p>{email}</p>
      </div>
      <button
        className={styles.MemberItem_Delete}
        onClick={() => setIsModalVisible(true)}
      >X</button>
    </div>
  );
}

export { MemberItem };
