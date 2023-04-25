import styles from './DeleteModal.module.scss';
import { DeleteModalProps } from './DeleteModal.types';

const DeleteModal: React.FC<DeleteModalProps> = ({
  onClose, onDelete, type = "task"
}) => {

  return (
    <div className={styles.DeleteModal_Container}>
      <div className={styles.DeleteModal}>
        <h3>Are you sure you want to delete this {type === "task" ? "task" : "sprint"}?</h3>
        <p>Deleting it means it can't be brought back.</p>
        <div className={styles.DeleteModal_Buttons}>
          <button
            className={styles.DeleteModal_Buttons_Cancel}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={styles.DeleteModal_Buttons_Delete}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export { DeleteModal };
