import { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { Sprint, SprintItem } from '../../components/SprintItem';
import { Task, TaskItem } from '../../components/TaskItem';
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
    const currentUser = localStorage.getItem("current_user");
    if (!authToken || !currentUser) {
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
    try {
      const { data } = await axios.get("http://localhost:8000/server.php/sprint");
      const sprints = data.map((sprint: any) => ({
        id: sprint.id || "",
        title: sprint.name || "",
      }));
      setSprints(sprints);
    } catch (e: any) {
      console.log({ e });
    }
    setIsLoadingSprints(false);
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
        {!isLoadingTasks && tasks.length > 0 && tasks.map(task => <TaskItem key={task.id} {...task} onDelete={fetchTasks} />)}
      </div>
      <h2>All Sprints</h2>
      <div>
        {isLoadingSprints && "Loading sprints..."}
        {!isLoadingSprints && sprints.length === 0 && "No sprints."}
        {!isLoadingSprints && sprints.length > 0 && sprints.map(sprint => <SprintItem key={sprint.id} {...sprint} onDelete={fetchSprints} />)}
      </div>
    </div>
  );
}

export { Home };
