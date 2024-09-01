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
import com.main.model.Backlog;
import com.main.model.Commentaire;
import com.main.model.Fonctionnalite;
import com.main.model.Historique;
import com.main.model.Notification;
import com.main.model.Projet;
import com.main.model.ResponsableProjet;
import com.main.model.Tache;
import com.main.model.User_entity;
import com.main.repository.BacklogRepository;
import com.main.repository.Commentaire_repository;
import com.main.repository.FonctionnaliteRepository;
import com.main.repository.Historique_repository;
import com.main.repository.Notification_repository;
import com.main.repository.Projet_repository;
import com.main.repository.ResponsableProjetRepository;
import com.main.repository.Tache_repository;
import com.main.repository.User_entityRepository;

@RestController
@RequestMapping("/Commentaire")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlCommentaire {
	
	@Autowired
	Commentaire_repository commentaire_repository;
	
	@Autowired
	Historique_repository historiqueRepository;
	
	@Autowired
	User_entityRepository userRepository;
	
	@Autowired
	ResponsableProjetRepository respRepository;
	
	@Autowired
	Notification_repository notifRepository;

	@Autowired
	Projet_repository projetRepository;

	@Autowired
	BacklogRepository backlogRepository;

	@Autowired
	FonctionnaliteRepository fonctionnaliteRepository;
	
	@Autowired
	Tache_repository tacheRepository;
	
	@Autowired
	WebSocketController socketCtrlr;
	
	@GetMapping("/list")
	public List<Commentaire> findAll() {
		return commentaire_repository.findByOrderByTempAsc();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Commentaire> getCommentaireById(@PathVariable("id") Long id){
		Commentaire commentaire = commentaire_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(commentaire);
	}
	
	@PostMapping("/save/{userID}")
	public Commentaire create(@RequestBody Commentaire commentaire,@PathVariable("userID") String userID) throws JsonParseException,JsonMappingException,IOException {
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		commentaire.setTemp(LocalDateTime.now());
		Commentaire com = commentaire_repository.save(commentaire);
		Historique historique = new Historique();
		Notification notification = new Notification();
		if(commentaire.getProjet() != null) {
			Projet pro = projetRepository.findById(commentaire.getProjet().getIdProjet()).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + commentaire.getProjet().getIdProjet()));

			if(!pro.getIdCreateur().getId().equalsIgnoreCase(user.getId())) {
				
				Notification prim = new Notification();
				prim.setExpediteur(user);
				prim.setDestinataire(pro.getIdCreateur());
				prim.setIsread(false);
				prim.setCommentaire(com);
				if(commentaire.isFile()) {
					prim.setNotification(" a laissé une piece jointe dans le projet " +commentaire.getProjet().getNom()+" que vous avez créé.");
				} else prim.setNotification(" a commenté le projet " +commentaire.getProjet().getNom()+" que vous avez créé.");
				prim.setTemp(LocalDateTime.now());
				if(prim.getNotification() != null) { notifRepository.save(prim); socketCtrlr.onReceiveMessage(prim.getDestinataire().getId());}
			}
			
			historique.setHistorique(" a commenté le projet");
			ResponsableProjet[]responsables = respRepository.findByProjetIdProjet(commentaire.getProjet().getIdProjet()).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : "));
			User_entity[]users = new User_entity[responsables.length];
			int i = 0;
			for(ResponsableProjet resp: responsables) {
				if(resp.getIdProductOwner() != null || resp.getIdScrumMaster() != null || resp.getIdDevellopers() != null || resp.getIdResponsable() != null) {
					if(resp.getProjet().getIdProjet() == commentaire.getProjet().getIdProjet()) {
						if(resp.getIdProductOwner() != null) users[i] = resp.getIdProductOwner();
						if(resp.getIdScrumMaster() != null) users[i] = resp.getIdScrumMaster();
						if(resp.getIdDevellopers() != null) users[i] = resp.getIdDevellopers();
						if(resp.getIdResponsable() != null) users[i] = resp.getIdResponsable();
						i++;
					}
				}
			}
			for(User_entity usr:users) {
				if(usr == null) {
					break;
				} else {
					if(!usr.getId().equalsIgnoreCase(user.getId())) {
						notification.setExpediteur(user);
						notification.setDestinataire(usr);
						notification.setIsread(false);
						notification.setCommentaire(com);
						if(commentaire.isFile()) {
							notification.setNotification(" a laissé une pièce jointe dans le projet " +commentaire.getProjet().getNom());
						} else notification.setNotification(" a commenté le projet " +commentaire.getProjet().getNom());
						notification.setTemp(LocalDateTime.now());
						if(notification.getNotification() != null) { notifRepository.save(notification); socketCtrlr.onReceiveMessage(notification.getDestinataire().getId());}
						notification = new Notification();
					}
				}
			}
		} else if (commentaire.getTache() != null) {
			Tache ta = tacheRepository.findById(commentaire.getTache().getIdTache()).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + commentaire.getProjet().getIdProjet()));
			if(!ta.getIdRapporteur().getId().equalsIgnoreCase(user.getId())) {
				Notification prim = new Notification();
				prim.setExpediteur(user);
				prim.setDestinataire(ta.getIdRapporteur());
				prim.setIsread(false);
				prim.setCommentaire(com);
				if(commentaire.isFile()) {
					prim.setNotification(" a laissé une pièce jointe dans la tache " +commentaire.getTache().getNom()+" que vous avez créé.");
				} else prim.setNotification(" a commenté la tache " +commentaire.getTache().getNom()+" que vous avez créé.");
				prim.setTemp(LocalDateTime.now());
				if(prim.getNotification() != null) { notifRepository.save(prim); socketCtrlr.onReceiveMessage(prim.getDestinataire().getId());}
			}
			
			historique.setHistorique(" a commenté la tache "+commentaire.getTache().getNom());
			ResponsableProjet[]responsables = respRepository.findByTacheIdTache(commentaire.getTache().getIdTache()).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : "));
			User_entity[]users = new User_entity[responsables.length];
			int i = 0;
			for(ResponsableProjet resp: responsables) {
				if(resp.getIdProductOwner() != null || resp.getIdScrumMaster() != null || resp.getIdDevellopers() != null || resp.getIdResponsable() != null) {
					if(resp.getTache().getIdTache() == commentaire.getTache().getIdTache()) {
						if(resp.getIdProductOwner() != null) users[i] = resp.getIdProductOwner();
						if(resp.getIdScrumMaster() != null) users[i] = resp.getIdScrumMaster();
						if(resp.getIdDevellopers() != null) users[i] = resp.getIdDevellopers();
						if(resp.getIdResponsable() != null) users[i] = resp.getIdResponsable();
						i++;
					}
				}
			}
			for(User_entity usr:users) {
				if(usr == null) {
					break;
				} else {
					if(!usr.getId().equalsIgnoreCase(user.getId())) {
						notification.setExpediteur(user);
						notification.setDestinataire(usr);
						notification.setIsread(false);
						notification.setCommentaire(com);
						if(commentaire.isFile()) {
							notification.setNotification(" a laissé une pièce jointe dans la tache " +commentaire.getTache().getNom());
						} else notification.setNotification(" a commenté la tache " +commentaire.getTache().getNom());
						notification.setTemp(LocalDateTime.now());
						if(notification.getNotification() != null) { notifRepository.save(notification); socketCtrlr.onReceiveMessage(notification.getDestinataire().getId());}
						notification = new Notification();
					}
				}
			}
		} else if(commentaire.getBacklog() != null) {
			Backlog ba = backlogRepository.findById(commentaire.getBacklog().getId()).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + commentaire.getProjet().getIdProjet()));
			if(!ba.getIdCreateur().getId().equalsIgnoreCase(user.getId())) {
				Notification prim = new Notification();
				prim.setExpediteur(user);
				prim.setDestinataire(ba.getIdCreateur());
				prim.setIsread(false);
				prim.setCommentaire(com);
				if(commentaire.isFile()) {
					prim.setNotification(" a laissé une pièce jointe dans le backlog " +commentaire.getBacklog().getNom()+" que vous avez créé.");
				} else prim.setNotification(" a commenté le backlog " +commentaire.getBacklog().getNom()+" que vous avez créé.");
				prim.setTemp(LocalDateTime.now());
				if(prim.getNotification() != null) { notifRepository.save(prim); socketCtrlr.onReceiveMessage(prim.getDestinataire().getId());}
			}
			
			historique.setHistorique(" a commenté le backlog "+commentaire.getBacklog().getNom());
			ResponsableProjet[]responsables = respRepository.findByBacklogId(commentaire.getBacklog().getId()).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : "));
			User_entity[]users = new User_entity[responsables.length];
			int i = 0;
			for(ResponsableProjet resp: responsables) {
				if(resp.getIdProductOwner() != null || resp.getIdScrumMaster() != null || resp.getIdDevellopers() != null || resp.getIdResponsable() != null) {
					if(resp.getBacklog().getId() == commentaire.getBacklog().getId()) {
						if(resp.getIdProductOwner() != null) users[i] = resp.getIdProductOwner();
						if(resp.getIdScrumMaster() != null) users[i] = resp.getIdScrumMaster();
						if(resp.getIdDevellopers() != null) users[i] = resp.getIdDevellopers();
						if(resp.getIdResponsable() != null) users[i] = resp.getIdResponsable();
						i++;
					}
				}
			}
			for(User_entity usr:users) {
				if(usr == null) {
					break;
				} else {
					if(!usr.getId().equalsIgnoreCase(user.getId())) {
						notification.setExpediteur(user);
						notification.setDestinataire(usr);
						notification.setIsread(false);
						notification.setCommentaire(com);
						if(commentaire.isFile()) {
							notification.setNotification(" a laissé une pièce jointe dans le backlog " +commentaire.getBacklog().getNom());
						} else notification.setNotification(" a commenté le backlog " +commentaire.getBacklog().getNom());
						notification.setTemp(LocalDateTime.now());
						if(notification.getNotification() != null) { notifRepository.save(notification); socketCtrlr.onReceiveMessage(notification.getDestinataire().getId());}
						notification = new Notification();
					}
				}
			}
		} else if(commentaire.getFonctionnalite() != null) {
			Fonctionnalite fo = fonctionnaliteRepository.findById(commentaire.getFonctionnalite().getId()).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + commentaire.getProjet().getIdProjet()));
			if(!fo.getIdCreateur().getId().equalsIgnoreCase(user.getId())) {
				Notification prim = new Notification();
				prim.setExpediteur(user);
				prim.setDestinataire(fo.getIdCreateur());
				prim.setIsread(false);
				prim.setCommentaire(com);
				if(commentaire.isFile()) {
					prim.setNotification(" a laissé une pièce jointe dans la fonctionnalite " +commentaire.getFonctionnalite().getNom()+" que vous avez créé.");
				} else prim.setNotification(" a commenté la fonctionnalite " +commentaire.getFonctionnalite().getNom()+" que vous avez créé.");
				prim.setTemp(LocalDateTime.now());
				if(prim.getNotification() != null) { notifRepository.save(prim); socketCtrlr.onReceiveMessage(prim.getDestinataire().getId());}
			}
			
			historique.setHistorique(" a commenté la fonctionnalite "+commentaire.getFonctionnalite().getNom());
			ResponsableProjet[]responsables = respRepository.findByFonctionnaliteId(commentaire.getFonctionnalite().getId()).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : "));
			User_entity[]users = new User_entity[responsables.length];
			int i = 0;
			for(ResponsableProjet resp: responsables) {
				if(resp.getIdProductOwner() != null || resp.getIdScrumMaster() != null || resp.getIdDevellopers() != null || resp.getIdResponsable() != null) {
					if(resp.getFonctionnalite().getId() == commentaire.getFonctionnalite().getId()) {
						if(resp.getIdProductOwner() != null) users[i] = resp.getIdProductOwner();
						if(resp.getIdScrumMaster() != null) users[i] = resp.getIdScrumMaster();
						if(resp.getIdDevellopers() != null) users[i] = resp.getIdDevellopers();
						if(resp.getIdResponsable() != null) users[i] = resp.getIdResponsable();
						i++;
					}
				}
			}
			for(User_entity usr:users) {
				if(usr == null) {
					break;
				} else {
					if(!usr.getId().equalsIgnoreCase(user.getId())) {
						notification.setExpediteur(user);
						notification.setDestinataire(usr);
						notification.setIsread(false);
						notification.setCommentaire(com);
						if(commentaire.isFile()) {
							notification.setNotification(" a laissé une pièce jointe dans la fonctionnalite " +commentaire.getFonctionnalite().getNom());
						} else notification.setNotification(" a commenté la fonctionnalite " +commentaire.getFonctionnalite().getNom());
						notification.setTemp(LocalDateTime.now());
						if(notification.getNotification() != null) { notifRepository.save(notification); socketCtrlr.onReceiveMessage(notification.getDestinataire().getId());}
						notification = new Notification();
					}
				}
			}
		}
		historique.setIdCreateur(user);
		historique.setProjet(commentaire.getProjet());
		if(!commentaire.isFile()) historiqueRepository.save(historique);
		return com;
	}
	
	@PutMapping("/update/{id}/{userID}")
	public ResponseEntity<Commentaire> update(@PathVariable("id") long id,@RequestBody Commentaire commentaireDetails,@PathVariable("userID") String userID) {
		Commentaire commentaire = commentaire_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		
		if(commentaire.getCommentaire().equalsIgnoreCase(commentaireDetails.getCommentaire())) {
			Historique historique = new Historique();
			historique.setHistorique(" a modifié le commentaire du projet de "+commentaire.getCommentaire()+" à "+commentaireDetails.getCommentaire());
			historique.setIdCreateur(user);
			historique.setProjet(commentaire.getProjet());
			historiqueRepository.save(historique);
		}
		
		commentaire.setCommentaire(commentaireDetails.getCommentaire());
		commentaire.setTemp(LocalDateTime.now());
		commentaire.setTache(commentaireDetails.getTache());
		commentaire.setCreateur(commentaireDetails.getCreateur());
		commentaire.setProjetID(commentaireDetails.getProjetID());
		
		Commentaire updatedCommentaire = commentaire_repository.save(commentaire);
		return ResponseEntity.ok(updatedCommentaire);
	}
	
	@DeleteMapping("/delete/{id}/{userID}")
	public ResponseEntity<Map<String, Boolean>> deleteTache(@PathVariable Long id,@PathVariable("userID") String userID){
		Commentaire commentaire = commentaire_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		Historique historique = new Historique();
		historique.setHistorique(" a supprimé le commentaire "+commentaire.getCommentaire());
		historique.setIdCreateur(user);
		historique.setProjet(commentaire.getProjet());
		historiqueRepository.save(historique);
		commentaire_repository.delete(commentaire);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/tacheID/{id}")
	public ResponseEntity<Commentaire[]> getTacheByIdTache(@PathVariable("id") Long id){
		Commentaire[]commentaires = commentaire_repository.findByTacheIdTache(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(commentaires);
	}
	
	@GetMapping("/backlogID/{id}")
	public ResponseEntity<Commentaire[]> getCommentaireByIdBacklog(@PathVariable("id") Long id){
		Commentaire[]commentaires = commentaire_repository.findByBacklogId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(commentaires);
	}
	
	@GetMapping("/fonctionnaliteID/{id}")
	public ResponseEntity<Commentaire[]> getCommentaireByIdFonctionnalite(@PathVariable("id") Long id){
		Commentaire[]commentaires = commentaire_repository.findByFonctionnaliteId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(commentaires);
	}
	
	@GetMapping("/createurID/{id}")
	public ResponseEntity<Commentaire[]> getCreateurById(@PathVariable("id") String id){
		Commentaire[]commentaires = commentaire_repository.findByCreateurId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(commentaires);
	}
	
	@GetMapping("/projetID/{id}")
	public ResponseEntity<Commentaire[]> getProjetById(@PathVariable("id") Long id){
		Commentaire[]commentaires = commentaire_repository.findByProjetIdProjetOrderByTempDesc(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(commentaires);
	}
}
