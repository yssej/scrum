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
import com.main.repository.Historique_repository;

@RestController
@RequestMapping("/Historique")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlHistorique {
	
	@Autowired
	Historique_repository historique_repository;
	
	@GetMapping("/list")
	public List<Historique> findAll() {
		return historique_repository.findAll();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Historique> getHistoriqueById(@PathVariable("id") Long id){
		Historique historique = historique_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Historique not exist with id : " + id));
		return ResponseEntity.ok(historique);
	}
	
	@PostMapping("/save")
	public Historique create(@RequestBody Historique historique) throws JsonParseException,JsonMappingException,IOException {
		historique.setDateCreation(LocalDateTime.now());
		return historique_repository.save(historique);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Historique> update(@PathVariable("id") long id,@RequestBody Historique historiqueDetails) {
		Historique historique = historique_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		
		historique.setHistorique(historiqueDetails.getHistorique());
		historique.setDateCreation(historiqueDetails.getDateCreation());
		historique.setProjet(historiqueDetails.getProjet());
		
		Historique updatedHistorique = historique_repository.save(historique);
		return ResponseEntity.ok(updatedHistorique);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteTache(@PathVariable Long id){
		Historique historique = historique_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		
		historique_repository.delete(historique);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/projetID/{id}")
	public ResponseEntity<Historique[]> getProjetById(@PathVariable("id") Long id){
		Historique[]historiques = historique_repository.findByProjetIdProjet(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(historiques);
	}
}
