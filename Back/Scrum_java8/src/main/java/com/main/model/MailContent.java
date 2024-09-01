package com.main.model;

public class MailContent {
	String destinataire;
	String body;
	String object;
	String root;
	
	public MailContent() {}
	
	public MailContent(String destinataire,String body,String object) {
		this.destinataire = destinataire;
		this.body = body;
		this.object = object;
	}

	public String getDestinataire() {
		return destinataire;
	}

	public void setDestinataire(String destinataire) {
		this.destinataire = destinataire;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getObject() {
		return object;
	}

	public void setObject(String object) {
		this.object = object;
	}

	public String getRoot() {
		return root;
	}

	public void setRoot(String root) {
		this.root = root;
	}
}
