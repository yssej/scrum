create database scrum;

\c scrum

create table user_entity(
	id serial primary key,
	username varchar(100),
	email varchar(100),
	createdtimestamp int
);

create table projet(
	idProjet serial primary key,
	nom varchar(100),
	description varchar(255),
	etat varchar(30),
	dateCreation timestamp,
	dateDebut date,
	dateFin date,
	idCreateur int,
	foreign key (idCreateur) references user_entity(id)
);

create table sprint(
	idSprint serial primary key,
	nom varchar(100),
	dateDebut date,
	dateFin date,
	objectif varchar(100),
	etat varchar(30),
	couleur varchar(30),
	termine timestamp,
	idCreateur int,
	idProjet int,
	foreign key (idProjet) references projet(idProjet),
	foreign key (idCreateur) references user_entity(id)
);

create table backlog(
	id serial primary key,
	nom varchar(50),
	description varchar(250),
	dateDebut date,
	dateFin date,
	etat varchar(30),
	position int,
	termine timestamp,
	abbreviate varchar(10),
	priorite int,
	storyPoint int,
	idProjet int,
	idSprint int,
	idCreateur int,
	foreign key (idProjet) references projet(idProjet),
	foreign key (idSprint) references sprint(idSprint),
	foreign key (idCreateur) references user_entity(id)
);

create table fonctionnalite(
	id serial primary key,
	nom varchar(50),
	description varchar(250),
	dateDebut date,
	dateFin date,
	etat varchar(30),
	termine timestamp,
	idBacklog int,
	idCreateur int,
	foreign key (idBacklog) references backlog(id),
	foreign key (idCreateur) references user_entity(id)
);

create table tache(
	id serial primary key,
	nom varchar(50),
	description varchar(250),
	dateDebut date,
	dateFin date,
	etat varchar(30),
	termine timestamp,
	avance int,
	rang int,
	idCreateur int,
	idProjet int,
	idFonctionnalite int,
	foreign key (idCreateur) references user_entity(id),
	foreign key (idProjet) references projet(idProjet),
	foreign key (idFonctionnalite) references fonctionnalite(id)
);

create table evenementProjet(
	id serial primary key,
	evenement varchar(255),
	moment timestamp,
	idProjet int,
	foreign key (idProjet) references projet(idProjet)
);

create table commentaire(
	idCommentaire serial primary key,
	commentaire varchar(255),
	isFile boolean,
	temp timestamp,
	idCreateur int,
	idProjet int,
	idBacklog int,
	projetID int,
	idFonctionnalite int,
	idTache int,
	foreign key (idProjet) references projet(idProjet),
	foreign key (projetID) references projet(idProjet),
	foreign key (idCreateur) references user_entity(id),
	foreign key (idBacklog) references backlog(id),
	foreign key (idFonctionnalite) references fonctionnalite(id),
	foreign key (idTache) references tache(id)
);

create table fichier(
	idFichier serial primary key,
	nom varchar(50),
	chemin varchar(250),
	dateCreation timestamp,
	idProjet int,
	idTache int,
	idCommentaire int,
	idUser int,
	foreign key (idProjet) references projet(idProjet),
	foreign key (idTache) references tache(id),
	foreign key (idCommentaire) references commentaire(idCommentaire),
	foreign key (idUser) references user_entity(id)
);

create table historique(
	idHistorique serial primary key,
	historique varchar(255),
	dateCreation timestamp,
	idProjet int,
	idCreateur int,
	foreign key (idProjet) references projet(idProjet),
	foreign key (idCreateur) references user_entity(id)
);

create table notification(
	idNotification serial primary key,
	notification varchar(100),
	temp timestamp,
	isread boolean,
	isNew boolean,
	idProjet int,
	idBacklog int,
	idFonctionnalite int,
	idTache int,
	idCommentaire int,
	idDestinataire int,
	idExpediteur int,
	foreign key (idProjet) references projet(idProjet),
	foreign key (idBacklog) references backlog(id),
	foreign key (idFonctionnalite) references fonctionnalite(id),
	foreign key (idTache) references tache(id),
	foreign key (idCommentaire) references commentaire(idCommentaire),
	foreign key (idDestinataire ) references user_entity(id),
	foreign key (idExpediteur ) references user_entity(id)
);

create table sprintBacklog(
	id serial primary key,
	idBacklog int,
	idSprint int,
	idProjet int,
	foreign key (idProjet) references projet(idProjet),
	foreign key (idBacklog) references backlog(id),
	foreign key (idSprint) references sprint(idSprint)
);

create table responsableProjet(
	id serial primary key,
	idProjet int,
	idBacklog int,
	idFonctionnalite int,
	idTache int,
	idResponsable int,
	idProductOwner int,
	idScrumMaster int,
	idDevellopers int,
	idCreateur int,
	foreign key (idProjet) references projet(idProjet),
	foreign key (idBacklog) references backlog(id),
	foreign key (idFonctionnalite) references fonctionnalite(id),
	foreign key (idTache) references tache(id),
	foreign key (idResponsable) references user_entity(id),
	foreign key (idProductOwner) references user_entity(id),
	foreign key (idScrumMaster) references user_entity(id),
	foreign key (idDevellopers) references user_entity(id),
	foreign key (idCreateur) references user_entity(id)
);