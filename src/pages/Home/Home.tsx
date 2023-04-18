import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { Sprint, SprintItem } from '../../components/SprintItem';
import { Task, TaskItem, TaskPriority } from '../../components/TaskItem';

const Home = () => {
  // fetch tasks
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isLoadingSprints, setIsLoadingSprints] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);

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
  
  const fetchSprints = async () => {
    setIsLoadingSprints(true);
    const newSprints = [
      {
        title: "APR Sprint 22-27",
        startDate: 'Apr 22 2023',
        endDate: 'Apr 27 2023',
      },
      {
        title: "APR Sprint 15-22",
        startDate: 'Apr 15 2023',
        endDate: 'Apr 22 2023',
      },
      {
        title: "APR Sprint 08-15",
        startDate: 'Apr 08 2023',
        endDate: 'Apr 15 2023',
      },
    ];
    setTimeout(() => {
      setSprints(newSprints);
      setIsLoadingSprints(false);
    }, 1000);
  }

  useEffect(() => {
    fetchTasks();
    fetchSprints();
  }, []);

  return (
    <div className={styles.Home}>
      <h2>All Tasks</h2>
      <div>
        {isLoadingTasks && "Loading tasks..."}
        {!isLoadingTasks && tasks.length === 0 && "No tasks."}
        {!isLoadingTasks && tasks.length > 0 && tasks.map(task => <TaskItem key={task.title} {...task} />)}
      </div>
      <h2>All Sprints</h2>
      <div>
        {isLoadingSprints && "Loading sprints..."}
        {!isLoadingSprints && sprints.length === 0 && "No sprints."}
        {!isLoadingSprints && sprints.length > 0 && sprints.map(sprint => <SprintItem key={sprint.title} {...sprint} />)}
      </div>
    </div>
  );
}

export default Home;
