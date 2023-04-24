import { useState } from 'react';
import styles from './NewTask.module.scss';
import { TextField } from '../../components/TextField';
import { TaskPriority } from '../../components/TaskItem';
import axios from 'axios';

type FormType = "title" | "description" | "priority" | "estimate" | "asignee";

const NewTask = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    estimate: "",
    asignee: "",
  });
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
      });
      setIsFormValid(false);
    } catch (e: any) {
      console.log({ e });
    }
    setIsLoading(false);
  }

  return (
    <form className={styles.NewTask} onSubmit={(e) => handleCreateTask(e)}>
      <h2>Create New Sprint</h2>
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
