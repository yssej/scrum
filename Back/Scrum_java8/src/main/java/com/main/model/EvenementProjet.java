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

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "EvenementProjet")
@Proxy(lazy = false)
public class EvenementProjet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name = "evenement",columnDefinition="text")
	private String evenement;
	@Column(name = "moment")
	private LocalDateTime moment;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProjet",referencedColumnName = "idProjet",nullable=true)	
	private Projet projet;

	public EvenementProjet() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long idProjet) {
		this.id = idProjet;
	}

	public String getEvenement() {
		return evenement;
	}

	public void setEvenement(String evenement) {
		this.evenement = evenement;
	}

	public Projet getProjet() {
		return projet;
	}

	public void setProjet(Projet projet) {
		this.projet = projet;
	}

	public LocalDateTime getMoment() {
		return moment;
	}

	public void setMoment(LocalDateTime moment) {
		this.moment = moment;
	}
	
}
