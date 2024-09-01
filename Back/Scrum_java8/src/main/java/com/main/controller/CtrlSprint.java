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
import com.main.model.Historique;
import com.main.model.Sprint;
import com.main.model.User_entity;
import com.main.repository.Historique_repository;
import com.main.repository.Sprint_repository;
import com.main.repository.User_entityRepository;

@RestController
@RequestMapping("/Sprint")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlSprint {
	
	@Autowired
	Sprint_repository sprint_repository;
	
	@Autowired
	Historique_repository historiqueRepository;
	
	@Autowired
	User_entityRepository userRepository;
	

	@Autowired
	WebSocketController socketCtrlr;
	
	@GetMapping("/list")
	public List<Sprint> findAll() {
		return sprint_repository.findAll();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Sprint> getSprintById(@PathVariable("id") Long id) {
		Sprint sprint = sprint_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(sprint);
	}
	
	@PostMapping("/save/{userID}")
	public Sprint create(@RequestBody Sprint sprint,@PathVariable("userID") String userID) throws JsonParseException,JsonMappingException,IOException {
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		
		Historique historique = new Historique();
		historique.setHistorique(" a crée le sprint "+sprint.getNom()+" id = "+sprint.getIdSprint());
		historique.setIdCreateur(user);
		historique.setProjet(sprint.getProjet());
		historiqueRepository.save(historique);
		socketCtrlr.onReceiveMessage("sprint");
		
		return sprint_repository.save(sprint);
	}
	
	@PutMapping("/update/{id}/{userID}")
	public ResponseEntity<Sprint> update(@PathVariable("id") long id,@RequestBody Sprint sprintDetails,@PathVariable("userID") String userID) {
		Sprint sprint = sprint_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));			

		Historique historique = new Historique();
		historique.setIdCreateur(user);
		historique.setProjet(sprint.getProjet());
		
		if(!sprint.getNom().equalsIgnoreCase(sprintDetails.getNom())) {
			historique.setHistorique(" a modifié le nom du sprint de "+sprint.getNom()+" à "+sprintDetails.getNom());
			historiqueRepository.save(historique);
		}
		if(sprint.getObjectif() == null && sprintDetails.getObjectif() != null) {
			historique.setHistorique(" a ajouté un objectif sur le sprint "+sprint.getNom());
			historiqueRepository.save(historique);
		} else if(sprint.getObjectif() != null && sprintDetails.getObjectif() != null && !sprint.getObjectif().equalsIgnoreCase(sprintDetails.getObjectif())) {
			historique.setHistorique(" a modifié l'objectif du sprint "+sprint.getNom()+" de "+sprint.getObjectif()+" à "+sprintDetails.getObjectif());
			historiqueRepository.save(historique);
		}
		if(!sprint.getEtat().equalsIgnoreCase(sprintDetails.getEtat())) {
			historique.setHistorique(" a modifié l'état du sprint "+sprint.getNom()+" de "+sprint.getEtat()+" à "+sprintDetails.getEtat());
			historiqueRepository.save(historique);
		}
		if(sprint.getDate_debut() != null && sprintDetails.getDate_debut() != null) {
			historique.setHistorique(" a ajouté un date de début :"+sprintDetails.getDate_debut()+" sur le sprint "+sprint.getNom());
			historiqueRepository.save(historique);
		} else if(sprint.getDate_debut() != null && sprintDetails.getDate_debut() != null && !sprint.getDate_debut().isEqual(sprintDetails.getDate_debut())) {
			historique.setHistorique(" a modifié le début du sprint "+sprint.getNom()+" de "+sprint.getDate_debut()+" à "+sprintDetails.getDate_debut());
			historiqueRepository.save(historique);
		}
		if(sprint.getDate_fin() != null && sprintDetails.getDate_fin() != null) {
			historique.setHistorique(" a ajouté un date d'échéance :"+sprintDetails.getDate_fin()+" sur le sprint "+sprint.getNom());
			historiqueRepository.save(historique);
		} else if(sprint.getDate_fin() != null && sprintDetails.getDate_fin() != null && !sprint.getDate_fin().isEqual(sprintDetails.getDate_fin())) {
			historique.setHistorique(" a modifié la date d'échéance du sprint "+sprint.getNom()+" de "+sprint.getDate_fin()+" à "+sprintDetails.getDate_fin());
			historiqueRepository.save(historique);
		}
		if(sprint.getCouleur() == null && sprintDetails.getCouleur() != null) {
			historique.setHistorique(" a ajouté la couleur "+sprintDetails.getCouleur()+" sur le sprint "+sprint.getNom()+".");
			historiqueRepository.save(historique);
		} else if(sprint.getCouleur() != null && sprintDetails.getCouleur() != null && !sprint.getCouleur().equalsIgnoreCase(sprintDetails.getCouleur())) {
			historique.setHistorique(" a changé la couleur du sprint "+sprintDetails.getNom()+" de "+sprint.getCouleur()+" à "+sprintDetails.getCouleur()+".");
			historiqueRepository.save(historique);
		}
		
		int isTermine = 0;
		if(sprintDetails.getEtat().equalsIgnoreCase("Terminé")) isTermine = 1;
		
		if(isTermine == 1 && sprintDetails.getTermine() == null) { sprintDetails.setTermine(LocalDateTime.now()); }
		else if(isTermine == 0 && sprintDetails.getTermine() != null) { sprintDetails.setTermine(null); }
		
		sprint.setNom(sprintDetails.getNom());
		sprint.setDate_debut(sprintDetails.getDate_debut());
		sprint.setDate_fin(sprintDetails.getDate_fin());
		sprint.setObjectif(sprintDetails.getObjectif());
		sprint.setEtat(sprintDetails.getEtat());
		sprint.setCouleur(sprintDetails.getCouleur());
		sprint.setProjet(sprintDetails.getProjet());
		sprint.setTermine(sprintDetails.getTermine());
		
		Sprint sprintUpdated = sprint_repository.save(sprint);
		socketCtrlr.onReceiveMessage("sprint");
		return ResponseEntity.ok(sprintUpdated);
	}
	
	@DeleteMapping("/delete/{id}/{userID}")
	public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id,@PathVariable("userID") String userID){
		Sprint sprint = sprint_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));	
		
		Historique historique = new Historique();
		historique.setHistorique(" a supprimé le sprint "+sprint.getNom());
		historique.setIdCreateur(user);
		historique.setProjet(sprint.getProjet());
		historiqueRepository.save(historique);
		
		sprint_repository.delete(sprint);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		socketCtrlr.onReceiveMessage("sprint");
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/createurID/{id}")
	public ResponseEntity<Sprint[]> getTacheByCreateur(@PathVariable("id") String id){
		Sprint[]sprints = sprint_repository.findByIdCreateurId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(sprints);
	}
	
	@GetMapping("/projetID/{id}")
	public ResponseEntity<Sprint[]> getTacheByProjet(@PathVariable("id") Long id){
		Sprint[]sprints = sprint_repository.findByProjetIdProjet(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(sprints);
	}
}
