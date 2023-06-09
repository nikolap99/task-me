import { useEffect, useState } from 'react';
import styles from './NewTask.module.scss';
import { TextField } from '../../components/TextField';
import { TaskPriority, TaskStatus } from '../../components/TaskItem';
import axios from 'axios';

type FormType = "title" | "description" | "priority" | "estimate" | "asignee" | "status";

const NewTask = () => {
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

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.title);
    formData.append("description", form.description);
    formData.append("priority", form.priority);
    formData.append("estimate", form.estimate);
    formData.append("asignee", form.asignee);
    formData.append("sprint", form.sprint);
    formData.append("status", form.status);
    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:8000/server.php/task", formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setSuccessMessage("Task created.");
      setForm({
        title: "",
        description: "",
        priority: "",
        estimate: "",
        asignee: "",
        sprint: "",
        status: "",
      });
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
    fetchMembers();
  }, []);

  return (
    <form className={styles.NewTask} onSubmit={(e) => handleCreateTask(e)}>
      <h2>Create New Task</h2>
      <div className={styles.NewTask_Form}>
        <TextField placeholder='Title...' onChange={(value) => updateForm("title", value)} value={form["title"]} />
        <TextField placeholder='Description...' onChange={(value) => updateForm("description", value)} value={form["description"] || ""} />
        <select
          className={form["priority"] ? styles.NewTask_Select : styles.NewTask_SelectPlaceholder}
          onChange={(e) => updateForm("priority", e.target.value)}
        >
          <option value="">Priority...</option>
          <option value={TaskPriority.HIGH}>{TaskPriority.HIGH}</option>
          <option value={TaskPriority.MEDIUM}>{TaskPriority.MEDIUM}</option>
          <option value={TaskPriority.LOW}>{TaskPriority.LOW}</option>
        </select>
        <TextField placeholder='Estimate...' onChange={(value) => updateForm("estimate", value)} value={form["estimate"] || ""} type="number" />
        <select
          className={form["asignee"] ? styles.NewTask_Select : styles.NewTask_SelectPlaceholder}
          onChange={(e) => updateForm("asignee", e.target.value)}
          disabled={isLoading || members.length === 0}
        >
          <option value="">{members.length > 0 ? "Asignee..." : "Loading..."}</option>
          {members.length > 0 && members.map((member: any) => <option value={member.email}>{member.email}</option>)}
        </select>
        <select
          className={form["status"] ? styles.NewTask_Select : styles.NewTask_SelectPlaceholder}
          onChange={(e) => updateForm("status", e.target.value)}
        >
          <option value="">Status...</option>
          <option value={TaskStatus.TO_DO}>{TaskStatus.TO_DO}</option>
          <option value={TaskStatus.IN_PROGRESS}>{TaskStatus.IN_PROGRESS}</option>
          <option value={TaskStatus.IN_REVIEW}>{TaskStatus.IN_REVIEW}</option>
          <option value={TaskStatus.DONE}>{TaskStatus.DONE}</option>
        </select>
      </div>
      <button 
        className={(!isFormValid || isLoading) ? styles.NewTask_Button_Disabled : styles.NewTask_Button}
        type='submit'
        disabled={isLoading}
      >
        {!isLoading ? "Create Task" : "Creating..."}
      </button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
}

export { NewTask };
