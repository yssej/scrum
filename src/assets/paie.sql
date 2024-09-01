CREATE TABLE fonction(
   id_fonction INT,
   nom_fonction VARCHAR(100) NOT NULL,
   PRIMARY KEY(id_fonction)
);

CREATE TABLE categorie(
   id_categorie INT,
   nom_categorie VARCHAR(100) NOT NULL,
   PRIMARY KEY(id_categorie)
);

CREATE TABLE salaire(
   id_salaire INT,
   code_salaire VARCHAR(250) NOT NULL,
   designation VARCHAR(250) NOT NULL,
   taux_salaire INT NOT NULL,
   unite_salaire VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_salaire)
);

CREATE TABLE paie_conge(
   id_paie_conge INT,
   code_paie_conge VARCHAR(250) NOT NULL,
   designation VARCHAR(250) NOT NULL,
   unite VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_paie_conge)
);

CREATE TABLE paie_avantage_nature(
   id_avantage_nature INT,
   code_avantage_nature VARCHAR(250) NOT NULL,
   designation VARCHAR(250) NOT NULL,
   unite VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_avantage_nature)
);

CREATE TABLE paie_non_soumis(
   id_paie_non_soumis INT,
   code_paie_non_soumis VARCHAR(250) NOT NULL,
   unite VARCHAR(50) NOT NULL,
   designation VARCHAR(250) NOT NULL,
   PRIMARY KEY(id_paie_non_soumis)
);

CREATE TABLE paie_cotisation(
   id_paie_cotisation INT,
   code VARCHAR(250) NOT NULL,
   designation VARCHAR(250) NOT NULL,
   taux_part_salarial INT NOT NULL,
   type_part_salarial VARCHAR(100) NOT NULL,
   date_creation DATE NOT NULL,
   PRIMARY KEY(id_paie_cotisation)
);

CREATE TABLE paie_irsa(
   id_paie_irsa INT,
   code VARCHAR(250) NOT NULL,
   designation VARCHAR(250) NOT NULL,
   valeur_charge DECIMAL(18,2) NOT NULL,
   PRIMARY KEY(id_paie_irsa)
);

CREATE TABLE paie_taux_irsa(
   id_paie_taux_irsa INT,
   salaire_min INT NOT NULL,
   salaire_max INT NOT NULL,
   pourcentage INT NOT NULL,
   id_paie_irsa INT NOT NULL,
   PRIMARY KEY(id_paie_taux_irsa),
   FOREIGN KEY(id_paie_irsa) REFERENCES paie_irsa(id_paie_irsa)
);

CREATE TABLE paie_prime_indemnites(
   id_paie_prime_indemnites INT,
   code_paie_prime_indemnites VARCHAR(250) NOT NULL,
   unite VARCHAR(50) NOT NULL,
   designation VARCHAR(250) NOT NULL,
   PRIMARY KEY(id_paie_prime_indemnites)
);

CREATE TABLE employer(
   id_employer INT,
   nb_enfant INT NOT NULL,
   adresse VARCHAR(250),
   nom_prenom VARCHAR(250) NOT NULL,
   sexe VARCHAR(10) NOT NULL,
   date_naissance DATE NOT NULL,
   tel VARCHAR(10) NOT NULL,
   cin VARCHAR(12) NOT NULL,
   num_cnaps VARCHAR(50) NOT NULL,
   date_embauche DATE NOT NULL,
   date_depart DATE NOT NULL,
   id_categorie INT NOT NULL,
   id_fonction INT NOT NULL,
   PRIMARY KEY(id_employer),
   FOREIGN KEY(id_categorie) REFERENCES categorie(id_categorie),
   FOREIGN KEY(id_fonction) REFERENCES fonction(id_fonction)
);

CREATE TABLE fiche_paie(
   id_fiche_paie INT,
   date_fiche_paie DATE NOT NULL,
   salaire_base DECIMAL(18,2) NOT NULL,
   taux_horaire DECIMAL(18,2) NOT NULL,
   statistique INT NOT NULL,
   statistique_employer INT NOT NULL,
   id_employer INT NOT NULL,
   PRIMARY KEY(id_fiche_paie),
   FOREIGN KEY(id_employer) REFERENCES employer(id_employer)
);

CREATE TABLE details_paie_salaire(
   id_details_paie_salaire INT,
   date_creation DATE NOT NULL,
   nombre DECIMAL(18,2) NOT NULL,
   base DECIMAL(18,2) NOT NULL,
   montant_part_salarial DECIMAL(18,2) NOT NULL,
   type_part_salarial VARCHAR(100) NOT NULL,
   id_fiche_paie INT NOT NULL,
   id_employer INT NOT NULL,
   id_salaire INT NOT NULL,
   PRIMARY KEY(id_details_paie_salaire),
   FOREIGN KEY(id_fiche_paie) REFERENCES fiche_paie(id_fiche_paie),
   FOREIGN KEY(id_employer) REFERENCES employer(id_employer),
   FOREIGN KEY(id_salaire) REFERENCES salaire(id_salaire)
);

CREATE TABLE details_paie_conge(
   id_details_paie_conge INT,
   nombre INT NOT NULL,
   base DECIMAL(18,2) NOT NULL,
   montant_part_salarial DECIMAL(19,2) NOT NULL,
   taux_part_salarial DECIMAL(18,2) NOT NULL,
   type_part_salarial VARCHAR(100) NOT NULL,
   date_creation DATE NOT NULL,
   id_employer INT NOT NULL,
   id_fiche_paie INT NOT NULL,
   id_paie_conge INT NOT NULL,
   PRIMARY KEY(id_details_paie_conge),
   FOREIGN KEY(id_employer) REFERENCES employer(id_employer),
   FOREIGN KEY(id_fiche_paie) REFERENCES fiche_paie(id_fiche_paie),
   FOREIGN KEY(id_paie_conge) REFERENCES paie_conge(id_paie_conge)
);

CREATE TABLE paie_detail_avantage_nature(
   id INT,
   nombre INT NOT NULL,
   base DECIMAL(18,2) NOT NULL,
   montant_part_salarial DECIMAL(18,2) NOT NULL,
   taux_part_salarial INT NOT NULL,
   gain_salarial VARCHAR(100) NOT NULL,
   date_creation DATE NOT NULL,
   id_avantage_nature INT NOT NULL,
   id_fiche_paie INT NOT NULL,
   id_employer INT NOT NULL,
   PRIMARY KEY(id),
   FOREIGN KEY(id_avantage_nature) REFERENCES paie_avantage_nature(id_avantage_nature),
   FOREIGN KEY(id_fiche_paie) REFERENCES fiche_paie(id_fiche_paie),
   FOREIGN KEY(id_employer) REFERENCES employer(id_employer)
);

CREATE TABLE paie_detail_non_soumis(
   id_paie_detail_non_soumis INT,
   nombre INT NOT NULL,
   base DECIMAL(18,2) NOT NULL,
   montant_part_salarial DECIMAL(18,2) NOT NULL,
   taux_part_salarial INT NOT NULL,
   type_part_salarial VARCHAR(100) NOT NULL,
   date_creation DATE NOT NULL,
   id_fiche_paie INT NOT NULL,
   id_paie_non_soumis INT NOT NULL,
   id_employer INT NOT NULL,
   PRIMARY KEY(id_paie_detail_non_soumis),
   FOREIGN KEY(id_fiche_paie) REFERENCES fiche_paie(id_fiche_paie),
   FOREIGN KEY(id_paie_non_soumis) REFERENCES paie_non_soumis(id_paie_non_soumis),
   FOREIGN KEY(id_employer) REFERENCES employer(id_employer)
);

CREATE TABLE paie_total(
   id_paie_total INT,
   nom_total VARCHAR(250) NOT NULL,
   total_gain_salarial DECIMAL(18,2) NOT NULL,
   total_retenu_salarial DECIMAL(18,2) NOT NULL,
   total_retenu_patronal DECIMAL(18,2) NOT NULL,
   date_creation DATE NOT NULL,
   id_employer INT NOT NULL,
   id_fiche_paie INT NOT NULL,
   PRIMARY KEY(id_paie_total),
   FOREIGN KEY(id_employer) REFERENCES employer(id_employer),
   FOREIGN KEY(id_fiche_paie) REFERENCES fiche_paie(id_fiche_paie)
);

CREATE TABLE paie_detail_prime_indemnites(
   id_paie_detail_prime_indemnites INT,
   nombre INT NOT NULL,
   base DECIMAL(18,2) NOT NULL,
   montant_part_salarial DECIMAL(18,2) NOT NULL,
   taux_part_salarial INT NOT NULL,
   type_part_salarial VARCHAR(100) NOT NULL,
   date_creation DATE NOT NULL,
   id_employer INT NOT NULL,
   id_fiche_paie INT NOT NULL,
   id_paie_prime_indemnites INT NOT NULL,
   PRIMARY KEY(id_paie_detail_prime_indemnites),
   FOREIGN KEY(id_employer) REFERENCES employer(id_employer),
   FOREIGN KEY(id_fiche_paie) REFERENCES fiche_paie(id_fiche_paie),
   FOREIGN KEY(id_paie_prime_indemnites) REFERENCES paie_prime_indemnites(id_paie_prime_indemnites)
);
