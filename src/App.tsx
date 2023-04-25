import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Header } from "./components/Header";
import { Home, NewSprint, NewTask, SingleTask, Login, Members, SingleSprint } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="new-sprint" element={<NewSprint />} />
            <Route path="tasks/:taskId" element={<SingleTask />} />
            <Route path="sprints/:sprintId" element={<SingleSprint />} />
            <Route path="new-task" element={<NewTask />} />
            <Route path="members" element={<Members />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
