package com.main.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "Projet")
@Proxy(lazy = false)
public class Projet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idProjet;
	@Column(name = "nom",unique=true,nullable=false)
	private String nom;
	@Column(name = "description",columnDefinition="text")
	private String description;
	@Column(name = "etat")
	private String etat;
	@Column(name = "dateCreation")
	@CreationTimestamp
	private LocalDateTime dateCreation;
	@Column(name = "dateDebut")
	private LocalDate dateDebut;
	@Column(name = "dateFin")
	private LocalDate dateFin;
	@Column(name = "dateTermine")
	private LocalDate dateTermine;
	
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Tache> tache;
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Fichier> fichier;
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Sprint> sprint;
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Commentaire> commentaire;
	@OneToMany(mappedBy = "projetID", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Commentaire> commentaire2;
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Historique> historique;
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ResponsableProjet> responsableProjet;
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<EvenementProjet> evenementProjet;
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Backlog> backlog;
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Fonctionnalite> fonctionnalite;
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notification> notification;
	@OneToMany(mappedBy = "projet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SprintBacklog> sprintBacklog;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCreateur",referencedColumnName = "id",nullable=true)	
	private User_entity idCreateur;
//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "idResponsable",referencedColumnName = "id",nullable=true)	
//	private User_entity idResponsable;
	
	public Projet() {}
	
	public Projet(String nom, String description, String etat, LocalDateTime dateCreation,
			User_entity id_createur,User_entity id_responsable) {
		super();
		this.nom = nom;
		this.description = description;
		this.etat = etat;
		this.dateCreation = dateCreation;
		this.idCreateur = id_createur;
//		this.idResponsable = id_responsable;
	}

	public long getIdProjet() {
		return idProjet;
	}

	public void setIdProjet(long idProjet) {
		this.idProjet = idProjet;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public LocalDateTime getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(LocalDateTime dateCreation) {
		this.dateCreation = dateCreation;
	}

	public User_entity getIdCreateur() {
		return idCreateur;
	}

	public void setIdCreateur(User_entity idCreateur) {
		this.idCreateur = idCreateur;
	}

//	public User_entity getIdResponsable() {
//		return idResponsable;
//	}
//
//	public void setIdResponsable(User_entity idResponsable) {
//		this.idResponsable = idResponsable;
//	}

	public LocalDate getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(LocalDate dateDebut) {
		this.dateDebut = dateDebut;
	}

	public LocalDate getDateFin() {
		return dateFin;
	}

	public void setDateFin(LocalDate dateFin) {
		this.dateFin = dateFin;
	}

	public LocalDate getDateTermine() {
		return dateTermine;
	}

	public void setDateTermine(LocalDate dateTermine) {
		this.dateTermine = dateTermine;
	}
	
	
}
