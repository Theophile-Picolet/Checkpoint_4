
create table User (
  id SERIAL primary key,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  tel VARCHAR(20) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'utilisateur');
  CREATE TABLE Visite (
    id SERIAL PRIMARY KEY,
    type VARCHAR(100),
    description TEXT,
    prix DECIMAL(10,2)
);
CREATE TABLE Degustation (
    id SERIAL PRIMARY KEY,
    description TEXT,
    prix DECIMAL(10,2)
);
create table Reservation (
  id SERIAL PRIMARY KEY ,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  type VARCHAR(50),
  user_id INT REFERENCES User(id) ON DELETE CASCADE,
  visite_id INT REFERENCES Visite(id) ON DELETE SET NULL,
  degustation_id INT REFERENCES Dégustation(id) ON DELETE SET NULL
);
CREATE TABLE Vin (
    id SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    appellation VARCHAR(50) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    millesime INT NOT NULL,
    alcoometrie VARCHAR(10) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    accordMet VARCHAR(255),
    temperatureDegustation DECIMAL(4,1),
    elevage VARCHAR(50)
);
CREATE TABLE Cepage (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) UNIQUE
);
CREATE TABLE VinCepage (
    vin_id INT REFERENCES Vin(id) ON DELETE CASCADE,
    cepage_id INT REFERENCES Cepage(id) ON DELETE CASCADE,
    proportion DECIMAL(5,2) CHECK (proportion >= 0 AND proportion <= 100),
    PRIMARY KEY (vin_id, cepage_id)
);
CREATE TABLE Commande (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut VARCHAR(50),
    user_id INT REFERENCES User(id) ON DELETE CASCADE
);
CREATE TABLE DetailCommande (
    id SERIAL PRIMARY KEY,
    commande_id INT REFERENCES Commande(id) ON DELETE CASCADE,
    vin_id INT REFERENCES Vin(id) ON DELETE CASCADE,
    quantite INT CHECK (quantite > 0)
);
 INSERT INTO Vin (type, appellation, nom, millesime, alcoometrie, description, prix, accordMet, temperatureDegustation, elevage)
      VALUES 
      ('Rouge', 'Côte-Rôtie', 'La Mouline', 2018, '13.5%', 'Vin d\'exception, arômes de fruits noirs et d\'épices.', 150, 'Viande rouge, gibier, fromage affiné', 16.0, '42 mois fût de chêne'),
      ('Rouge', 'Côte-Rôtie', 'La Turque', 2019, '14%', 'Notes florales et épicées, intense et structuré.', 160, 'Canard, truffe, bœuf', 16.0, '40 mois fût de chêne'),
      ('Rouge', 'Côte-Rôtie', 'La Landonne', 2020, '14.5%', 'Robe sombre, tannins puissants, finale persistante.', 180, 'Agneau, fromages affinés', 16.0, '42 mois fût de chêne'),
      ('Rouge', 'Saint-Joseph', 'Lieu-dit Saint-Joseph', 2021, '13%', 'Arômes de fruits noirs, bouche ample et élégante.', 50, 'Charcuterie, viandes grillées', 15.0, '18 mois fût de chêne'),
      ('Blanc', 'Condrieu', 'La Doriane', 2022, '13.5%', 'Vin blanc puissant, arômes d\'abricot et de fleurs blanches.', 90, 'Poisson, crustacés, cuisine asiatique', 10.0, '12 mois fût de chêne'),
      ('Blanc', 'Saint-Joseph', 'Les Granits', 2021, '13%', 'Texture soyeuse, arômes de fruits jaunes et noisettes.', 40, 'Volaille, fromage à pâte molle', 12.0, '12 mois fût de chêne')
      ;
       INSERT INTO Cepage (nom) VALUES ('Syrah'), ('Viognier'), ('Marsanne'), ('Roussanne')
      ;
INSERT INTO VinCepage (vin_id, cepage_id, proportion)
      VALUES 
      (1, 1, 89.00), (1, 2, 11.00),
      (2, 1, 93.00), (2, 2, 7.00),
      (3, 1, 100.00),
      (4, 1, 100.00),
      (5, 2, 100.00),
      (6, 3, 65.00), (6, 4, 35.00)
      ;
      INSERT INTO Visite (type, description, prix) 
      VALUES 
      ('Visite des vignes du domaine', 'Découverte du terroir et des parcelles emblématiques.',25),
      ('Visite des caves', 'Immersion dans les caves pour comprendre l’élevage des vins.',25),
      ('Visite vignes et caves', 'Expérience complète : vignoble, caves et dégustation incluse.',65)
      ;
       INSERT INTO Degustation (description, prix) 
      VALUES 
      ('Dégustation des grandes cuvées du domaine', 60),
      ('Atelier accords mets & vins', 70),
      ('Dégustation découverte des vins du Rhône', 40)
      ;
      INSERT INTO User (first_name, last_name, email, tel, hashed_password, role)
VALUES
("Théo", "Phile", "theo@gmail.com",  "0665875421","$argon2id$v=19$m=19456,t=2,p=1$RfhFF2DWhTNEopSJ6V8zSQ$OUgaTyhqz7yXUbAwhMtQbM9ly6fwbKttf5ACKaxQ2Jc", "administrateur"),
("Chris", "Tophe", "chris@gmail.com",  "0665455421","$argon2id$v=19$m=19456,t=2,p=1$RfhFF2DWhTNEopSJ6V8zSQ$OUgaTyhqz7yXUbAwhMtQbM9ly6fwbKttf5ACKaxQ2Jc", "administrateur");
      