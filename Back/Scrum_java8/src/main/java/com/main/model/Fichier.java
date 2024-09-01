package com.main.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "Fichier")
public class Fichier {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idFichier;
	@Column(name = "nom",nullable=false)
	private String nom;
	@Column(name = "chemin")
	private String chemin;
	@Column(name = "dateCreation")
	@CreationTimestamp
	private LocalDateTime dateCreation;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProjet",referencedColumnName = "idProjet",nullable=true)	
	private Projet projet;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idTache",referencedColumnName = "idTache",nullable=true)	
	private Tache tache;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCommentaire",referencedColumnName = "idCommentaire",nullable=true)	
	private Commentaire commentaire;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idUser", referencedColumnName = "id", nullable = true, unique = false)
	private User_entity user;
	
	public User_entity getUser() {
		return user;
	}
	public void setUser(User_entity user) {
		this.user = user;
	}
	public Fichier() {
		super();
	}
	public long getIdFichier() {
		return idFichier;
	}
	public void setIdFichier(long idFichier) {
		this.idFichier = idFichier;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getChemin() {
		return chemin;
	}
	public void setChemin(String chemin) {
		this.chemin = chemin;
	}
	public LocalDateTime getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(LocalDateTime dateCreation) {
		this.dateCreation = dateCreation;
	}
	public Projet getProjet() {
		return projet;
	}
	public void setProjet(Projet projet) {
		this.projet = projet;
	}
	public Commentaire getCommentaire() {
		return commentaire;
	}
	public void setCommentaire(Commentaire commentaire) {
		this.commentaire = commentaire;
	}
	public Tache getTache() {
		return tache;
	}
	public void setTache(Tache tache) {
		this.tache = tache;
	}
	
}
