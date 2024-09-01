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
import com.main.model.Backlog;
import com.main.model.Historique;
import com.main.model.Notification;
import com.main.model.Projet;
import com.main.model.User_entity;
import com.main.repository.BacklogRepository;
import com.main.repository.Historique_repository;
import com.main.repository.Notification_repository;
import com.main.repository.Projet_repository;
import com.main.repository.ResponsableProjetRepository;
import com.main.repository.User_entityRepository;

@RestController
@RequestMapping("/Backlog")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlBacklog {
	
	@Autowired
	BacklogRepository backlogRepository;
	@Autowired
	Historique_repository historiqueRepository;
	@Autowired
	Projet_repository projetRepository;
	@Autowired
	User_entityRepository userRepository;
	@Autowired
	ResponsableProjetRepository respRepository;
	@Autowired
	Notification_repository notifRepository;
	@Autowired
	WebSocketController socketCtrlr;
	
	@GetMapping("/list")
	public List<Backlog> findAll() {
		return backlogRepository.findAll();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Backlog> getBacklogById(@PathVariable("id") Long id){
		Backlog backlog = backlogRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(backlog);
	}
	
	@PostMapping("/save/{userID}")
	public Backlog create(@RequestBody Backlog backlog,@PathVariable("userID") String userID) throws JsonParseException,JsonMappingException,IOException {
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		Backlog backlogFinal = backlogRepository.save(backlog);
		Historique historique = new Historique();
		Notification notification = new Notification();
		
		if(backlog.getNom() != null) {
			
			historique.setHistorique(" a crée le backlog "+backlog.getNom());
			historique.setIdCreateur(user);
			historique.setProjet(backlog.getProjet());
			historiqueRepository.save(historique);
			
			Projet project = projetRepository.findById(backlog.getProjet().getIdProjet()).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
			User_entity projetCreator = project.getIdCreateur();
			if(!projetCreator.getId().equalsIgnoreCase(backlog.getIdCreateur().getId())) {
				notification.setDestinataire(projetCreator);
				notification.setExpediteur(backlog.getIdCreateur());
				notification.setIsread(false);
				notification.setNotification(" a crée le backlog "+backlog.getNom()+" dans le projet "+backlog.getProjet().getNom()+" que vous avez créé.");
				notification.setTemp(LocalDateTime.now());
				notification.setBacklog(backlog);
				notifRepository.save(notification);
			}
				
		}
		socketCtrlr.onReceiveMessage("backlog");
		return backlogFinal;
	}
	
	@PutMapping("/savePosition")
	public ResponseEntity<List<Backlog>> savePosition(@RequestBody List<Backlog> backlog) throws JsonParseException,JsonMappingException,IOException {
		List<Backlog> fin = new ArrayList<Backlog>();
		int i = 1;
		for(Backlog bcklg: backlog) {
			Backlog bcklg2 = backlogRepository.findById(bcklg.getId()).orElseThrow(() -> new RessourceNotFoundException("not exist with id : " + bcklg.getId()));
			bcklg2.setPosition(i);
			i++;
			Backlog bcklg3 = backlogRepository.save(bcklg2);
			fin.add(bcklg3);
		}
		return ResponseEntity.ok(fin);
	}
	
	@PutMapping("/update/{id}/{userID}")
	public ResponseEntity<Backlog> update(@PathVariable("id") long id,@RequestBody Backlog backlogNew,@PathVariable("userID") String userID){
		
		Backlog backlog = backlogRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));	

		Historique historique = new Historique();
		historique.setIdCreateur(user);
		historique.setProjet(backlogNew.getProjet());
		
		if(backlog.getNom() != null && backlogNew.getNom() != null && backlog.getNom() != backlogNew.getNom()) {
			historique.setHistorique(" a changé le nom du backlog "+backlog.getNom()+" à "+backlogNew.getNom());
			historiqueRepository.save(historique);
		}
		if(backlog.getDescription() == null && backlogNew.getDescription() != null) {
			historique.setHistorique(" a ajouté une déscription sur le backlog "+backlog.getNom()+" --> "+backlogNew.getDescription());
			historiqueRepository.save(historique);
		} else if(backlog.getDescription() != null && backlogNew.getDescription() != null && !backlog.getDescription().equalsIgnoreCase(backlogNew.getDescription())) {
			historique.setHistorique(" a changé la da description du backlog "+backlogNew.getNom()+" de "+backlog.getDescription()+" à "+backlogNew.getDescription());
			historiqueRepository.save(historique);
		}
		if(backlog.getDateDebut() == null && backlogNew.getDateDebut() != null) {
			historique.setHistorique(" a ajouté une date début sur le backlog "+backlogNew.getNom()+" à "+backlogNew.getDateDebut());
			historiqueRepository.save(historique);
		} else if(backlog.getDateDebut() != null && backlogNew.getDateDebut() != null && !backlog.getDateDebut().isEqual(backlogNew.getDateDebut())) {
			historique.setHistorique(" a modifié la date début sur le backlog "+backlogNew.getNom()+" de "+backlog.getDateDebut()+" à "+backlogNew.getDateDebut());
			historiqueRepository.save(historique);
		}
		if(backlog.getDateFin() == null && backlogNew.getDateFin() != null) {
			historique.setHistorique(" a ajouté une date fin sur le backlog "+backlogNew.getNom()+" à "+backlogNew.getDateFin());
			historiqueRepository.save(historique);
		} else if(backlog.getDateFin() != null && backlogNew.getDateFin() != null && backlog.getDateFin().isEqual(backlogNew.getDateFin())) {
			historique.setHistorique(" a modifié la date fin sur le backlog "+backlogNew.getNom()+" de "+backlog.getDateFin()+" à "+backlogNew.getDateFin());
			historiqueRepository.save(historique);
		}
		if(backlog.getTermine() == null && backlogNew.getTermine() != null) {
			historique.setHistorique(" a terminé le backlog "+backlogNew.getNom()+" à "+backlog.getTermine());
			historiqueRepository.save(historique);
		} else if(backlog.getTermine() != null && backlogNew.getTermine() == null) {
			historique.setHistorique(" a rouvert le backlog "+backlogNew.getNom()+".");
			historiqueRepository.save(historique);
		}
		
		int isTermine = 0;
		if(backlogNew.getEtat().equalsIgnoreCase("Terminé")) isTermine = 1;
		
		if(isTermine == 1 && backlogNew.getTermine() == null) { backlogNew.setTermine(LocalDateTime.now()); }
		else if(isTermine == 0 && backlogNew.getTermine() != null) { backlogNew.setTermine(null); }
		
		backlog.setNom(backlogNew.getNom());
		backlog.setDescription(backlogNew.getDescription());
		backlog.setDateDebut(backlogNew.getDateDebut());
		backlog.setDateFin(backlogNew.getDateFin());
		backlog.setSprint(backlogNew.getSprint());
		backlog.setProjet(backlogNew.getProjet());
		backlog.setIdCreateur(backlogNew.getIdCreateur());
		backlog.setPosition(backlogNew.getPosition());
		backlog.setEtat(backlogNew.getEtat());
		backlog.setTermine(backlogNew.getTermine());
		backlog.setAbbreviate(backlogNew.getAbbreviate());
		backlog.setPriorite(backlogNew.getPriorite());
		backlog.setStoryPoint(backlogNew.getStoryPoint());
		
		Backlog backlogFinal = backlogRepository.save(backlog);
		socketCtrlr.onReceiveMessage("backlog");
		return ResponseEntity.ok(backlogFinal);
	}
	
	@DeleteMapping("/delete/{id}/{userID}")
	public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id,@PathVariable("userID") String userID){
		Backlog backlog = backlogRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));	
		
		Historique historique = new Historique();
		historique.setHistorique(" a supprimé le backlog "+backlog.getNom());
		historique.setIdCreateur(user);
		historique.setProjet(backlog.getProjet());
		historiqueRepository.save(historique);
		
		backlogRepository.delete(backlog);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		socketCtrlr.onReceiveMessage("backlog");
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/projetID/{id}")
	public ResponseEntity<Backlog[]> getBacklogByIdProjet(@PathVariable("id") long id){
		Backlog[]backlogs = backlogRepository.findByProjetIdProjetOrderByPositionAsc(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(backlogs);
	}
	
	@GetMapping("/sprintID/{id}")
	public ResponseEntity<Backlog[]> getBacklogByIdSprint(@PathVariable("id") long id){
		Backlog[]backlogs = backlogRepository.findBySprintIdSprint(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(backlogs);
	}
	
	@GetMapping("/backlogFinished/{idProjet}")
	public long[] getBacklogFinished(@PathVariable("idProjet") long idProjet) {
		long[]ans = new long[2];
		ans[0] = backlogRepository.countByEtatNotAndProjetIdProjet("Terminé",idProjet);
		ans[1] = backlogRepository.countByProjetIdProjet(idProjet);
		return ans;
	}
		
}
