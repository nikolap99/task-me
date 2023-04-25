import { useState } from 'react';
import styles from './NewSprint.module.scss';
import { TextField } from '../../components/TextField';
import axios from 'axios';

const NewSprint = () => {
  // fetch tasks
  const [isLoading, setIsLoading] = useState(false);

  const [sprintName, setSprintName] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", sprintName);
    const { data } = await axios.post("http://localhost:8000/server.php/sprint", formData, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    setIsLoading(false);
    console.log({ data });
  }

  const updateSprintName = (name: string) => {
    setSprintName(name);
    if (name) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  return (
    <form className={styles.NewSprint} onSubmit={(e) => submitForm(e)}>
      <h2>Create New Sprint</h2>
      <TextField placeholder='Sprint name...' onChange={updateSprintName} value={sprintName} />
      <div>
      </div>
      <button 
        className={isFormValid ? styles.NewSprint_Button : styles.NewSprint_Button_Disabled}
        disabled={isLoading}
        type='submit'
      >
        {isLoading ? "Creating..." : "Create Sprint"}
      </button>
    </form>
  );
}

export { NewSprint };
