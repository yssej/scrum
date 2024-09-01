package com.main.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;

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
import com.main.model.Fonctionnalite;
import com.main.model.Historique;
import com.main.model.MailContent;
import com.main.model.Notification;
import com.main.model.Projet;
import com.main.model.ResponsableProjet;
import com.main.model.Tache;
import com.main.model.User_entity;
import com.main.repository.Historique_repository;
import com.main.repository.Notification_repository;
import com.main.repository.Projet_repository;
import com.main.repository.ResponsableProjetRepository;
import com.main.repository.User_entityRepository;
import com.main.service.EmailSenderService;

@RestController
@RequestMapping("/ResponsableProjet")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlResponsableProjet {
	
	@Autowired
	ResponsableProjetRepository respRepository;
	@Autowired
	Historique_repository historiqueRepository;
	@Autowired
	Projet_repository projetRepository;
	@Autowired
	User_entityRepository userRepository;
	@Autowired
	Notification_repository notifRepository;
	@Autowired
	EmailSenderService emailSenderService;
	
	@GetMapping("/list")
	public List<ResponsableProjet> findAll() {
		return respRepository.findAll();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<ResponsableProjet> getResponsableProjetById(@PathVariable("id") Long id){
		ResponsableProjet responsableProjet = respRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(responsableProjet);
	}
	
	@PostMapping("/save/{userID}")
	public ResponsableProjet create(@RequestBody ResponsableProjet responsableProjet,@PathVariable("userID") String userID) throws JsonParseException,JsonMappingException,IOException {
		ResponsableProjet responsable = respRepository.save(responsableProjet);
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		Historique historique = new Historique();
		historique.setIdCreateur(user);
		historique.setProjet(responsableProjet.getProjet());
		
		Notification notification = new Notification();
		notification.setIsread(false);
		notification.setExpediteur(user);
		notification.setTemp(LocalDateTime.now());
		
		MailContent mail = new MailContent();
		if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() == null && responsableProjet.getFonctionnalite() == null) mail.setBody("Bonjour, veuillez consulter SCRUM car vous avez été assigné dans le projet "+responsableProjet.getProjet().getNom()+". Merci!");
		else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() != null && responsableProjet.getFonctionnalite() == null) mail.setBody("Bonjour, veuillez consulter SCRUM car vous avez été assigné dans le backlog "+responsableProjet.getBacklog().getNom()+". Merci!");
		else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() == null && responsableProjet.getFonctionnalite() != null) mail.setBody("Bonjour, veuillez consulter SCRUM car vous avez été assigné dans le fonctionnalité "+responsableProjet.getFonctionnalite().getNom()+". Merci!");
		
		if(responsableProjet.getIdDevellopers() != null && responsableProjet.getIdDevellopers().getEmail() != null) mail.setDestinataire(responsableProjet.getIdDevellopers().getEmail());
		else if(responsableProjet.getIdScrumMaster() != null && responsableProjet.getIdScrumMaster().getEmail() != null) mail.setDestinataire(responsableProjet.getIdScrumMaster().getEmail());
		else if(responsableProjet.getIdProductOwner() != null && responsableProjet.getIdProductOwner().getEmail() != null) mail.setDestinataire(responsableProjet.getIdProductOwner().getEmail());
		else if(responsableProjet.getIdResponsable() != null && responsableProjet.getIdResponsable().getEmail() != null) mail.setDestinataire(responsableProjet.getIdResponsable().getEmail());
		mail.setObject("SCRUM assignation");
        mail.setRoot(null);
        
        if(mail.getDestinataire() != null) {
        	try {
            	emailSenderService.sendMailWithAttachement(user.getEmail(),mail.getDestinataire(),mail.getBody(),mail.getObject(),mail.getRoot());
            } catch (MessagingException e) {
    			// TODO Auto-generated catch block
    			e.printStackTrace();
    		}
        }
		
		if(responsableProjet.getIdResponsable() != null) {
			
			notification.setDestinataire(responsableProjet.getIdResponsable());
			if(responsableProjet.getTache() != null) {
				notification.setNotification(" vous a assigné comme responsable du tache "+responsableProjet.getTache().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");
				notification.setTache(responsableProjet.getTache());
				historique.setHistorique(" a ajouté "+responsableProjet.getIdResponsable().getUsername()+" comme responsable du tache "+responsableProjet.getTache().getNom()+".");
			} else if(responsableProjet.getFonctionnalite() != null) {
				notification.setNotification(" vous a assigné comme responsable du fonctionnalité "+responsableProjet.getFonctionnalite().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");
				notification.setFonctionnalite(responsableProjet.getFonctionnalite());
				historique.setHistorique(" a ajouté "+responsableProjet.getIdResponsable().getUsername()+" comme responsable du fonctionnalité "+responsableProjet.getFonctionnalite().getNom()+".");
			} else if(responsableProjet.getBacklog() != null) {
				notification.setNotification(" vous a assigné comme responsable du Backlog "+responsableProjet.getBacklog().getNom()+
						" dans le projet "+responsableProjet.getProjet().getNom()+".");
				notification.setBacklog(responsableProjet.getBacklog());
				historique.setHistorique(" a ajouté "+responsableProjet.getIdResponsable().getUsername()+" comme responsable du backlog "+responsableProjet.getBacklog().getNom()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() == null && responsableProjet.getFonctionnalite() == null && responsableProjet.getTache() == null) {
				notification.setNotification(" vous a assigné comme responsable du projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdResponsable().getUsername()+" comme responsable du projet "+responsableProjet.getProjet().getNom()+".");
				notification.setProjet(responsableProjet.getProjet());
			}
				
		}
		if(responsableProjet.getIdProductOwner() != null) {
			
			notification.setDestinataire(responsableProjet.getIdProductOwner());
			if(responsableProjet.getTache() != null) {
				notification.setTache(responsableProjet.getTache());
				notification.setNotification(" vous a assigné comme product owner du tache "+responsableProjet.getTache().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");historique.setHistorique(" a ajouté "+responsableProjet.getIdProductOwner().getUsername()+" comme product owner du tache "+responsableProjet.getTache().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdProductOwner().getUsername()+" comme product owner du tache "+responsableProjet.getTache().getNom()+".");
			} else if(responsableProjet.getFonctionnalite() != null) {
				notification.setFonctionnalite(responsableProjet.getFonctionnalite());
				notification.setNotification(" vous a assigné comme product owner du fonctionnalité "+responsableProjet.getFonctionnalite().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");historique.setHistorique(" a ajouté "+responsableProjet.getIdProductOwner().getUsername()+" comme product owner du tache "+responsableProjet.getTache().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdProductOwner().getUsername()+" comme product owner du fonctionnalite "+responsableProjet.getFonctionnalite().getNom()+".");
			} else if(responsableProjet.getBacklog() != null) {
				notification.setBacklog(responsableProjet.getBacklog());
				notification.setNotification(" vous a assigné comme product owner du Backlog "+responsableProjet.getBacklog().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdProductOwner().getUsername()+" comme product owner du backlog "+responsableProjet.getBacklog().getNom()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() == null && responsableProjet.getFonctionnalite() == null && responsableProjet.getTache() == null) {
				notification.setProjet(responsableProjet.getProjet());
				notification.setNotification(" vous a assigné comme product owner du projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdProductOwner().getUsername()+" comme product owner du projet "+responsableProjet.getProjet().getNom()+".");
			}
		}
		if(responsableProjet.getIdScrumMaster() != null) {
			
			notification.setDestinataire(responsableProjet.getIdScrumMaster());
			if(responsableProjet.getTache() != null) {
				notification.setTache(responsableProjet.getTache());
				notification.setNotification(" vous a assigné comme scrum master du tache "+responsableProjet.getTache().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdScrumMaster().getUsername()+" comme scrum master du tache "+responsableProjet.getTache().getNom()+".");
			} else if(responsableProjet.getBacklog() != null && responsableProjet.getFonctionnalite() != null && responsableProjet.getTache() == null) {
				notification.setFonctionnalite(responsableProjet.getFonctionnalite());
				notification.setNotification(" vous a assigné comme scrum master du fonctionnalité "+responsableProjet.getFonctionnalite().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdScrumMaster().getUsername()+" comme scrum master du fonctionnalite "+responsableProjet.getFonctionnalite().getNom()+".");
			} else if(responsableProjet.getBacklog() != null) {
				notification.setBacklog(responsableProjet.getBacklog());
				notification.setNotification(" vous a assigné comme scrum master du Backlog "+responsableProjet.getBacklog().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdScrumMaster().getUsername()+" comme scrum master du bcklog "+responsableProjet.getBacklog().getNom()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() == null && responsableProjet.getFonctionnalite() == null && responsableProjet.getTache() == null) {
				notification.setProjet(responsableProjet.getProjet());
				notification.setNotification(" vous a assigné comme scrum master du projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdScrumMaster().getUsername()+" comme scrum master du projet "+responsableProjet.getProjet().getNom()+".");
			}
		}
		if(responsableProjet.getIdDevellopers() != null) {
			
			notification.setDestinataire(responsableProjet.getIdDevellopers());
			if(responsableProjet.getTache() != null) {
				notification.setTache(responsableProjet.getTache());
				notification.setNotification(" vous a assigné comme dévellopeur du tache "+responsableProjet.getTache().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdDevellopers().getUsername()+" comme devellopeur du tache "+responsableProjet.getTache().getNom()+".");
			} else if(responsableProjet.getFonctionnalite() != null) {
				notification.setFonctionnalite(responsableProjet.getFonctionnalite());
				notification.setNotification(" vous a assigné comme dévellopeur du fonctionnalité "+responsableProjet.getFonctionnalite().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdDevellopers().getUsername()+" comme devellopeur du fonctionnalite "+responsableProjet.getFonctionnalite().getNom()+".");
			} else if(responsableProjet.getBacklog() != null) {
				notification.setBacklog(responsableProjet.getBacklog());
				notification.setNotification(" vous a assigné comme dévellopeur du Backlog "+responsableProjet.getBacklog().getNom()+" dans le projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdDevellopers().getUsername()+" comme devellopeur du backlog "+responsableProjet.getBacklog().getNom()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() == null && responsableProjet.getFonctionnalite() == null && responsableProjet.getTache() == null) {
				notification.setProjet(responsableProjet.getProjet());
				notification.setNotification(" vous a assigné comme dévellopeur du projet "+responsableProjet.getProjet().getNom()+".");
				historique.setHistorique(" a ajouté "+responsableProjet.getIdDevellopers().getUsername()+" comme devellopeur du projet "+responsableProjet.getProjet().getNom()+".");
			}
		}
		if(notification.getNotification() != null) notifRepository.save(notification);
		if(historique.getHistorique() != null) historiqueRepository.save(historique);
		return responsable;
	}
	
	@PutMapping("/update/{id}/{userID}")
	public ResponseEntity<ResponsableProjet> update(@PathVariable("id") long id,@RequestBody ResponsableProjet responsableProjet,@PathVariable("userID") String userID){
		
		ResponsableProjet projet = respRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));	

		Historique historique = new Historique();
		historique.setIdCreateur(user);
		historique.setProjet(projet.getProjet());
		
		Notification notification = new Notification();
		notification.setIsread(false);
		notification.setExpediteur(user);
		notification.setTemp(LocalDateTime.now());
		
		if(projet.getIdResponsable().getId() != responsableProjet.getIdResponsable().getId()) {
			historique.setHistorique(" a changé le responsable du projet de "+projet.getIdResponsable().getUsername()+" à "+responsableProjet.getIdResponsable().getUsername());

			notification.setDestinataire(responsableProjet.getIdResponsable());
			if(responsableProjet.getFonctionnalite() != null && responsableProjet.getTache() != null) {
				notification.setTache(responsableProjet.getTache());
				notification.setNotification(" vous a assigné comme responsable du tache "+responsableProjet.getTache().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getBacklog() != null && responsableProjet.getFonctionnalite() != null && responsableProjet.getTache() == null) {
				notification.setFonctionnalite(responsableProjet.getFonctionnalite());
				notification.setNotification(" vous a assigné comme responsable du fonctionnalité "+responsableProjet.getFonctionnalite().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() != null && responsableProjet.getFonctionnalite() == null) {
				notification.setBacklog(responsableProjet.getBacklog());
				notification.setNotification(" vous a assigné comme responsable du Backlog "+responsableProjet.getBacklog().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() == null) {
				notification.setProjet(responsableProjet.getProjet());
				notification.setNotification(" vous a assigné comme responsable du projet "+responsableProjet.getProjet().getNom()+".");
			}
		}
		if(projet.getIdScrumMaster().getId() != responsableProjet.getIdScrumMaster().getId()) {
			historique.setHistorique(" a changé le scrum master du projet de "+projet.getIdResponsable().getUsername()+" à "+responsableProjet.getIdResponsable().getUsername());

			notification.setDestinataire(responsableProjet.getIdScrumMaster());
			if(responsableProjet.getFonctionnalite() != null && responsableProjet.getTache() != null) {
				notification.setTache(responsableProjet.getTache());
				notification.setNotification(" vous a assigné comme scrum master du tache "+responsableProjet.getTache().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getBacklog() != null && responsableProjet.getFonctionnalite() != null && responsableProjet.getTache() == null) {
				notification.setFonctionnalite(responsableProjet.getFonctionnalite());
				notification.setNotification(" vous a assigné comme scrum master du fonctionnalité "+responsableProjet.getFonctionnalite().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() != null && responsableProjet.getFonctionnalite() == null) {
				notification.setBacklog(responsableProjet.getBacklog());
				notification.setNotification(" vous a assigné comme scrum master du Backlog "+responsableProjet.getBacklog().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() == null) {
				notification.setProjet(responsableProjet.getProjet());
				notification.setNotification(" vous a assigné comme scrum master du projet "+responsableProjet.getProjet().getNom()+".");
			}
		}
		if(projet.getIdProductOwner().getId() != responsableProjet.getIdProductOwner().getId()) {
			historique.setHistorique(" a changé le product owner du projet de "+projet.getIdResponsable().getUsername()+" à "+responsableProjet.getIdResponsable().getUsername());

			notification.setDestinataire(responsableProjet.getIdProductOwner());
			if(responsableProjet.getFonctionnalite() != null && responsableProjet.getTache() != null) {
				notification.setTache(responsableProjet.getTache());
				notification.setNotification(" vous a assigné comme product owner du tache "+responsableProjet.getTache().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getBacklog() != null && responsableProjet.getFonctionnalite() != null && responsableProjet.getTache() == null) {
				notification.setFonctionnalite(responsableProjet.getFonctionnalite());
				notification.setNotification(" vous a assigné comme product owner du fonctionnalité "+responsableProjet.getFonctionnalite().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() != null && responsableProjet.getFonctionnalite() == null) {
				notification.setBacklog(responsableProjet.getBacklog());
				notification.setNotification(" vous a assigné comme product owner du Backlog "+responsableProjet.getBacklog().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() == null) {
				notification.setProjet(responsableProjet.getProjet());
				notification.setNotification(" vous a assigné comme product owner du projet "+responsableProjet.getProjet().getNom()+".");
			}
		}
		if(projet.getIdDevellopers().getId() != responsableProjet.getIdDevellopers().getId()) {
			historique.setHistorique(" a changé le devellopeur du projet de "+projet.getIdResponsable().getUsername()+" à "+responsableProjet.getIdResponsable().getUsername());
			
			notification.setDestinataire(responsableProjet.getIdDevellopers());
			if(responsableProjet.getFonctionnalite() != null && responsableProjet.getTache() != null) {
				notification.setTache(responsableProjet.getTache());
				notification.setNotification(" vous a assigné comme dévellopeur du tache "+responsableProjet.getTache().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getBacklog() != null && responsableProjet.getFonctionnalite() != null && responsableProjet.getTache() == null) {
				notification.setFonctionnalite(responsableProjet.getFonctionnalite());
				notification.setNotification(" vous a assigné comme dévellopeur du fonctionnalité "+responsableProjet.getFonctionnalite().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() != null && responsableProjet.getFonctionnalite() == null) {
				notification.setBacklog(responsableProjet.getBacklog());
				notification.setNotification(" vous a assigné comme dévellopeur du Backlog "+responsableProjet.getBacklog().getNom()+" dans le projet "+responsableProjet.getProjet()+".");
			} else if(responsableProjet.getProjet() != null && responsableProjet.getBacklog() == null) {
				notification.setProjet(responsableProjet.getProjet());
				notification.setNotification(" vous a assigné comme dévellopeur du projet "+responsableProjet.getProjet().getNom()+".");
			} 
		}
		
		projet.setIdResponsable(responsableProjet.getIdResponsable());
		projet.setIdProductOwner(responsableProjet.getIdResponsable());
		projet.setIdScrumMaster(responsableProjet.getIdScrumMaster());
		
		ResponsableProjet resp = respRepository.save(projet);
		if(notification.getNotification() != null) notifRepository.save(notification);
		if(historique.getHistorique() != null) historiqueRepository.save(historique);
		return ResponseEntity.ok(resp);
	}
	
	@DeleteMapping("/delete/{id}/{userID}")
	public ResponseEntity<Map<String, Boolean>> deleteResponsable(@PathVariable Long id,@PathVariable("userID") String userID){
		ResponsableProjet projet = respRepository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity user = userRepository.findById(userID).orElseThrow(() -> new RessourceNotFoundException("User not exist with id : " + userID));
		
		Historique historique = new Historique();
		if(projet.getIdResponsable() != null) historique.setHistorique(" a supprimé "+projet.getIdResponsable().getUsername()+" comme responsable du projet.");
		if(projet.getIdProductOwner() != null) historique.setHistorique(" a supprimé "+projet.getIdProductOwner().getUsername()+" comme responsable du projet.");
		if(projet.getIdScrumMaster() != null) historique.setHistorique(" a supprimé "+projet.getIdScrumMaster().getUsername()+" comme responsable du projet.");
		if(projet.getIdDevellopers() != null) historique.setHistorique(" a supprimé "+projet.getIdDevellopers().getUsername()+" comme responsable du projet.");
		historique.setIdCreateur(user);
		historique.setProjet(projet.getProjet());
		historiqueRepository.save(historique);
		
		respRepository.delete(projet);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/projetID/{id}")
	public ResponseEntity<ResponsableProjet[]> getResponsablesProjetByIdProjet(@PathVariable("id") long id){
		ResponsableProjet[]responsableProjet = respRepository.findByProjetIdProjetAndBacklogIsNullAndTacheIsNullAndFonctionnaliteIsNull(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(responsableProjet);
	}
	
	@GetMapping("/backlogProjetID/{id}")
	public ResponseEntity<ResponsableProjet[]> getResponsablesBacklogInProject(@PathVariable("id") long id){
		ResponsableProjet[]responsableProjet = respRepository.findByProjetIdProjetAndBacklogIsNotNullAndTacheIsNullAndFonctionnaliteIsNull(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(responsableProjet);
	}
	
	@GetMapping("/fonctionnaliteBacklogID/{id}")
	public ResponseEntity<ResponsableProjet[]> getResponsablesFonctionnaliteInBacklog(@PathVariable("id") long id){
		ResponsableProjet[]responsableProjet = respRepository.findByProjetIdProjetAndFonctionnaliteIsNotNull(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(responsableProjet);
	}
	
	@GetMapping("/backlogID/{id}")
	public ResponseEntity<ResponsableProjet[]> getResponsablesSprintIdSprint(@PathVariable("id") long id){
		ResponsableProjet[]responsableProjet = respRepository.findByBacklogId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(responsableProjet);
	}
	
	@GetMapping("/responsableID/{id}")
	public ResponseEntity<ResponsableProjet[]> getResponsablesProjetByIdResponsable(@PathVariable("id") String id){
		ResponsableProjet[]responsableProjet = respRepository.findByIdResponsableId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(responsableProjet);
	}
	
	@GetMapping("/scrumMasterID/{id}")
	public ResponseEntity<ResponsableProjet[]> getResponsablesProjetByIdScrumMaster(@PathVariable("id") String id){
		ResponsableProjet[]responsableProjet = respRepository.findByIdScrumMasterId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(responsableProjet);
	}
	
	@GetMapping("/productOwnerID/{id}")
	public ResponseEntity<ResponsableProjet[]> getResponsablesProjetByIdProductOwnerID(@PathVariable("id") String id){
		ResponsableProjet[]responsableProjet = respRepository.findByIdProductOwnerId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(responsableProjet);
	}
	
	@GetMapping("/devellopersID/{id}")
	public ResponseEntity<ResponsableProjet[]> getResponsablesProjetByIddevellopersID(@PathVariable("id") String id){
		ResponsableProjet[]responsableProjet = respRepository.findByIdDevellopersId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(responsableProjet);
	}
	
	@GetMapping("/projetAssignedID/{id}")
	public ResponseEntity<List<Projet>> getProjectAssignedByIdUser(@PathVariable("id") String id){
		List<Projet> projets = new ArrayList<Projet>();
		List<ResponsableProjet> responsableProjet = respRepository.findByIdResponsableIdOrIdProductOwnerIdOrIdScrumMasterIdOrIdDevellopersIdAndProjetIsNotNullAndBacklogIsNullAndFonctionnaliteIsNullAndTacheIsNull(id,id,id,id);
		for(ResponsableProjet resp: responsableProjet) {
			projets.add(resp.getProjet());
		}
		return ResponseEntity.ok(projets);
	}
	
	@GetMapping("/backlogAssignedID/{id}")
	public ResponseEntity<List<Backlog>> getBacklogAssignedByIdUser(@PathVariable("id") String id){
		List<Backlog> backlogs = new ArrayList<Backlog>();
		List<ResponsableProjet> responsableProjet = respRepository.findByIdResponsableIdOrIdProductOwnerIdOrIdScrumMasterIdOrIdDevellopersIdAndProjetIsNotNullAndBacklogIsNotNullAndFonctionnaliteIsNullAndTacheIsNull(id,id,id,id);
		for(ResponsableProjet resp: responsableProjet) {
			if(resp.getBacklog() != null) backlogs.add(resp.getBacklog());
		}
		return ResponseEntity.ok(backlogs);
	}
	
	@GetMapping("/backlogAssignedID2/{id}")
	public ResponseEntity<List<ResponsableProjet>> getBacklogAssignedByIdUser2(@PathVariable("id") String id){
		List<ResponsableProjet> responsableProjet = respRepository.findByIdResponsableIdOrIdProductOwnerIdOrIdScrumMasterIdOrIdDevellopersId(id,id,id,id);
		return ResponseEntity.ok(responsableProjet);
	}
	
	@GetMapping("/fonctionnaliteAssignedID/{id}")
	public ResponseEntity<List<Fonctionnalite>> getFonctionnaliteAssignedByIdUser(@PathVariable("id") String id){
		List<Fonctionnalite> fonctionnalites = new ArrayList<Fonctionnalite>();
		List<ResponsableProjet> responsableProjet = respRepository.findByIdResponsableIdOrIdProductOwnerIdOrIdScrumMasterIdOrIdDevellopersIdAndProjetIsNotNullAndBacklogIsNotNullAndFonctionnaliteIsNotNullAndTacheIsNull(id,id,id,id);
		for(ResponsableProjet resp: responsableProjet) {
			if(resp.getFonctionnalite() != null) fonctionnalites.add(resp.getFonctionnalite());
		}
		return ResponseEntity.ok(fonctionnalites);
	}
	
	@GetMapping("/tacheAssignedID/{id}")
	public ResponseEntity<List<Tache>> getTacheAssignedByIdUser(@PathVariable("id") String id){
		List<Tache> taches = new ArrayList<Tache>();
		List<ResponsableProjet> responsableProjet = respRepository.findByIdResponsableIdOrIdProductOwnerIdOrIdScrumMasterIdOrIdDevellopersIdAndProjetIsNotNullAndBacklogIsNotNullAndFonctionnaliteIsNotNullAndTacheIsNotNull(id,id,id,id);
		for(ResponsableProjet resp: responsableProjet) {
			if(resp.getTache() != null) taches.add(resp.getTache());
		}
		return ResponseEntity.ok(taches);
	}
}
