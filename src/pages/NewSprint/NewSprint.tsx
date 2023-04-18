import { useEffect, useState } from 'react';
import styles from './NewSprint.module.scss';
import { Task, TaskItem, TaskPriority } from '../../components/TaskItem';

const NewSprint = () => {
  // fetch tasks
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [checkedTaskIds, setCheckedTaskIds] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const updateForm = (taskId: string) => {
    let newCheckedTaskIds = [];
    if (checkedTaskIds.includes(taskId)) {
      newCheckedTaskIds = checkedTaskIds.filter((existingTaskId: string) => existingTaskId !== taskId);
    } else {
      newCheckedTaskIds = [...checkedTaskIds, taskId];
    }
    setCheckedTaskIds(newCheckedTaskIds);

    if(newCheckedTaskIds.length > 0) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const fetchTasks = async () => {
    setIsLoadingTasks(true);
    const newTasks = [
      {
        title: "Task 1",
        description: "Do something!",
        priority: TaskPriority.HIGH,
        estimate: 1,
        asignee: "Nikola",
      },
      {
        title: "Task 2",
        description: "Do something!",
        priority: TaskPriority.HIGH,
        estimate: 1,
        asignee: "Nikola",
      },
      {
        title: "Task 3",
        description: "Do something!",
      },
    ];
    setTimeout(() => {
      setTasks(newTasks);
      setIsLoadingTasks(false);
    }, 1000);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <form className={styles.NewSprint}>
      <h2>Create New Sprint</h2>
      <div>
        {isLoadingTasks && "Loading tasks..."}
        {!isLoadingTasks && tasks.length === 0 && "No tasks."}
        {!isLoadingTasks && tasks.length > 0 && tasks.map(task => (
          <div  className={styles.NewSprint_Item}>
            <input type='checkbox' onClick={() => updateForm(task.title)} checked={checkedTaskIds.includes(task.title)}/>
            <TaskItem key={task.title} {...task} />
          </div>
        ))}
      </div>
      {!isLoadingTasks && tasks.length > 0 && (
        <>
          <input
            type='text'
            placeholder='Sprint name...'
            className={styles.NewSprint_NameInput}
          />
          <button 
            className={isFormValid ? styles.NewSprint_Button : styles.NewSprint_Button_Disabled}
            type='submit'
          >
            Create Sprint
          </button>
        </>
      )}
    </form>
  );
}

export default NewSprint;
