package com.main.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Proxy;

@Entity
@Table(name = "User_entity")
@Proxy(lazy = false)
public class User_entity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	@Column(name = "username",unique = true)
	private String username;
	@Column(name = "email",unique = true)
	private String email;
	@Column(name= "created_timestamp")
	private long createdtimestamp;

	@OneToMany(mappedBy = "idCreateur", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Projet> idCreateur;
	@OneToMany(mappedBy = "idResponsable", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Tache> tache;
	@OneToMany(mappedBy = "idCreateur", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Sprint> sprint;
	@OneToMany(mappedBy = "createur", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Commentaire> commentaire;
	@OneToMany(mappedBy = "destinataire", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Notification> notification;
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Fichier> fichier;
	@OneToMany(mappedBy = "idCreateur", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Historique> historique;
	@OneToMany(mappedBy = "idResponsable", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ResponsableProjet> responsableProjet;
	@OneToMany(mappedBy = "idCreateur", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Backlog> backlog;
	@OneToMany(mappedBy = "idCreateur", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Fonctionnalite> fonctionnalite;
	
	public User_entity() {}
	
	public long getCreatedtimestamp() {
		return createdtimestamp;
	}

	public void setCreatedtimestamp(long cretedtimestamp) {
		this.createdtimestamp = cretedtimestamp;
	}
	
	public User_entity(String id) {
		this.id = id;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
