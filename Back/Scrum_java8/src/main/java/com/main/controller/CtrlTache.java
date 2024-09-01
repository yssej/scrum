package com.main.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
import com.main.model.Tache;
import com.main.model.User_entity;
import com.main.repository.Historique_repository;
import com.main.repository.Tache_repository;
import com.main.repository.User_entityRepository;

@RestController
@RequestMapping("/Tache")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlTache {

	@Autowired
	Tache_repository tache_repository;
	
	@Autowired
	Historique_repository historiqueRepository;
	
	@Autowired
	User_entityRepository userRepository;

	@Autowired
	WebSocketController socketCtrlr;
	
	@GetMapping("/list")
	public List<Tache> findAll() {
		return tache_repository.findAll();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Tache> getTacheById(@PathVariable("id") Long id){
		Tache tache = tache_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(tache);
	}
	
	@PostMapping("/save")
	public Tache create(@RequestBody Tache tache) throws JsonParseException,JsonMappingException,IOException {
		tache.setRang(tache_repository.count() + 1);
		Tache task = tache_repository.save(tache);
		Historique historique = new Historique();
		historique.setHistorique(" a crée la tache "+tache.getNom()+" id = "+tache.getIdTache());
		historique.setIdCreateur(tache.getIdRapporteur());
		historique.setProjet(tache.getProjet());
		historiqueRepository.save(historique);
		socketCtrlr.onReceiveMessage("tache");
		return task;
	}
	
	@PutMapping("/savePosition")
	public ResponseEntity<List<Tache>> savePosition(@RequestBody List<Tache> tache) throws JsonParseException,JsonMappingException,IOException {
		List<Tache> fin = new ArrayList<Tache>();
		int i = 1;
		for(Tache task: tache) {
			Tache tache2 = tache_repository.findById(task.getIdTache()).orElseThrow(() -> new RessourceNotFoundException("not exist with id : " + task.getIdTache()));
			tache2.setRang(i);
			i++;
			Tache tache3 = tache_repository.save(tache2);
			fin.add(tache3);
		}
		return ResponseEntity.ok(fin);
	}
	
	@PutMapping("/update/{id}/{userID}")
	public ResponseEntity<Tache> update(@PathVariable("id") long id,@RequestBody Tache tacheDetails,@PathVariable("userID") String userID) {
		Tache tache = tache_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));		

		Historique historique = new Historique();
		historique.setIdCreateur(user);
		historique.setProjet(tache.getProjet());
		
		if(!tache.getNom().equalsIgnoreCase(tacheDetails.getNom())) {
			historique.setHistorique(" a modifié le nom du tache de "+tache.getNom()+" à "+tacheDetails.getNom());
			historiqueRepository.save(historique);
		}
		if(tache.getDescription() == null && tacheDetails.getDescription() != null) {
			historique.setHistorique(" a ajouté une description sur la tache "+tache.getNom()+" -> "+tacheDetails.getDescription());
			historiqueRepository.save(historique);
		} else if(tache.getDescription() != null && tacheDetails.getDescription() != null && !tache.getDescription().equalsIgnoreCase(tacheDetails.getDescription())) {
			historique.setHistorique(" a modifié la description du tache de "+tache.getDescription()+" à "+tacheDetails.getDescription());
			historiqueRepository.save(historique);
		}
		if(tache.getEtat().equalsIgnoreCase(tacheDetails.getEtat()) == false) {
			historique.setHistorique(" a modifié l'état du tache de "+tache.getEtat()+" à "+tacheDetails.getEtat());
			historiqueRepository.save(historique);
		}
		if(tache.getDateDebut() == null && tacheDetails.getDateDebut() != null) {
			historique.setHistorique(" a ajouté une date Debut sur la tache "+tache.getNom()+" -> "+tacheDetails.getDateDebut());
			historiqueRepository.save(historique);
		} else if(tache.getDateDebut() != null && tacheDetails.getDateDebut() != null && tache.getDateDebut().equals(tacheDetails.getDateDebut()) == false) {
			historique.setHistorique(" a modifié la date début du tache de "+tache.getDateDebut()+" à "+tacheDetails.getDateDebut());
			historiqueRepository.save(historique);
		}
		if(tache.getDateFin() == null && tacheDetails.getDateFin() != null) {
			historique.setHistorique(" a ajouté une date d'échéance sur la tache "+tache.getNom()+" -> "+tacheDetails.getDateFin());
			historiqueRepository.save(historique);
		} else if(tache.getDateFin() != null && tacheDetails.getDateFin() != null && tache.getDateFin().equals(tacheDetails.getDateFin()) == false ) {
			historique.setHistorique(" a modifié la date fin du tache de "+tache.getDateFin()+" à "+tacheDetails.getDateFin());
			historiqueRepository.save(historique);
		}
		if(tache.getCouleur() == null && tacheDetails.getCouleur() != null) {
			historique.setHistorique(" a ajouté une code couleur sur la tache "+tache.getNom()+" -> "+tacheDetails.getCouleur());
			historiqueRepository.save(historique);
		} else if(tache.getCouleur() != null && tacheDetails.getCouleur() != null && !tache.getCouleur().equalsIgnoreCase(tacheDetails.getCouleur())) {
			historique.setHistorique(" a modifié la couleur du tache "+tache.getNom()+" de "+tache.getCouleur()+" à "+tacheDetails.getCouleur());
			historiqueRepository.save(historique);
		}
		if(tache.getIdResponsable() == null && tacheDetails.getIdResponsable() != null) {
			historique.setHistorique(" a ajouté un(e) responsable sur la tâche "+tache.getNom()+" à "+tacheDetails.getIdResponsable().getUsername());
			historiqueRepository.save(historique);
		} else if(tache.getIdResponsable() != null && tacheDetails.getIdResponsable() != null && !tache.getIdRapporteur().getId().equalsIgnoreCase(tacheDetails.getIdRapporteur().getId())) {
			historique.setHistorique(" a modifié la responsable du tache "+tache.getNom()+" de "+tache.getIdResponsable().getUsername()+" à "+tacheDetails.getIdResponsable().getUsername());
			historiqueRepository.save(historique);
		}
		if(tache.getAvance() != tacheDetails.getAvance()) {
			historique.setHistorique(" a mis à jour l'avançé du tache "+tacheDetails.getNom()+" à "+tacheDetails.getAvance());
			historiqueRepository.save(historique);
		}
		
		int isTermine = 0;
		if(tacheDetails.getEtat().equalsIgnoreCase("Terminé")) isTermine = 1;
		
		
		if(isTermine == 1 && tacheDetails.getTermine() == null) { tacheDetails.setTermine(LocalDateTime.now()); }
		else if(isTermine == 0 && tacheDetails.getTermine() != null) { tacheDetails.setTermine(null); }
		
		tache.setNom(tacheDetails.getNom());
		tache.setDescription(tacheDetails.getDescription());
		tache.setEtat(tacheDetails.getEtat());
		tache.setDateDebut(tacheDetails.getDateDebut());
		tache.setDateFin(tacheDetails.getDateFin());
		tache.setCouleur(tacheDetails.getCouleur());
		tache.setIdRapporteur(tacheDetails.getIdRapporteur());
		tache.setIdResponsable(tacheDetails.getIdResponsable());
		tache.setRang(tacheDetails.getRang());
		tache.setAvance(tacheDetails.getAvance());
		tache.setTermine(tacheDetails.getTermine());
		
		Tache tacheUpdated = tache_repository.save(tache);
		socketCtrlr.onReceiveMessage("tache");
		return ResponseEntity.ok(tacheUpdated);
	}
	
	@DeleteMapping("/delete/{id}/{userID}")
	public ResponseEntity<Map<String, Boolean>> deleteTache(@PathVariable Long id,@PathVariable("userID") String userID){
		Tache tache = tache_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));		

		Historique historique = new Historique();
		historique.setHistorique(" a supprimé le tache "+tache.getNom());
		historique.setIdCreateur(user);
		historique.setProjet(tache.getProjet());
		historiqueRepository.save(historique);
		
		tache_repository.delete(tache);
		socketCtrlr.onReceiveMessage("tache");
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/projetID/{id}")
	public ResponseEntity<Tache[]> getTacheByProjet(@PathVariable("id") Long id){
		Tache[]taches = tache_repository.findByProjetIdProjetOrderByRangAsc(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/responsableID/{id}")
	public ResponseEntity<Tache[]> getTacheByResponsable(@PathVariable("id") String id){
		Tache[]taches = tache_repository.findByIdResponsableId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/rapporteurID/{id}")
	public ResponseEntity<Tache[]> getTacheByRapporteur(@PathVariable("id") String id){
		Tache[]taches = tache_repository.findByIdRapporteurId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/fonctionnaliteID/{id}")
	public ResponseEntity<Tache[]> getTacheByFonctionnalite(@PathVariable("id") Long id){
		Tache[]taches = tache_repository.findByFonctionnaliteId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/fonctionnaliteBacklogID/{id}")
	public ResponseEntity<Tache[]> getTacheByFonctionnaliteBacklog(@PathVariable("id") Long id){
		Tache[]taches = tache_repository.findByFonctionnaliteBacklogId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/nom/{nom}")
	public ResponseEntity<List<Tache>> getTacheByNom(@PathVariable("nom") String nom){
		List<Tache> taches = tache_repository.findByNom(nom);
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/etat/{etat}")
	public ResponseEntity<List<Tache>> getTacheByEtat(@PathVariable("etat") String etat){
		List<Tache> taches = tache_repository.findByEtat(etat);
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/countTacheResp/{user}/{etat}")
	public long getTacheResponsable(@PathVariable("user") String user,@PathVariable("etat") String etat) {
		return tache_repository.countTachesByIdResponsableIdAndEtat(user,etat);
	}
	
	@GetMapping("/findAllByOrderByDateDebut/{order}")
	public ResponseEntity<List<Tache>> findAllByOrderByDateDebut(@PathVariable("order") String order) {
		List<Tache> taches = new ArrayList<Tache>();
		if(order.equalsIgnoreCase("asc")) {
			taches = tache_repository.findAllByOrderByDateDebutAsc();
		} else if(order.equalsIgnoreCase("desc")){
			taches = tache_repository.findAllByOrderByDateDebutDesc();
		}
		return  ResponseEntity.ok(taches);
	}
}
