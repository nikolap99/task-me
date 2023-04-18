import { useEffect, useState } from 'react';
import styles from './Members.module.scss';
import { MemberItem, MemberItemProps } from '../../components/MemberItem';

const Members = () => {
  // fetch tasks
  const [isLoadingMembers, setIsLoadingMembers] = useState(false);
  const [members, setMembers] = useState<MemberItemProps[]>([]);

  const fetchMembers = async () => {
    setIsLoadingMembers(true);
    const newMembers = [
      {
        id: "1",
        firstName: "Nikola",
        lastName: "Pavlov",
        email: "nikolapavlov33@gmail.com",
      },
      {
        id: "2",
        firstName: "Nikola",
        lastName: "Pavlov",
        email: "nikolapavlov33@gmail.com",
      },
      {
        id: "3",
        firstName: "Nikola",
        lastName: "Pavlov",
        email: "nikolapavlov33@gmail.com",
      },
      {
        id: "4",
        firstName: "Nikola",
        lastName: "Pavlov",
        email: "nikolapavlov33@gmail.com",
      },
    ];
    setTimeout(() => {
      setMembers(newMembers);
      setIsLoadingMembers(false);
    }, 1000);
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
        {!isLoadingMembers && members.length > 0 && members.map(member => <MemberItem key={member.id} {...member} />)}
      </div>
    </div>
  );
}

export { Members };
