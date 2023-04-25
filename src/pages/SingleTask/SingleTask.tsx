import { useEffect, useState } from 'react';
import styles from './SingleTask.module.scss';
import { TextField } from '../../components/TextField';
import { TaskPriority, TaskStatus } from '../../components/TaskItem';
import axios from 'axios';
import { useParams } from 'react-router-dom';

type FormType = "title" | "description" | "priority" | "estimate" | "asignee" | "status";

const SingleTask = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    estimate: "",
    asignee: "",
    sprint: "",
    status: "",
  });
  const [members, setMembers] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { taskId } = useParams();

  const updateForm = (formId: FormType, value: string) => {
    const newForm = {...form};
    newForm[formId] = value;
    setForm(newForm);
    if (newForm["title"]) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleFetchTask = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:8000/server.php/task?id=${taskId}`);
    const { name: title, description, priority, estimate, asignee, sprint, status } = data;
    setForm({
      title,
      description,
      priority,
      estimate,
      asignee,
      sprint,
      status,
    })
    setIsLoading(false);
  }

  const handleUpdateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("id", `${taskId}`);
    formData.append("name", form.title);
    formData.append("description", form.description);
    formData.append("priority", form.priority);
    formData.append("estimate", form.estimate);
    formData.append("asignee", form.asignee);
    formData.append("sprint", form.sprint);
    formData.append("status", form.status);
    try {
      setIsLoading(true);
      const { data } = await axios.put(`http://localhost:8000/server.php/task?id=${taskId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setSuccessMessage("Task updated.");
      setIsFormValid(false);
    } catch (e: any) {
      console.log({ e });
    }
    setIsLoading(false);
  }

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/server.php/users");
      const users = data.map((user: any) => ({
        id: user.id || "",
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        priviledge: user.priviledge || "",
      }));
      setMembers(users);
    } catch (e: any) {
      console.log({ e });
    }
  }

  useEffect(() => {
    handleFetchTask();
    fetchMembers();
  }, []);

  return (
    <form className={styles.SingleTask} onSubmit={(e) => handleUpdateTask(e)}>
      <h2>Update Task #{taskId}</h2>
      <div className={styles.SingleTask_Form}>
        <TextField placeholder='Title...' onChange={(value) => updateForm("title", value)} value={form["title"]} />
        <TextField placeholder='Description...' onChange={(value) => updateForm("description", value)} value={form["description"] || ""} />
        <select
          className={form["priority"] ? styles.SingleTask_Select : styles.SingleTask_SelectPlaceholder}
          onChange={(e) => updateForm("priority", e.target.value)}
          value={form["priority"]}
        >
          <option value="">Priority...</option>
          <option value={TaskPriority.HIGH}>{TaskPriority.HIGH}</option>
          <option value={TaskPriority.MEDIUM}>{TaskPriority.MEDIUM}</option>
          <option value={TaskPriority.LOW}>{TaskPriority.LOW}</option>
        </select>
        <TextField placeholder='Estimate...' onChange={(value) => updateForm("estimate", value)} value={form["estimate"] || ""} type="number" />
        <select
          className={form["asignee"] ? styles.SingleTask_Select : styles.SingleTask_SelectPlaceholder}
          onChange={(e) => updateForm("asignee", e.target.value)}
          disabled={isLoading || members.length === 0}
          value={form["asignee"]}
        >
          <option value="">{members.length > 0 ? "Asignee..." : "Loading..."}</option>
          {members.length > 0 && members.map((member: any) => <option value={member.email}>{member.email}</option>)}
        </select>
        <select
          className={form["status"] ? styles.SingleTask_Select : styles.SingleTask_SelectPlaceholder}
          onChange={(e) => updateForm("status", e.target.value)}
          value={form["status"]}
        >
          <option value="">Status...</option>
          <option value={TaskStatus.TO_DO}>{TaskStatus.TO_DO}</option>
          <option value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</option>
          <option value={TaskStatus.IN_REVIEW}>{TaskStatus.IN_REVIEW}</option>
          <option value={TaskStatus.DONE}>{TaskStatus.DONE}</option>
        </select>
      </div>
      <button 
        className={(!isFormValid || isLoading) ? styles.SingleTask_Button_Disabled : styles.SingleTask_Button}
        type='submit'
        disabled={isLoading}
      >
        {!isLoading ? "Update Task" : "Updating..."}
      </button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
}

export { SingleTask };
