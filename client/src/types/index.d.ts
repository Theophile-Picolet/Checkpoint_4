interface LoginData {
  email: string;
  password: string;
}
interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  password: string;
  confirmPassword: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  role: string;
}

interface Visite {
  id: number;
  type: string;
  description: string;
  image_url: string;
  prix: number;
}

interface Degustation {
  id: number;
  description: string;
  image_url: string;
  prix: number;
}

interface Reservation {
  id: number;
  date: Date;
  type: string;
  user_id: number;
  visite_id?: number | null; // Peut être NULL si c'est une réservation de dégustation
  degustation_id?: number | null; // Peut être NULL si c'est une réservation de visite
}

interface Vin {
  id: number;
  type: string;
  appellation: string;
  nom: string;
  millesime: number;
  alcoometrie: string;
  description?: string;
  prix: number;
  accordMet?: string;
  temperatureDegustation?: number;
  image_src: string;
  elevage?: string;
}

interface VinId {
  type: string;
  appellation: string;
  nom: string;
  millesime: number;
  alcoometrie: string;
  description?: string;
  prix: number;
  accordMet?: string;
  temperatureDegustation?: number;
  image_src: string;
  elevage?: string;
  cepage_id: number;
  proportion: number; // Entre 0 et 100
  cepage_nom: string;
}

interface Cepage {
  id: number;
  nom: string;
  image_url?: string;
  description?: string;
}

interface Proportion {
  vin_id: number;
  cepage_id: number;
  proportion: number; // Entre 0 et 100
}

interface Commande {
  id: number;
  date: Date;
  statut: string;
  user_id: number;
}

interface DetailCommande {
  commande_id: number;
  vin_id: number;
  quantite: number;
}
