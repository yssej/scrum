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
@Table(name = "Commentaire")
@Proxy(lazy = false)
public class Commentaire {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idCommentaire;
	@Column(name = "commentaire",columnDefinition="text")
	private String commentaire;
	@Column(name = "isFile")
	private boolean isFile;
	@Column(name = "temp")
	@CreationTimestamp
	private LocalDateTime temp;
	
	@OneToMany(mappedBy = "commentaire", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Fichier> fichier;
	@OneToMany(mappedBy = "commentaire", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notification> notification;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProjet",referencedColumnName = "idProjet",nullable=true)	
	private Projet projet;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "projetID",referencedColumnName = "idProjet",nullable=true)	
	private Projet projetID;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idBacklog",referencedColumnName = "id",nullable=true)	
	private Backlog backlog;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idFonctionnalite",referencedColumnName = "id",nullable=true)	
	private Fonctionnalite fonctionnalite;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idTache",referencedColumnName = "idTache",nullable=true)	
	private Tache tache;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCreateur",referencedColumnName = "id",nullable=true)	
	private User_entity createur;
	
	public Commentaire() {
		super();
		this.isFile = false;
		this.temp = LocalDateTime.now();
	}
	public long getIdCommentaire() {
		return idCommentaire;
	}
	public void setIdCommentaire(long idCommentaire) {
		this.idCommentaire = idCommentaire;
	}
	public String getCommentaire() {
		return commentaire;
	}
	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}
	public LocalDateTime getTemp() {
		return temp;
	}
	public void setTemp(LocalDateTime temp) {
		this.temp = temp;
	}
	public Tache getTache() {
		return tache;
	}
	public void setTache(Tache tache) {
		this.tache = tache;
	}
	public User_entity getCreateur() {
		return createur;
	}
	public void setCreateur(User_entity user) {
		this.createur = user;
	}
	public Projet getProjet() {
		return projet;
	}
	public void setProjet(Projet projet) {
		this.projet = projet;
	}
	public boolean isFile() {
		return isFile;
	}
	public void setFile(boolean isFile) {
		this.isFile = isFile;
	}
	public Projet getProjetID() {
		return projetID;
	}
	public void setProjetID(Projet projetID) {
		this.projetID = projetID;
	}
	public Backlog getBacklog() {
		return backlog;
	}
	public void setBacklog(Backlog backlog) {
		this.backlog = backlog;
	}
	public Fonctionnalite getFonctionnalite() {
		return fonctionnalite;
	}
	public void setFonctionnalite(Fonctionnalite fonctionnalite) {
		this.fonctionnalite = fonctionnalite;
	}
	
}
