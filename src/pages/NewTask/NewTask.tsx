import { useState } from 'react';
import styles from './NewTask.module.scss';
import { TextField } from '../../components/TextField';
import { TaskPriority } from '../../components/TaskItem';

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

  return (
    <form className={styles.NewTask}>
      <h2>Create New Sprint</h2>
      <div className={styles.NewTask_Form}>
        <TextField placeholder='Name...' onChange={(value) => updateForm("title", value)} value={form["title"]} />
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
        className={isFormValid ? styles.NewTask_Button : styles.NewTask_Button_Disabled}
        type='submit'
      >
        Create Task
      </button>
    </form>
  );
}

export { NewTask };
