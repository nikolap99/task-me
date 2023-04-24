import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { Sprint, SprintItem } from '../../components/SprintItem';
import { Task, TaskItem, TaskPriority } from '../../components/TaskItem';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  // fetch tasks
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isLoadingSprints, setIsLoadingSprints] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);

  const navigate = useNavigate();

  const checkLogin = () => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      navigate("/login");
    }
  };

  const fetchTasks = async () => {
    setIsLoadingTasks(true);
    try {
      const { data } = await axios.get("http://localhost:8000/server.php/task");
      const tasks = data.map((task: any) => ({
        id: task.id || "",
        title: task.name || "",
        description: task.description || "",
        priority: task.priority || "",
        estimate: task.estimate || "",
        asignee: task.asignee || "",
      }));
      setTasks(tasks);
    } catch (e: any) {
      console.log({ e });
    }
    setIsLoadingTasks(false);
  }
  
  const fetchSprints = async () => {
    setIsLoadingSprints(true);
    const newSprints = [
      {
        id: "1",
        title: "APR Sprint 22-27",
        startDate: 'Apr 22 2023',
        endDate: 'Apr 27 2023',
      },
      {
        id: "2",
        title: "APR Sprint 15-22",
        startDate: 'Apr 15 2023',
        endDate: 'Apr 22 2023',
      },
      {
        id: "3",
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
    checkLogin();
    fetchTasks();
    fetchSprints();
  }, []);

  return (
    <div className={styles.Home}>
      <h2>All Tasks</h2>
      <div>
        {isLoadingTasks && "Loading tasks..."}
        {!isLoadingTasks && tasks.length === 0 && "No tasks."}
        {!isLoadingTasks && tasks.length > 0 && tasks.map(task => <TaskItem key={task.id} {...task} />)}
      </div>
      <h2>All Sprints</h2>
      <div>
        {isLoadingSprints && "Loading sprints..."}
        {!isLoadingSprints && sprints.length === 0 && "No sprints."}
        {!isLoadingSprints && sprints.length > 0 && sprints.map(sprint => <SprintItem key={sprint.id} {...sprint} />)}
      </div>
    </div>
  );
}

export { Home };
