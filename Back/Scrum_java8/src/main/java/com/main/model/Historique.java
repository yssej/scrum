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
import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "Historique")
@Proxy(lazy = false)
public class Historique {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long idHistorique;
	@Column(name = "historique")
	private String historique;
	@Column(name = "dateCreation")
	@CreationTimestamp
	private LocalDateTime dateCreation;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProjet",referencedColumnName = "idProjet",nullable=true)	
	private Projet projet;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idCreateur",referencedColumnName = "id")	
	private User_entity idCreateur;

	public User_entity getIdCreateur() {
		return idCreateur;
	}

	public void setIdCreateur(User_entity idCreateur) {
		this.idCreateur = idCreateur;
	}

	public Historique() {
		super();
		this.dateCreation = LocalDateTime.now();
	}

	public long getIdHistorique() {
		return idHistorique;
	}

	public void setIdHistorique(long idHistorique) {
		this.idHistorique = idHistorique;
	}

	public String getHistorique() {
		return historique;
	}

	public void setHistorique(String historique) {
		this.historique = historique;
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
	
	
}
