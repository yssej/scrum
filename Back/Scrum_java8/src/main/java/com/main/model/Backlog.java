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
@Table(name = "Backlog")
@Proxy(lazy = false)
public class Backlog {
	
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
	@Column(name = "position")
	private long position;
	@Column(name = "termine")
	private LocalDateTime termine;
	@Column(name = "abbreviate")
	private String abbreviate;
	@Column(name = "priorite")
	private long priorite;
	@Column(name = "storyPoint")
	private long storyPoint;
	@Column(name = "dateCreation")
	@CreationTimestamp
	private LocalDateTime dateCreation;
	
	@OneToMany(mappedBy = "backlog", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Fonctionnalite> fonctionnalite;
	@OneToMany(mappedBy = "backlog", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Commentaire> commentaire;
	@OneToMany(mappedBy = "backlog", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ResponsableProjet> responsableProjet;
	@OneToMany(mappedBy = "backlog", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notification> notification;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProjet",referencedColumnName = "idProjet",nullable=true)	
	private Projet projet;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idSprint",referencedColumnName = "idSprint",nullable=true)	
	private Sprint sprint;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCreateur",referencedColumnName = "id",nullable=true)	
	private User_entity idCreateur;

	public Backlog() {
		super();
	}

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

	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
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

	public void setIdCreateur(User_entity createur) {
		this.idCreateur = createur;
	}

	public Sprint getSprint() {
		return sprint;
	}

	public void setSprint(Sprint sprint) {
		this.sprint = sprint;
	}

	public long getPosition() {
		return position;
	}

	public void setPosition(long position) {
		this.position = position;
	}

	public LocalDateTime getTermine() {
		return termine;
	}

	public void setTermine(LocalDateTime termine) {
		this.termine = termine;
	}

	public String getAbbreviate() {
		return abbreviate;
	}

	public void setAbbreviate(String abbreviate) {
		this.abbreviate = abbreviate;
	}

	public long getPriorite() {
		return priorite;
	}

	public void setPriorite(long priorite) {
		this.priorite = priorite;
	}

	public long getStoryPoint() {
		return storyPoint;
	}

	public void setStoryPoint(long storyPoint) {
		this.storyPoint = storyPoint;
	}

	public LocalDateTime getDateCreation() {
		return dateCreation;
	}

	public void setDateCreation(LocalDateTime dateCreation) {
		this.dateCreation = dateCreation;
	}
	
}