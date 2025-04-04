import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NavBar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../services/AuthContext";

export default function NavBar() {
  const API = import.meta.env.VITE_API_URL;
  const { role, setRole } = useAuth();
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const disconnect = () => {
    axios
      .get(`${API}/api/logout`, { withCredentials: true })
      .then(() => {
        setRole("anonymous");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const links = [
    {
      name: "Accueil",
      path: "/",
      role: ["anonymous", "administrateur", "utilisateur"],
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      role: ["administrateur"],
    },
    {
      name: "La cave",
      path: "/cave",
      role: ["anonymous", "administrateur", "utilisateur"],
    },
    {
      name: "Les visites",
      path: "/visite",
      role: ["anonymous", "administrateur", "utilisateur"],
    },
    {
      name: "Les dégustations",
      path: "/degustation",
      role: ["anonymous", "administrateur", "utilisateur"],
    },
  ];

  return (
    <nav>
      <div className="title">
        <Link
          to="/"
          onClick={() => {
            closeMenu();
            scrollToTop();
          }}
        >
          <img src="/LucienD.png" alt="logo" className="logo" />
        </Link>
      </div>
      <div className="menu-container">
        <div
          className="menu-icon"
          onClick={() => {
            closeMenu();
            scrollToTop();
          }}
          onKeyDown={toggleMenu}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {links
            .filter((link) => link.role.includes(role))
            .map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => {
                    closeMenu();
                    scrollToTop();
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          <li className="disconnect-button-mobile">
            <button
              type="button"
              onClick={() => {
                disconnect();
                scrollToTop();
              }}
            >
              Se déconnecter
            </button>
          </li>
        </ul>
      </div>
      {role === "anonymous" ? (
        <Link to="/login" className="link-signup">
          Se connecter
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => {
            disconnect();
            scrollToTop();
          }}
          className="disconnect-button"
        >
          Se déconnecter
        </button>
      )}
    </nav>
  );
}
