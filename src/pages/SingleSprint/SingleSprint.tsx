import { useEffect, useState } from 'react';
import styles from './SingleSprint.module.scss';
import { TextField } from '../../components/TextField';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleSprint = () => {
  // fetch tasks
  const [isLoading, setIsLoading] = useState(false);
  const [sprintName, setSprintName] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { sprintId } = useParams();

  const handleFetchSprint = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`http://localhost:8000/server.php/sprint?id=${sprintId}`);
    const { name } = data;
    setSprintName(name)
    setIsLoading(false);
  }

  const updateSprintName = (name: string) => {
    setSprintName(name);
    if (name) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }

  const handleUpdateSprint = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("id", `${sprintId}`);
    formData.append("name", sprintName);
    try {
      setIsLoading(true);
      const { data } = await axios.put(`http://localhost:8000/server.php/sprint?id=${sprintId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      setSuccessMessage("Sprint name updated.");
    } catch (e: any) {
      console.log({ e });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    handleFetchSprint();
  }, []);

  return (
    <form className={styles.SingleSprint} onSubmit={(e) => handleUpdateSprint(e)}>
      <h2>Update Sprint #{sprintId}</h2>
      <TextField placeholder='Sprint name...' onChange={updateSprintName} value={sprintName} />
      <div>
      </div>
      <button 
        className={isFormValid ? styles.SingleSprint_Button : styles.SingleSprint_Button_Disabled}
        disabled={isLoading}
        type='submit'
      >
        {isLoading ? "Updating..." : "Update Sprint"}
      </button>
      {successMessage && <p>{successMessage}</p>}
    </form>
  );
}

export { SingleSprint };
