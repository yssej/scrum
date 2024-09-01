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

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "Fonctionnalite")
@Proxy(lazy = false)
public class Fonctionnalite {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "nom",nullable=false)
	private String nom;
	@Column(name = "description",columnDefinition="text")
	private String description;
	@Column(name = "dateDebut")
	private LocalDate dateDebut;
	@Column(name = "dateFin")
	private LocalDate dateFin;
	@Column(name = "etat")
	private String etat;
	@Column(name = "termine")
	private LocalDateTime termine;
	
	@OneToMany(mappedBy = "fonctionnalite", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Commentaire> commentaire;
	@OneToMany(mappedBy = "fonctionnalite", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Tache> tache;
	@OneToMany(mappedBy = "fonctionnalite", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ResponsableProjet> responsableProjet;
	@OneToMany(mappedBy = "fonctionnalite", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notification> notification;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProjet",referencedColumnName = "idProjet",nullable=true)	
	private Projet projet;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idBacklog",referencedColumnName = "id",nullable=true)	
	private Backlog backlog;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCreateur",referencedColumnName = "id",nullable=true)	
	private User_entity idCreateur;

	public Fonctionnalite() {}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public Backlog getBacklog() {
		return backlog;
	}

	public void setBacklog(Backlog backlog) {
		this.backlog = backlog;
	}
	
	public User_entity getIdCreateur() {
		return idCreateur;
	}

	public void setIdCreateur(User_entity createur) {
		this.idCreateur = createur;
	}

	public String getEtat() {
		return etat;
	}

	public void setEtat(String etat) {
		this.etat = etat;
	}

	public LocalDateTime getTermine() {
		return termine;
	}

	public void setTermine(LocalDateTime termine) {
		this.termine = termine;
	}

	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
	}
	
}
