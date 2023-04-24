import styles from './Header.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("auth_token", "");
    navigate("/login");
  };

  const links = [
    {
      title: "Project",
      to: "",
    },
    {
      title: "New Sprint",
      to: "new-sprint",
    },
    {
      title: "New Task",
      to: "new-task",
    },
    {
      title: "Members",
      to: "members",
    },
    {
      title: "Logout",
      to: "login",
      onClick: logout,
    },
  ]
  if (location.pathname === "/login") return null;
  return (
    <nav className={styles.Header}>
      <span className={styles.Logo}>TaskMe</span>
      <ul className={styles.Navbar}>
        {links.map(link => (
          <li key={link.to}>
            <Link
              to={link.to}
              onClick={() => {
                link.onClick && link.onClick();
              }}
              className={`/${link.to}` === location.pathname ? styles.Navbar_ActiveItem : styles.Navbar_Item}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export {Header};
