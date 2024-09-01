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
@Table(name = "Tache")
@Proxy(lazy = false)
public class Tache {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idTache;
	@Column(name = "nom")
	private String nom;
	@Column(name = "couleur")
	private String couleur;
	@Column(name = "description",columnDefinition="text")
	private String description;
	@Column(name = "etat")
	private String etat;
	@Column(name = "avance")
	private double avance;
	@Column(name = "date_debut")
	private LocalDate dateDebut;
	@Column(name = "date_fin")
	private LocalDate dateFin;
	@Column(name = "rang")
    private long rang;
	@Column(name = "termine")
	private LocalDateTime termine;
	@Column(name = "dateCreation")
	@CreationTimestamp
	private LocalDateTime dateCreation;
	
	@OneToMany(mappedBy = "tache", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Commentaire> commentaire;
	@OneToMany(mappedBy = "tache", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Fichier> fichier;
	@OneToMany(mappedBy = "tache", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ResponsableProjet> responsableProjet;
	@OneToMany(mappedBy = "tache", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notification> notification;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProjet",referencedColumnName = "idProjet",nullable=true)	
	private Projet projet;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idFonctionnalite",referencedColumnName = "id",nullable=true)	
	private Fonctionnalite fonctionnalite;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idResponsable",referencedColumnName = "id",nullable=true)	
	private User_entity idResponsable;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idRapporteur",referencedColumnName = "id",nullable=true)	
	private User_entity idRapporteur;

	public Tache() {
		super();
		this.avance = 0.0;
	}

	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet idProjet) {
		this.projet = idProjet;
	}

	public long getIdTache() {
		return idTache;
	}

	public void setIdTache(long id) {
		this.idTache = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getCouleur() {
		return couleur;
	}

	public void setCouleur(String couleur) {
		this.couleur = couleur;
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

	public LocalDate getDateDebut() {
		return dateDebut;
	}

	public void setDateDebut(LocalDate date_debut) {
		this.dateDebut = date_debut;
	}

	public LocalDate getDateFin() {
		return dateFin;
	}

	public void setDateFin(LocalDate date_fin) {
		this.dateFin = date_fin;
	}

	public User_entity getIdResponsable() {
		return idResponsable;
	}

	public void setIdResponsable(User_entity id_responsable) {
		this.idResponsable = id_responsable;
	}

	public User_entity getIdRapporteur() {
		return idRapporteur;
	}

	public void setIdRapporteur(User_entity id_rapporteur) {
		this.idRapporteur = id_rapporteur;
	}

	public long getRang() {
		return rang;
	}

	public void setRang(long order) {
		this.rang = order;
	}

	public Fonctionnalite getFonctionnalite() {
		return fonctionnalite;
	}

	public void setFonctionnalite(Fonctionnalite fonctionnalite) {
		this.fonctionnalite = fonctionnalite;
	}

	public double getAvance() {
		return avance;
	}

	public void setAvance(double avance) {
		this.avance = avance;
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
