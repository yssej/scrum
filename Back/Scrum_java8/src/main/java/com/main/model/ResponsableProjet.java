package com.main.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "ResponsableProjet")
@Proxy(lazy = false)
public class ResponsableProjet {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
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
	@JoinColumn(name = "idResponsable",referencedColumnName = "id",nullable=true)	
	private User_entity idResponsable;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProductOwner",referencedColumnName = "id",nullable=true)	
	private User_entity idProductOwner;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idScrumMaster",referencedColumnName = "id",nullable=true)	
	private User_entity idScrumMaster;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idDevellopers",referencedColumnName = "id",nullable=true)	
	private User_entity idDevellopers;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCreateur",referencedColumnName = "id",nullable=true)	
	private User_entity idCreateur;

	public ResponsableProjet() {}
	
	public User_entity getIdDevellopers() {
		return idDevellopers;
	}

	public void setIdDevellopers(User_entity idDevellopers) {
		this.idDevellopers = idDevellopers;
	}

	public User_entity getIdCreateur() {
		return idCreateur;
	}

	public void setIdCreateur(User_entity idCreateur) {
		this.idCreateur = idCreateur;
	}

	public User_entity getIdResponsable() {
		return idResponsable;
	}

	public void setIdResponsable(User_entity idResponsable) {
		this.idResponsable = idResponsable;
	}

	public User_entity getIdProductOwner() {
		return idProductOwner;
	}

	public void setIdProductOwner(User_entity idProductOwner) {
		this.idProductOwner = idProductOwner;
	}

	public User_entity getIdScrumMaster() {
		return idScrumMaster;
	}

	public void setIdScrumMaster(User_entity idScrumMaster) {
		this.idScrumMaster = idScrumMaster;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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
	
}
