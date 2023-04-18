import styles from './DeleteTaskModal.module.scss';
import { DeleteTaskModalProps } from './DeleteTaskModal.types';

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  onClose, onDelete, type = "task"
}) => {

  return (
    <div className={styles.DeleteTaskModal_Container}>
      <div className={styles.DeleteTaskModal}>
        <h3>Are you sure you want to delete this {type === "task" ? "task" : "sprint"}?</h3>
        <p>Deleting it means it can't be brought back.</p>
        <div className={styles.DeleteTaskModal_Buttons}>
          <button
            className={styles.DeleteTaskModal_Buttons_Cancel}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={styles.DeleteTaskModal_Buttons_Delete}
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export { DeleteTaskModal };
