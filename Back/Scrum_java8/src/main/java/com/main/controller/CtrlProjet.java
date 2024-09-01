package com.main.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.model.Historique;
import com.main.model.Projet;
import com.main.model.User_entity;
import com.main.repository.Historique_repository;
import com.main.repository.Projet_repository;
import com.main.repository.User_entityRepository;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.main.Exception.RessourceNotFoundException;

@RestController
@RequestMapping("/Projet")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlProjet {
	
	@Autowired
	Projet_repository projetRepository;
	
	@Autowired
	Historique_repository historiqueRepository;
	
	@Autowired
	User_entityRepository userRepository;
	
	@GetMapping("/list")
	public List<Projet> findAll(){
		return projetRepository.findAll();
	}
	
	@GetMapping("/listOrderByDatecreationAsc")
	public List<Projet> findAllOrderByDatecreationAsc(){
		return projetRepository.findAllByOrderByDateCreationAsc();
	}
	
	@GetMapping("/listOrderByDatecreationDesc")
	public List<Projet> findAllOrderByDatecreationDesc(){
		return projetRepository.findAllByOrderByDateCreationDesc();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Projet> getProjetById(@PathVariable("id") Long id){
		Projet projet = projetRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(projet);
	}
	
	@PostMapping("/save")
	public Projet create(@RequestBody Projet projet) throws JsonParseException,JsonMappingException,IOException {
		Projet fin = projetRepository.save(projet);
		Historique historique = new Historique();
		historique.setHistorique(" a crée le projet");
		historique.setIdCreateur(projet.getIdCreateur());
		historique.setProjet(fin);
		historiqueRepository.save(historique);
		return fin;
	}
	
	@PutMapping("/update/{id}/{userID}")
	public ResponseEntity<Projet> update(@PathVariable("id") long id,@RequestBody Projet projetDetails,@PathVariable("userID") String userID){
		Projet projet = projetRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		
		if(!projetDetails.getEtat().equalsIgnoreCase("Terminé")) projetDetails.setDateTermine(null);
		
		if(!projet.getNom().equalsIgnoreCase(projetDetails.getNom())) {
			Historique historique = new Historique();
			historique.setHistorique(" a modifié le nom du projet de "+projet.getNom()+" à "+projetDetails.getNom());
			historique.setIdCreateur(user);
			historique.setProjet(projet);
			historiqueRepository.save(historique);
		}
		if(projet.getDescription() == null && projetDetails.getDescription() != null) {
			Historique historique = new Historique();
			historique.setIdCreateur(user);
			historique.setProjet(projet);
			historique.setHistorique(" a ajouté une déscription sur le projet "+projet.getNom()+" --> "+projetDetails.getDescription());
			historiqueRepository.save(historique);
		} else if(projet.getDescription() != null && projetDetails.getDescription() != null && !projet.getDescription().equalsIgnoreCase(projetDetails.getDescription())) {
			Historique historique = new Historique();
			historique.setIdCreateur(user);
			historique.setProjet(projet);
			historique.setHistorique(" a changé la da description du projet "+projetDetails.getNom()+" de "+projet.getDescription()+" à "+projetDetails.getDescription());
			historiqueRepository.save(historique);
		}
//		if(projet.getIdResponsable() == null && projetDetails.getIdResponsable() != null) {
//			Historique historique = new Historique();
//			historique.setHistorique(" a modifié le responsable du projet de null à "+projetDetails.getIdResponsable().getUsername());
//			historique.setIdCreateur(user);
//			historique.setProjet(projet);
//			historiqueRepository.save(historique);
//		} else if(!projet.getIdResponsable().getUsername().equalsIgnoreCase(projetDetails.getIdResponsable().getUsername())) {
//			Historique historique = new Historique();
//			historique.setHistorique(" a modifié le responsable du projet de "+projet.getIdResponsable().getUsername()+" à "+projetDetails.getIdResponsable().getUsername());
//			historique.setIdCreateur(user);
//			historique.setProjet(projet);
//			historiqueRepository.save(historique);
//		}
		if(projet.getDateDebut() == null && projetDetails.getDateDebut() != null) {
			Historique historique = new Historique();
			historique.setHistorique(" a ajouté une date de debut: "+projetDetails.getDateDebut()+" sur le projet.");
			historique.setIdCreateur(user);
			historique.setProjet(projet);	
			historiqueRepository.save(historique);	
		} else if(projet.getDateDebut() != null && projetDetails.getDateDebut() != null && !projet.getDateDebut().isEqual(projetDetails.getDateDebut())) {
			Historique historique = new Historique();
			historique.setHistorique(" a modifié la date de debut du projet de "+projet.getDateDebut()+" à "+projetDetails.getDateDebut());
			historique.setIdCreateur(user);
			historique.setProjet(projet);
			historiqueRepository.save(historique);		
		} else if(projet.getDateDebut() != null && projetDetails.getDateDebut() == null) {
			Historique historique = new Historique();
			historique.setHistorique(" a supprimé la date de debut du projet.");
			historique.setIdCreateur(user);
			historique.setProjet(projet);		
			historiqueRepository.save(historique);
		}
		if(projet.getDateFin() == null && projetDetails.getDateFin() != null) {
			Historique historique = new Historique();
			historique.setHistorique(" a ajouté une date fin: "+projetDetails.getDateDebut()+" sur le projet.");
			historique.setIdCreateur(user);
			historique.setProjet(projet);	
			historiqueRepository.save(historique);	
		} else if(projet.getDateFin() != null && projetDetails.getDateFin() != null && !projet.getDateFin().isEqual(projetDetails.getDateFin())) {
			Historique historique = new Historique();
			historique.setHistorique(" a modifié la date fin du projet de "+projet.getDateFin()+" à "+projetDetails.getDateFin());
			historique.setIdCreateur(user);
			historique.setProjet(projet);	
			historiqueRepository.save(historique);	
		} else if(projet.getDateFin() != null && projetDetails.getDateFin() == null) {
			Historique historique = new Historique();
			historique.setHistorique(" a supprimé la date fin du projet.");
			historique.setIdCreateur(user);
			historique.setProjet(projet);	
			historiqueRepository.save(historique);	
		}
		if(projet.getDateTermine() == null && projetDetails.getDateTermine() != null) {
			Historique historique = new Historique();
			historique.setHistorique(" a terminé le backlog "+projetDetails.getNom()+" à "+projet.getDateTermine());
			historique.setIdCreateur(user);
			historique.setProjet(projet);		
			historiqueRepository.save(historique);
		} else if(projet.getDateTermine() != null && projetDetails.getDateTermine() == null) {
			Historique historique = new Historique();
			historique.setHistorique(" a rouvert le backlog "+projetDetails.getNom()+".");
			historique.setIdCreateur(user);
			historique.setProjet(projet);		
			historiqueRepository.save(historique);
		}
		
		projet.setNom(projetDetails.getNom());
		projet.setDescription(projetDetails.getDescription());
		projet.setEtat(projetDetails.getEtat());
		projet.setDateCreation(projetDetails.getDateCreation());
		projet.setIdCreateur(projetDetails.getIdCreateur());
//		projet.setIdResponsable(projetDetails.getIdResponsable());
		projet.setDateDebut(projetDetails.getDateDebut());
		projet.setDateFin(projetDetails.getDateFin());
		projet.setDateTermine(projetDetails.getDateTermine());
		
		Projet updatedEmployee = projetRepository.save(projet);
		return ResponseEntity.ok(updatedEmployee);	
	}
	
	@DeleteMapping("/delete/{id}/{userID}")
	public ResponseEntity<Map<String, Boolean>> deleteProject(@PathVariable Long id,@PathVariable("userID") String userID){
		Projet projet = projetRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		
		Historique historique = new Historique();
		historique.setHistorique(" a supprimé le projet "+projet.getNom()+" avec idProjet = "+projet.getIdProjet());
		historique.setIdCreateur(user);
		historique.setProjet(null);
		historiqueRepository.save(historique);
		Historique[] historiquesByProjet = historiqueRepository.findByProjetIdProjet(projet.getIdProjet()).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		for(Historique story: historiquesByProjet) {
			story.setProjet(null);
			historiqueRepository.save(story);
		}
		
		projetRepository.delete(projet);		
		
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/createurID/{id}")
	public ResponseEntity<Projet[]> getFichierByCreateur(@PathVariable("id") String id){
		Projet[]taches = projetRepository.findByIdCreateurId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(taches);
	}
	
//	@GetMapping("/responsableID/{id}")
//	public ResponseEntity<Projet[]> getFichierByResponsable(@PathVariable("id") String id){
//		Projet[]taches = projetRepository.findByIdResponsableId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
//		return ResponseEntity.ok(taches);
//	}
	
	@GetMapping("/countByEtat/{etat}")
	public long getNumberByEtat(@PathVariable("etat") String etat) {
		return projetRepository.countByEtat(etat);
	}
	
	@GetMapping("/findByNom/{nom}")
	public List<Projet> findByNom(@PathVariable("nom") String nom){
		return projetRepository.findByNom(nom);
	}
	
	@GetMapping("/findByEtat/{etat}")
	public List<Projet> findByEtat(@PathVariable("etat") String etat){
		return projetRepository.findByEtat(etat);
	}
}
