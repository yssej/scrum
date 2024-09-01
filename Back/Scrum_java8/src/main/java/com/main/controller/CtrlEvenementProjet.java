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

import com.fasterxml.jackson.databind.JsonMappingException;
import com.main.Exception.RessourceNotFoundException;
import com.main.model.EvenementProjet;
import com.main.model.Historique;
import com.main.model.User_entity;
import com.main.repository.EvenementProjetRepository;
import com.main.repository.Historique_repository;
import com.main.repository.Projet_repository;
import com.main.repository.User_entityRepository;

@RestController
@RequestMapping("/EvenementProjet")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlEvenementProjet {

	@Autowired
	EvenementProjetRepository evenementRepository;
	@Autowired
	Historique_repository historiqueRepository;
	@Autowired
	Projet_repository projetRepository;
	@Autowired
	User_entityRepository userRepository;
	
	@GetMapping("/list")
	public List<EvenementProjet> findAll() {
		return evenementRepository.findAllByOrderByMomentAsc();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<EvenementProjet> getEvenementProjetById(@PathVariable("id") Long id){
		EvenementProjet evenementProjet = evenementRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(evenementProjet);
	}
	
	@PostMapping("/save/{userID}")
	public EvenementProjet create(@RequestBody EvenementProjet evenement,@PathVariable("userID") String userID) throws JsonParseException,JsonMappingException,IOException {
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		EvenementProjet evenementProjet = evenementRepository.save(evenement);
		Historique historique = new Historique();
		
		if(evenement.getEvenement() != null) {
			
			historique.setHistorique(" a ajouté l'évènement "+evenement.getEvenement());
			historique.setIdCreateur(user);
			historique.setProjet(evenement.getProjet());
			historiqueRepository.save(historique);
				
		}
		return evenementProjet;
	}
	
	@PutMapping("/update/{id}/{userID}")
	public ResponseEntity<EvenementProjet> update(@PathVariable("id") long id,@RequestBody EvenementProjet evenementProjetNew,@PathVariable("userID") String userID){
		
		EvenementProjet evenementProjet = evenementRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));	

		Historique historique = new Historique();
		historique.setIdCreateur(user);
		historique.setProjet(evenementProjetNew.getProjet());
		
		if(evenementProjet.getEvenement() == null && evenementProjetNew.getEvenement() != null) {
			historique.setHistorique(" a changé l'évènement à "+evenementProjetNew.getEvenement());
			historiqueRepository.save(historique);
		} else if(evenementProjet.getEvenement() != null && evenementProjetNew.getEvenement() != null && evenementProjet.getEvenement() != evenementProjetNew.getEvenement()) {
			historique.setHistorique(" a changé l'évènement de "+evenementProjet.getEvenement()+" à "+evenementProjetNew.getEvenement());
			historiqueRepository.save(historique);
		}
		if(evenementProjet.getMoment() == null && evenementProjetNew.getMoment() != null) {
			historique.setHistorique(" a ajouté une date à l'évènement id = "+evenementProjet.getId()+" le "+evenementProjetNew.getMoment());
			historiqueRepository.save(historique);
		} else if(evenementProjet.getMoment() != null && evenementProjetNew.getMoment() != null && evenementProjet.getMoment() != evenementProjetNew.getMoment()) {
			historique.setHistorique(" a changé la date de l'évènement de  id = "+evenementProjet.getId()+" de "+evenementProjet.getMoment()+" à "+evenementProjetNew.getMoment());
			historiqueRepository.save(historique);
		}
		
		evenementProjet.setEvenement(evenementProjetNew.getEvenement());
		evenementProjet.setMoment(evenementProjetNew.getMoment());
		
		EvenementProjet evenement = evenementRepository.save(evenementProjet);
		return ResponseEntity.ok(evenement);
	}
	
	@DeleteMapping("/delete/{id}/{userID}")
	public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id,@PathVariable("userID") String userID){
		EvenementProjet evenement = evenementRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));	
		
		Historique historique = new Historique();
		historique.setHistorique(" a supprimé l'évènement id = "+evenement.getId());
		historique.setIdCreateur(user);
		historique.setProjet(evenement.getProjet());
		historiqueRepository.save(historique);
		
		evenementRepository.delete(evenement);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/projetID/{id}")
	public ResponseEntity<EvenementProjet[]> getEvenementProjetByIdProjet(@PathVariable("id") long id){
		EvenementProjet[]evenementProjet = evenementRepository.findByProjetIdProjetOrderByMomentAsc(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(evenementProjet);
	}
}
