package com.main.controller;

import java.io.IOException;
import java.time.LocalDateTime;
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

import com.fasterxml.jackson.databind.JsonMappingException;
import com.main.Exception.RessourceNotFoundException;
import com.main.model.Fonctionnalite;
import com.main.model.Historique;
import com.main.model.User_entity;
import com.main.repository.FonctionnaliteRepository;
import com.main.repository.Historique_repository;
import com.main.repository.Projet_repository;
import com.main.repository.User_entityRepository;

@RestController
@RequestMapping("/Fonctionnalite")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlFonctionnalite {
	
	@Autowired
	FonctionnaliteRepository fonctionRepository;
	@Autowired
	Historique_repository historiqueRepository;
	@Autowired
	Projet_repository projetRepository;
	@Autowired
	User_entityRepository userRepository;
	@Autowired
	WebSocketController socketCtrlr;
	
	@GetMapping("/list")
	public List<Fonctionnalite> findAll() {
		return fonctionRepository.findAll();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Fonctionnalite> getFonctionnaliteById(@PathVariable("id") Long id){
		Fonctionnalite fonctionnalite = fonctionRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(fonctionnalite);
	}
	
	@PostMapping("/save/{userID}")
	public Fonctionnalite create(@RequestBody Fonctionnalite fonctionnalite,@PathVariable("userID") String userID) throws JsonParseException,JsonMappingException,IOException {
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		Fonctionnalite fonctionnaliteFinal = fonctionRepository.save(fonctionnalite);
		Historique historique = new Historique();
		
		if(fonctionnalite.getNom() != null) {
			
			historique.setHistorique(" a crée la fonctionnalité "+fonctionnalite.getNom());
			historique.setIdCreateur(user);
			historique.setProjet(fonctionnalite.getBacklog().getProjet());
			historiqueRepository.save(historique);
				
		}
		socketCtrlr.onReceiveMessage("fonctionnalite");
		return fonctionnaliteFinal;
	}
	
	@PutMapping("/update/{id}/{userID}")
	public ResponseEntity<Fonctionnalite> update(@PathVariable("id") long id,@RequestBody Fonctionnalite fonctionnaliteNew,@PathVariable("userID") String userID){
		
		Fonctionnalite fonctionnalite = fonctionRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));	

		Historique historique = new Historique();
		historique.setIdCreateur(user);
		historique.setProjet(fonctionnaliteNew.getBacklog().getProjet());
		
		if(fonctionnalite.getNom() != null && fonctionnaliteNew.getNom() != null && !fonctionnalite.getNom().equalsIgnoreCase(fonctionnaliteNew.getNom())) {
			historique.setHistorique(" a changé le nom du fonctionnalite "+fonctionnalite.getNom()+" à "+fonctionnaliteNew.getNom());
			historiqueRepository.save(historique);
		}
		if(fonctionnalite.getDescription() == null && fonctionnaliteNew.getDescription() != null) {
			historique.setHistorique(" a ajouté une déscription sur la fonctionnalite "+fonctionnalite.getNom()+" --> "+fonctionnaliteNew.getDescription());
			historiqueRepository.save(historique);
		} else if(fonctionnalite.getDescription() != null && fonctionnaliteNew.getDescription() != null && !fonctionnalite.getDescription().equalsIgnoreCase(fonctionnaliteNew.getDescription())) {
			historique.setHistorique(" a changé la da description du fonctionnalite "+fonctionnaliteNew.getNom()+" de "+fonctionnalite.getDescription()+" à "+fonctionnaliteNew.getDescription());
			historiqueRepository.save(historique);
		}
		if(fonctionnalite.getDateDebut() == null && fonctionnaliteNew.getDateDebut() != null) {
			historique.setHistorique(" a ajouté une date début sur le fonctionnalite "+fonctionnaliteNew.getNom()+" à "+fonctionnaliteNew.getDateDebut());
			historiqueRepository.save(historique);
		} else if(fonctionnalite.getDateDebut() != null && fonctionnaliteNew.getDateDebut() != null && !fonctionnalite.getDateDebut().isEqual(fonctionnaliteNew.getDateDebut())) {
			historique.setHistorique(" a modifié la date début sur le fonctionnalite "+fonctionnaliteNew.getNom()+" de "+fonctionnalite.getDateDebut()+" à "+fonctionnaliteNew.getDateDebut());
			historiqueRepository.save(historique);
		}
		if(fonctionnalite.getDateFin() == null && fonctionnalite.getDateFin() != null) {
			historique.setHistorique(" a ajouté une date fin sur le fonctionnalite "+fonctionnaliteNew.getNom()+" à "+fonctionnaliteNew.getDateFin());
			historiqueRepository.save(historique);
		} else if(fonctionnalite.getDateFin() != null && fonctionnaliteNew.getDateFin() != null && !fonctionnalite.getDateFin().isEqual(fonctionnaliteNew.getDateFin())) {
			historique.setHistorique(" a modifié la date fin sur le fonctionnalite "+fonctionnaliteNew.getNom()+" de "+fonctionnalite.getDateFin()+" à "+fonctionnaliteNew.getDateFin());
			historiqueRepository.save(historique);
		}
		
		int isTermine = 0;
		if(fonctionnaliteNew.getEtat().equalsIgnoreCase("Terminé")) isTermine = 1;
		
		if(isTermine == 1 && fonctionnaliteNew.getTermine() == null) { fonctionnaliteNew.setTermine(LocalDateTime.now()); }
		else if(isTermine == 0 && fonctionnaliteNew.getTermine() != null) { fonctionnaliteNew.setTermine(null); }
		
		fonctionnalite.setNom(fonctionnaliteNew.getNom());
		fonctionnalite.setDescription(fonctionnaliteNew.getDescription());
		fonctionnalite.setDateDebut(fonctionnaliteNew.getDateDebut());
		fonctionnalite.setDateFin(fonctionnaliteNew.getDateFin());
		fonctionnalite.setEtat(fonctionnaliteNew.getEtat());
		fonctionnalite.setBacklog(fonctionnaliteNew.getBacklog());
		fonctionnalite.setTermine(fonctionnaliteNew.getTermine());
		fonctionnalite.setProjet(fonctionnaliteNew.getProjet());
		
		Fonctionnalite fonctionnaliteFinal = fonctionRepository.save(fonctionnalite);
		socketCtrlr.onReceiveMessage("fonctionnalite");
		return ResponseEntity.ok(fonctionnaliteFinal);
	}
	
	@DeleteMapping("/delete/{id}/{userID}")
	public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id,@PathVariable("userID") String userID){
		Fonctionnalite fonctionnalite = fonctionRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));	
		
		Historique historique = new Historique();
		historique.setHistorique(" a supprimé le backlog "+fonctionnalite.getNom());
		historique.setIdCreateur(user);
		historique.setProjet(fonctionnalite.getBacklog().getProjet());
		historiqueRepository.save(historique);
		
		fonctionRepository.delete(fonctionnalite);
		socketCtrlr.onReceiveMessage("fonctionnalite");
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/backlogID/{id}")
	public ResponseEntity<Fonctionnalite[]> getFonctionnaliteByIdBacklog(@PathVariable("id") long id){
		Fonctionnalite[]fonctionnalites = fonctionRepository.findByBacklogId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(fonctionnalites);
	}
	
	@GetMapping("/projetID/{id}")
	public ResponseEntity<Fonctionnalite[]> getFonctionnaliteByIdProjet(@PathVariable("id") long id){
		Fonctionnalite[]fonctionnalites = fonctionRepository.findByProjetIdProjet(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(fonctionnalites);
	}
	
	
}
