import { useEffect, useState } from 'react';
import styles from './Members.module.scss';
import { MemberItem, MemberItemProps } from '../../components/MemberItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Members = () => {
  // fetch tasks
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [members, setMembers] = useState<MemberItemProps[]>([]);
  const navigate = useNavigate();

  const fetchMembers = async () => {
    setIsLoadingMembers(true);
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
    setIsLoadingMembers(false);
  }

  const onUserDelete = async (memberEmail: string) => {
    const currentUser = localStorage.getItem("current_user");
    if (memberEmail === currentUser) {
      localStorage.setItem("current_user", "");
      localStorage.setItem("auth_token", "");
      navigate('/');
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className={styles.Members}>
      <h2>Members</h2>
      <div>
        {isLoadingMembers && "Loading members..."}
        {!isLoadingMembers && members.length === 0 && "No members added."}
        {!isLoadingMembers && members.length > 0 && members.map(member => <MemberItem key={member.id} {...member} onDelete={() => onUserDelete(member.email)} />)}
      </div>
    </div>
  );
}

export { Members };
