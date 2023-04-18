import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Header } from "./components/Header";
import { Home, NewSprint, NewTask } from './pages';
import { Members } from './pages/Members';
import { Login } from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="new-sprint" element={<NewSprint />} />
            <Route path="new-task" element={<NewTask />} />
            <Route path="members" element={<Members />} />
            <Route path="login" element={<Login />} />
            {/*
            {/* <Route path="login" element={<Login />} />
             */}

              {/* Koristimo znak "*" za sve putanje koje se ne poklapaju sa gore navedenim. */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
