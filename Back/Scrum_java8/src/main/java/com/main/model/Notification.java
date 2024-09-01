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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Notification")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idNotification;
	@Column(name = "notification")
	private String notification;
	@Column(name = "temp")
	@CreationTimestamp
	private LocalDateTime temp;
	@Column(name = "isread")
	private boolean isread;
	@Column(name = "isNew")
	private boolean isNew;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProjet",referencedColumnName = "idProjet",nullable=true)	
	private Projet projet;
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
	@JoinColumn(name = "idCommentaire",referencedColumnName = "idCommentaire",nullable=true)	
	private Commentaire commentaire;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idDestinataire",referencedColumnName = "id",nullable=true)	
	private User_entity destinataire;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idExpediteur",referencedColumnName = "id",nullable=true)	
	private User_entity expediteur;
	
	public Notification() {
		super();
		this.isread = false;
		this.isNew = true;
	}
	public long getIdNotification() {
		return idNotification;
	}
	public void setIdNotification(long idNotification) {
		this.idNotification = idNotification;
	}
	public String getNotification() {
		return notification;
	}
	public void setNotification(String notification) {
		this.notification = notification;
	}
	public LocalDateTime getTemp() {
		return temp;
	}
	public void setTemp(LocalDateTime temp) {
		this.temp = temp;
	}
	public boolean isIsread() {
		return isread;
	}
	public void setIsread(boolean isread) {
		this.isread = isread;
	}
	public User_entity getDestinataire() {
		return destinataire;
	}
	public void setDestinataire(User_entity destinataire) {
		this.destinataire = destinataire;
	}
	public User_entity getEpxediteur() {
		return expediteur;
	}
	public void setExpediteur(User_entity exediteur) {
		this.expediteur = exediteur;
	}
	public boolean isNew() {
		return isNew;
	}
	public void setNew(boolean isNew) {
		this.isNew = isNew;
	}
	public User_entity getExpediteur() {
		return expediteur;
	}
	public Projet getProjet() {
		return projet;
	}
	public void setProjet(Projet projet) {
		this.projet = projet;
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
	public Tache getTache() {
		return tache;
	}
	public void setTache(Tache tache) {
		this.tache = tache;
	}
	public Commentaire getCommentaire() {
		return commentaire;
	}
	public void setCommentaire(Commentaire commentaire) {
		this.commentaire = commentaire;
	}
	
}
