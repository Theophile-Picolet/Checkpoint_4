import axios from "axios";
import type { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const API = import.meta.env.VITE_API_URL;

const getVisite = () => {
  return axios
    .get(`${API}/api/visite`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getVisiteId = (id: number) => {
  return axios
    .get(`${API}/api/visite/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getDegustation = () => {
  return axios
    .get(`${API}/api/degustation`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getDegustationId = (id: number) => {
  return axios
    .get(`${API}/api/degustation/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getReservation = () => {
  return axios
    .get(`${API}/api/reservation`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getReservationId = (id: number) => {
  return axios
    .get(`${API}/api/reservation/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getVin = () => {
  return axios
    .get(`${API}/api/vin`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getVinId = (id: number) => {
  return axios
    .get(`${API}/api/vin/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getProportion = () => {
  return axios
    .get(`${API}/api/proportion`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getProportionId = (id: number) => {
  return axios
    .get(`${API}/api/proportion/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCepage = () => {
  return axios
    .get(`${API}/api/cepage`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCepageId = (id: number) => {
  return axios
    .get(`${API}/api/cepage/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCommande = () => {
  return axios
    .get(`${API}/api/commande`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCommandeId = (id: number) => {
  return axios
    .get(`${API}/api/commande/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getPanier = () => {
  return axios
    .get(`${API}/api/panier`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getPanierId = (id: number) => {
  return axios
    .get(`${API}/api/panier/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getUser = () => {
  return axios
    .get(`${API}/api/user`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getUserId = (id: number) => {
  return axios
    .get(`${API}/api/user/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const createUser = (userData: UserData): Promise<boolean> => {
  const notifySucces = () =>
    toast.success("Votre profil a bien été créé 🍷", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const notifyError = (
    errorMessage = "Une erreur est survenue lors de l'inscription",
  ) =>
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  return axios.post(`${API}/api/user`, userData).then((response) => {
    if (response.status === 201) {
      notifySucces();
      return true;
    }
    notifyError(response.data.error);
    return false;
  });
};

const getAuthorization = () => {
  return axios
    .get(`${API}/api/checkAdmin`, {
      withCredentials: true,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const getAuthorizationForUsersOrAdmin = () => {
  return axios
    .get(`${API}/api/checkAdminOrUser`, {
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

const loginUser = (
  loginData: LoginData,
  navigate: ReturnType<typeof useNavigate>,
  setRole: (role: string) => void,
) => {
  const notifySuccess = () =>
    toast.success("Bienvenue Au Domaine Dalmaz 🍷", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const notifyError = (
    errorMessage = "Erreur lors de la connexion, mot de passe ou email incorrect",
  ) =>
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  return axios
    .post(`${API}/api/login`, loginData, { withCredentials: true })
    .then(({ data }) => {
      setRole(data.role);
      notifySuccess();
      setTimeout(() => {
        navigate(data.role === "administrateur" ? "/dashboard" : "/");
      }, 3000);
    })
    .catch((error) => {
      notifyError();
      console.error(error);
    });
};

export {
  getVisite,
  getVisiteId,
  getDegustation,
  getDegustationId,
  getReservation,
  getReservationId,
  getVin,
  getVinId,
  getProportion,
  getProportionId,
  getCepage,
  getCepageId,
  getCommande,
  getCommandeId,
  getPanier,
  getPanierId,
  getUser,
  getUserId,
  createUser,
  getAuthorization,
  getAuthorizationForUsersOrAdmin,
  loginUser,
};
