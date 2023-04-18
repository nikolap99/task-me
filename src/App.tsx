import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Header } from "./components/Header";
import Home from './pages/Home/Home';
import NewSprint from './pages/NewSprint/NewSprint';

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="new-sprint" element={<NewSprint />} />
            {/* <Route path="new-sprint" element={<NewSprint />} />
            {/* <Route path="login" element={<Login />} />
            <Route path="new-task" element={<NewTask />} /> */}

              {/* Koristimo znak "*" za sve putanje koje se ne poklapaju sa gore navedenim. */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
