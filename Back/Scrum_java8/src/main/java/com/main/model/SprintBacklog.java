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
@Table(name = "SprintBacklog")
@Proxy(lazy = false)
public class SprintBacklog {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idBacklog",referencedColumnName = "id",nullable=true)	
	private Backlog backlog;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idSprint",referencedColumnName = "idSprint",nullable=true)	
	private Sprint sprint;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idProjet",referencedColumnName = "idProjet",nullable=true)	
	private Projet projet;
	
	public SprintBacklog() {
		super();
	}

	public Backlog getBacklog() {
		return backlog;
	}

	public void setBacklog(Backlog backlog) {
		this.backlog = backlog;
	}

	public Sprint getSprint() {
		return sprint;
	}

	public void setSprint(Sprint sprint) {
		this.sprint = sprint;
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
	
}
