import { useEffect, useState } from 'react';
import styles from './NewSprint.module.scss';
import { Task, TaskItem, TaskPriority } from '../../components/TaskItem';
import { TextField } from '../../components/TextField';

const NewSprint = () => {
  // fetch tasks
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [sprintName, setSprintName] = useState("");

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

    if(newCheckedTaskIds.length > 0 && sprintName) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const fetchTasks = async () => {
    setIsLoadingTasks(true);
    const newTasks = [
      {
        id: "1",
        title: "Task 1",
        description: "Do something!",
        priority: TaskPriority.HIGH,
        estimate: 1,
        asignee: "Nikola",
      },
      {
        id: "2",
        title: "Task 2",
        description: "Do something!",
        priority: TaskPriority.HIGH,
        estimate: 1,
        asignee: "Nikola",
      },
      {
        id: "3",
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

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const updateSprintName = (name: string) => {
    setSprintName(name);
    if (checkedTaskIds.length > 0 && name) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  return (
    <form className={styles.NewSprint} onSubmit={(e) => submitForm(e)}>
      <h2>Create New Sprint</h2>
      {!isLoadingTasks && tasks.length > 0 && (
        <TextField placeholder='Sprint name...' onChange={updateSprintName} value={sprintName} />
      )}
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
        <button 
          className={isFormValid ? styles.NewSprint_Button : styles.NewSprint_Button_Disabled}
          type='submit'
        >
          Create Sprint
        </button>
      )}
    </form>
  );
}

export { NewSprint };
