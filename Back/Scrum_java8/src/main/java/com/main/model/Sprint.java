package com.main.model;

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
@Table(name = "Sprint")
@Proxy(lazy = false)
public class Sprint {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idSprint;
	@Column(name = "nom")
	private String nom;
	@Column(name = "date_debut")
	private LocalDateTime date_debut;
	@Column(name = "date_fin")
	private LocalDateTime date_fin;
	@Column(name = "objectif")
	private String objectif;
	@Column(name = "etat")
	private String etat;
	@Column(name = "couleur")
	private String couleur;
	@Column(name = "termine")
	private LocalDateTime termine;
	@Column(name = "dateCreation")
	@CreationTimestamp
	private LocalDateTime dateCreation;
	
	@OneToMany(mappedBy = "sprint", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Backlog> backlog;
	@OneToMany(mappedBy = "sprint", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SprintBacklog> sprintBacklog;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCreateur",referencedColumnName = "id",nullable=true)	
	private User_entity idCreateur;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProjet",referencedColumnName = "idProjet",nullable=true)	
	private Projet projet;
	
	public Sprint() {
		super();
	}
	public Sprint(long idSprint, String nom, LocalDateTime date_debut, LocalDateTime date_fin, String objectif,
			String etat, User_entity idCreateur, Projet idProjet) {
		super();
		this.idSprint = idSprint;
		this.nom = nom;
		this.date_debut = date_debut;
		this.date_fin = date_fin;
		this.objectif = objectif;
		this.etat = etat;
		this.idCreateur = idCreateur;
		this.projet = idProjet;
	}
	public long getIdSprint() {
		return idSprint;
	}
	public void setIdSprint(long idSprint) {
		this.idSprint = idSprint;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public LocalDateTime getDate_debut() {
		return date_debut;
	}
	public void setDate_debut(LocalDateTime date_debut) {
		this.date_debut = date_debut;
	}
	public LocalDateTime getDate_fin() {
		return date_fin;
	}
	public void setDate_fin(LocalDateTime date_fin) {
		this.date_fin = date_fin;
	}
	public String getObjectif() {
		return objectif;
	}
	public void setObjectif(String objectif) {
		this.objectif = objectif;
	}
	public String getEtat() {
		return etat;
	}
	public void setEtat(String etat) {
		this.etat = etat;
	}
	public User_entity getIdCreateur() {
		return idCreateur;
	}
	public void setIdCreateur(User_entity idCreateur) {
		this.idCreateur = idCreateur;
	}
	public Projet getProjet() {
		return projet;
	}
	public void setProjet(Projet idProjet) {
		this.projet = idProjet;
	}
	public String getCouleur() {
		return couleur;
	}
	public void setCouleur(String couleur) {
		this.couleur = couleur;
	}
	public LocalDateTime getTermine() {
		return termine;
	}
	public void setTermine(LocalDateTime termine) {
		this.termine = termine;
	}
	public LocalDateTime getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(LocalDateTime dateCreation) {
		this.dateCreation = dateCreation;
	}
	
}
