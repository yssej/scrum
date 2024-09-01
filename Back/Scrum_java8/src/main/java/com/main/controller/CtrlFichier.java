package com.main.controller;

import static java.nio.file.Files.copy;
import static java.nio.file.Paths.get;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.springframework.http.HttpHeaders.CONTENT_DISPOSITION;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.Exception.RessourceNotFoundException;
import com.main.model.Backlog;
import com.main.model.Commentaire;
import com.main.model.Fichier;
import com.main.model.Fonctionnalite;
import com.main.model.Historique;
import com.main.model.Projet;
import com.main.model.Tache;
import com.main.model.User_entity;
import com.main.repository.BacklogRepository;
import com.main.repository.Commentaire_repository;
import com.main.repository.Fichier_repository;
import com.main.repository.FonctionnaliteRepository;
import com.main.repository.Historique_repository;
import com.main.repository.Projet_repository;
import com.main.repository.Tache_repository;
import com.main.repository.User_entityRepository;

@RestController
@RequestMapping("/Fichier")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlFichier {
	
	@Autowired
	Fichier_repository fichier_repository;
	
	@Autowired
	User_entityRepository user;
	
	@Autowired
	Projet_repository projet_repository;
	
	@Autowired
	Commentaire_repository commentaire_repository;
	
	@Autowired
	User_entityRepository userRepository;
	
	@Autowired
	Historique_repository historiqueRepository;
	
	@Autowired
	Tache_repository tacheRepository;
	
	@Autowired
	BacklogRepository backlogRepository;
	
	@Autowired
	FonctionnaliteRepository fonctionnaliteRepository;

	@Autowired
	CtrlCommentaire ctrlCom;
	
	public static final String DIRECTORY = System.getProperty("user.home") + "\\Desktop\\Jessy\\VScode - workspace\\projet_SCRUM(2)\\src\\assets";
	
	@GetMapping("/list")
	public List<Fichier> list(){
		return fichier_repository.findAll();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Fichier> getFichierById(@PathVariable("id") Long id){
		Fichier projet = fichier_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(projet);
	}
	
	@PostMapping("/savePDP")
	public ResponseEntity<Fichier> createFichier(@RequestParam("tdrName") List<MultipartFile> multipartFiles ,@RequestParam("projet") String projet ) throws IOException {
		Fichier project = new ObjectMapper().readValue(projet,Fichier.class);
		project.setDateCreation(LocalDateTime.now());
		List<String> filenames = new ArrayList<>();
		for(MultipartFile file : multipartFiles) {
			 String filename = StringUtils.cleanPath(file.getOriginalFilename());
			 List<Fichier> fichiers = fichier_repository.findAll();
			 Integer i = 0;
			 for(Fichier fich: fichiers) {
				 if(fich.getNom().toString().equalsIgnoreCase(filename)) {
					 filename = i.toString() + " - " + filename;
					 i++;
					 break;
				 }
			 }
			 Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
			 copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
			 project.setNom(filename);
			 project.setUser(user.findTop1ByOrderByCreatedtimestampDesc());
			 project.setChemin(DIRECTORY+filename);
			 filenames.add(filename);
		}
		fichier_repository.save(project);
		return new ResponseEntity<>(project,HttpStatus.OK);
	}
	
	@PostMapping("/savePDPOldUser/{id}")
	public ResponseEntity<Fichier> savePDPOldUser(@RequestParam("tdrName")List<MultipartFile> multipartFiles ,@RequestParam("projet") String projet,@PathVariable("id") String id)
			throws IOException {
		User_entity userToUpdate = user.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));;
		Fichier project = new ObjectMapper().readValue(projet,Fichier.class);
		project.setDateCreation(LocalDateTime.now());
		List<String> filenames = new ArrayList<>();
		for(MultipartFile file : multipartFiles) {
			 String filename = StringUtils.cleanPath(file.getOriginalFilename());
			 List<Fichier> fichiers = fichier_repository.findAll();
			 Integer i = 0;
			 for(Fichier fich: fichiers) {
				 if(fich.getNom().toString().equalsIgnoreCase(filename)) {
					 filename = i.toString() + " - " + filename;
					 i++;
					 break;
				 }
			 }
			 Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
			 copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
			 project.setNom(filename);
			 project.setUser(userToUpdate);
			 project.setChemin(DIRECTORY+filename);
			 filenames.add(filename);
		}
		fichier_repository.save(project);
		return new ResponseEntity<>(project,HttpStatus.OK);
	}
	
	@PutMapping("/updatePDP/{id}")
	public ResponseEntity<Fichier> updatePhoto(@RequestParam("tdrName") List<MultipartFile> multipartFiles,@PathVariable("id") String id,@RequestParam("projet") String projet)
			throws IOException {
		Fichier fichier = fichier_repository.findByUserId(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		List<String> filenames = new ArrayList<>();
		for(MultipartFile file : multipartFiles) {
			 String filename = StringUtils.cleanPath(file.getOriginalFilename());
			 List<Fichier> fichiers = fichier_repository.findAll();
			 Integer i = 0;
			 for(Fichier fich: fichiers) {
				 if(fich.getNom().toString().equalsIgnoreCase(filename)) {
					 filename = i.toString() + " - " + filename;
					 i++;
					 break;
				 }
			 }
			 Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
			 copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
			 fichier.setNom(filename);
			 fichier.setChemin(DIRECTORY+filename);
			 filenames.add(filename);
		}
		Fichier updatedFichier = fichier_repository.save(fichier);
		return ResponseEntity.ok(updatedFichier);	
	}
	
	@PostMapping("/saveProjectFile/{id}/{idUser}")
	public ResponseEntity<Fichier> saveProjectFile(@RequestParam("tdrName") List<MultipartFile> multipartFiles ,@RequestParam("projet") String projet,
			@PathVariable("id") long id,@PathVariable("idUser") String idUser) throws IOException {
		Projet leProjet = projet_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		Fichier project = new ObjectMapper().readValue(projet,Fichier.class);
		User_entity createur = user.findById(idUser).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idUser));
		project.setDateCreation(LocalDateTime.now());
		List<String> filenames = new ArrayList<>();
		for(MultipartFile file : multipartFiles) {
			 String filename = StringUtils.cleanPath(file.getOriginalFilename());
			 List<Fichier> fichiers = fichier_repository.findAll();
			 Integer i = 0;
			 for(Fichier fich: fichiers) {
				 if(fich.getNom().toString().equalsIgnoreCase(filename)) {
					 filename = i.toString() + " - " + filename;
					 i++;
					 break;
				 }
			 }
			 Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
			 copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
			 project.setNom(filename);
			 project.setProjet(leProjet);
			 project.setChemin(DIRECTORY+filename);
			 filenames.add(filename);
			 Historique historique = new Historique();
			 historique.setHistorique(" a ajouté pièce jointe "+project.getNom()+" sur le projet");
			 historique.setIdCreateur(createur);
			 historique.setProjet(leProjet);
			 historiqueRepository.save(historique);
			 
			 fichier_repository.save(project);
		}
		return new ResponseEntity<>(project,HttpStatus.OK);
	}
	
	@PostMapping("/saveCommentFile/{id}/{idUser}/{commentaire}")
	public ResponseEntity<Fichier> saveCommentFile(@RequestParam("tdrName") List<MultipartFile> multipartFiles ,@PathVariable("commentaire") String commentaireFile,
			@RequestParam("projet") String projet,@PathVariable("id") long id,@PathVariable("idUser") String idUser) throws IOException {
		Projet leProjet = projet_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		User_entity createur = user.findById(idUser).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idUser));
		Commentaire commentaire = new Commentaire();
		Fichier project = new ObjectMapper().readValue(projet,Fichier.class);
		project.setDateCreation(LocalDateTime.now());
		List<String> filenames = new ArrayList<>();
		for(MultipartFile file : multipartFiles) {
			 String filename = StringUtils.cleanPath(file.getOriginalFilename());
			 List<Fichier> fichiers = fichier_repository.findAll();
			 Integer i = 0;
			 for(Fichier fich: fichiers) {
				 if(fich.getNom().toString().equalsIgnoreCase(filename)) {
					 filename = i.toString() + " - " + filename;
					 i++;
					 break;
				 }
			 }
			 Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
			 copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
			 project.setNom(filename);
			 if(commentaireFile != null) commentaire.setCommentaire(commentaireFile);
			 else commentaire.setCommentaire(null);
			 commentaire.setFile(true);
			 commentaire.setProjet(leProjet);
			 commentaire.setProjetID(leProjet);
			 commentaire.setCreateur(createur);
//			 commentaire_repository.save(commentaire);
			 ctrlCom.create(commentaire, idUser);
			 project.setCommentaire(commentaire);
			 project.setChemin(DIRECTORY+filename);
			 filenames.add(filename);

			 Historique historique = new Historique();
			 historique.setHistorique(" a ajouté pièce jointe "+filename+" sur le commentaire");
			 historique.setIdCreateur(createur);
			 historique.setProjet(leProjet);
			 historiqueRepository.save(historique);

			 fichier_repository.save(project);
		}
		return new ResponseEntity<>(project,HttpStatus.OK);
	}
	
	@PostMapping("/saveCommentFileBacklog/{idBacklog}/{idProjet}/{idUser}/{commentaire}")
	public ResponseEntity<Fichier> saveCommentFileBacklog(@RequestParam("tdrName") List<MultipartFile> multipartFiles ,@PathVariable("commentaire") String commentaireFile,
			@RequestParam("projet") String projet,@PathVariable("idBacklog") long idBacklog,@PathVariable("idProjet") long idProjet,@PathVariable("idUser") String idUser) throws IOException {
		Backlog backlog = backlogRepository.findById(idBacklog).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idBacklog));
		Projet leProjet = projet_repository.findById(idProjet).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idProjet));
		User_entity createur = user.findById(idUser).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idUser));
		Commentaire commentaire = new Commentaire();
		Fichier project = new ObjectMapper().readValue(projet,Fichier.class);
		project.setDateCreation(LocalDateTime.now());
		List<String> filenames = new ArrayList<>();
		for(MultipartFile file : multipartFiles) {
			 String filename = StringUtils.cleanPath(file.getOriginalFilename());
			 List<Fichier> fichiers = fichier_repository.findAll();
			 Integer i = 0;
			 for(Fichier fich: fichiers) {
				 if(fich.getNom().toString().equalsIgnoreCase(filename)) {
					 filename = i.toString() + " - " + filename;
					 i++;
					 break;
				 }
			 }
			 Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
			 copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
			 project.setNom(filename);
			 if(commentaireFile != null) commentaire.setCommentaire(commentaireFile);
			 else commentaire.setCommentaire(null);
			 commentaire.setFile(true);
			 commentaire.setBacklog(backlog);
			 commentaire.setCreateur(createur);
			 ctrlCom.create(commentaire, idUser);
//			 commentaire_repository.save(commentaire);
			 project.setCommentaire(commentaire);
			 project.setChemin(DIRECTORY+filename);
			 filenames.add(filename);

			 Historique historique = new Historique();
			 historique.setHistorique(" a ajouté pièce jointe "+filename+" sur le commentaire");
			 historique.setIdCreateur(createur);
			 historique.setProjet(leProjet);
			 historiqueRepository.save(historique);

			 fichier_repository.save(project);
		}
		return new ResponseEntity<>(project,HttpStatus.OK);
	}
	
	@PostMapping("/saveCommentFileFonctionnalite/{idFonctionnalite}/{idProjet}/{idUser}/{commentaire}")
	public ResponseEntity<Fichier> saveCommentFileFonctionnalite(@RequestParam("tdrName") List<MultipartFile> multipartFiles ,@PathVariable("commentaire") String commentaireFile,
			@RequestParam("projet") String projet,@PathVariable("idFonctionnalite") long idFonctionnalite,@PathVariable("idProjet") long idProjet,@PathVariable("idUser") String idUser) throws IOException {
		Fonctionnalite fonctionnalite = fonctionnaliteRepository.findById(idFonctionnalite).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idFonctionnalite));
		Projet leProjet = projet_repository.findById(idProjet).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idProjet));
		User_entity createur = user.findById(idUser).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idUser));
		Commentaire commentaire = new Commentaire();
		Fichier project = new ObjectMapper().readValue(projet,Fichier.class);
		project.setDateCreation(LocalDateTime.now());
		List<String> filenames = new ArrayList<>();
		for(MultipartFile file : multipartFiles) {
			 String filename = StringUtils.cleanPath(file.getOriginalFilename());
			 List<Fichier> fichiers = fichier_repository.findAll();
			 Integer i = 0;
			 for(Fichier fich: fichiers) {
				 if(fich.getNom().toString().equalsIgnoreCase(filename)) {
					 filename = i.toString() + " - " + filename;
					 i++;
					 break;
				 }
			 }
			 Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
			 copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
			 project.setNom(filename);
			 if(commentaireFile != null) commentaire.setCommentaire(commentaireFile);
			 else commentaire.setCommentaire(null);
			 commentaire.setFile(true);
			 commentaire.setFonctionnalite(fonctionnalite);
			 commentaire.setCreateur(createur);
			 ctrlCom.create(commentaire, idUser);
//			 commentaire_repository.save(commentaire);
			 project.setCommentaire(commentaire);
			 project.setChemin(DIRECTORY+filename);
			 filenames.add(filename);

			 Historique historique = new Historique();
			 historique.setHistorique(" a ajouté pièce jointe "+filename+" sur le commentaire");
			 historique.setIdCreateur(createur);
			 historique.setProjet(leProjet);
			 historiqueRepository.save(historique);

			 fichier_repository.save(project);
		}
		return new ResponseEntity<>(project,HttpStatus.OK);
	}
	
	@PostMapping("/saveCommentFileTache/{idTache}/{idProjet}/{idUser}/{commentaire}")
	public ResponseEntity<Fichier> saveCommentFileTache(@RequestParam("tdrName") List<MultipartFile> multipartFiles ,@PathVariable("commentaire") String commentaireFile,
			@RequestParam("projet") String projet,@PathVariable("idTache") long idTache,@PathVariable("idProjet") long idProjet,@PathVariable("idUser") String idUser) throws IOException {
		Tache tache = tacheRepository.findById(idTache).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idTache));
		Projet leProjet = projet_repository.findById(idProjet).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idProjet));
		User_entity createur = user.findById(idUser).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idUser));
		Commentaire commentaire = new Commentaire();
		Fichier project = new ObjectMapper().readValue(projet,Fichier.class);
		project.setDateCreation(LocalDateTime.now());
		List<String> filenames = new ArrayList<>();
		for(MultipartFile file : multipartFiles) {
			 String filename = StringUtils.cleanPath(file.getOriginalFilename());
			 List<Fichier> fichiers = fichier_repository.findAll();
			 Integer i = 0;
			 for(Fichier fich: fichiers) {
				 if(fich.getNom().toString().equalsIgnoreCase(filename)) {
					 filename = i.toString() + " - " + filename;
					 i++;
					 break;
				 }
			 }
			 Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
			 copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
			 project.setNom(filename);
			 if(commentaireFile != null) commentaire.setCommentaire(commentaireFile);
			 else commentaire.setCommentaire(null);
			 commentaire.setFile(true);
			 commentaire.setTache(tache);
			 commentaire.setCreateur(createur);
//			 commentaire_repository.save(commentaire);
			 ctrlCom.create(commentaire, idUser);
			 project.setCommentaire(commentaire);
			 project.setChemin(DIRECTORY+filename);
			 filenames.add(filename);

			 Historique historique = new Historique();
			 historique.setHistorique(" a ajouté pièce jointe "+filename+" sur le commentaire");
			 historique.setIdCreateur(createur);
			 historique.setProjet(leProjet);
			 historiqueRepository.save(historique);

			 fichier_repository.save(project);
		}
		return new ResponseEntity<>(project,HttpStatus.OK);
	}
	
	@PostMapping("/saveTaskFile/{idTache}/{idUser}")
	public ResponseEntity<Fichier> saveTaskFile(@RequestParam("tdrName") List<MultipartFile> multipartFiles ,@RequestParam("projet") String projet,
			@PathVariable("idTache") long idTache,@PathVariable("idUser") String idUser) throws IOException {
		Tache tache = tacheRepository.findById(idTache).orElseThrow(() -> new RessourceNotFoundException("Tache not exist with id : " + idTache));
		Fichier project = new ObjectMapper().readValue(projet,Fichier.class);
		User_entity createur = user.findById(idUser).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idUser));
		project.setDateCreation(LocalDateTime.now());
		List<String> filenames = new ArrayList<>();
		for(MultipartFile file : multipartFiles) {
			 String filename = StringUtils.cleanPath(file.getOriginalFilename());
			 List<Fichier> fichiers = fichier_repository.findAll();
			 Integer i = 0;
			 for(Fichier fich: fichiers) {
				 if(fich.getNom().toString().equalsIgnoreCase(filename)) {
					 filename = i.toString() + " - " + filename;
					 i++;
					 break;
				 }
			 }
			 Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
			 copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
			 project.setNom(filename);
			 project.setTache(tache);
			 project.setChemin(DIRECTORY+filename);
			 filenames.add(filename);
			 Historique historique = new Historique();
			 historique.setHistorique(" a ajouté pièce jointe "+project.getNom()+" sur la tache.");
			 historique.setIdCreateur(createur);
			 historique.setProjet(tache.getProjet());
			 historiqueRepository.save(historique);
			 
			 fichier_repository.save(project);
		}
		return new ResponseEntity<>(project,HttpStatus.OK);
	}
	
	@PostMapping("/saveCommentTaskFile/{idTache}/{idUser}")
	public ResponseEntity<Fichier> saveCommentTaskFile(@RequestParam("tdrName") List<MultipartFile> multipartFiles ,
			@RequestParam("projet") String projet,@PathVariable("idTache") long idTache,@PathVariable("idUser") String idUser) throws IOException {
		Tache tache = tacheRepository.findById(idTache).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idTache));
		User_entity createur = user.findById(idUser).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idUser));
		Commentaire commentaire = new Commentaire();
		Fichier project = new ObjectMapper().readValue(projet,Fichier.class);
		project.setDateCreation(LocalDateTime.now());
		List<String> filenames = new ArrayList<>();
		for(MultipartFile file : multipartFiles) {
			 String filename = StringUtils.cleanPath(file.getOriginalFilename());
			 List<Fichier> fichiers = fichier_repository.findAll();
			 Integer i = 0;
			 for(Fichier fich: fichiers) {
				 if(fich.getNom().toString().equalsIgnoreCase(filename)) {
					 filename = i.toString() + " - " + filename;
					 i++;
					 break;
				 }
			 }
			 Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
			 copy(file.getInputStream(), fileStorage, REPLACE_EXISTING);
			 project.setNom(filename);
			 commentaire.setCommentaire(filename);
			 commentaire.setFile(true);
			 commentaire.setTache(tache);
			 commentaire.setProjetID(tache.getProjet());
			 commentaire.setCreateur(createur);
			 ctrlCom.create(commentaire, idUser);
//			 commentaire_repository.save(commentaire);
			 project.setCommentaire(commentaire);
			 project.setChemin(DIRECTORY+filename);
			 filenames.add(filename);

			 Historique historique = new Historique();
			 historique.setHistorique(" a ajouté pièce jointe "+filename+" sur le commentaire");
			 historique.setIdCreateur(createur);
			 historique.setProjet(tache.getProjet());
			 historiqueRepository.save(historique);

			 fichier_repository.save(project);
		}
		return new ResponseEntity<>(project,HttpStatus.OK);
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Fichier> update(@PathVariable("id") long id,@RequestBody Fichier projetDetails){
		Fichier projet = fichier_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		
		projet.setNom(projetDetails.getNom());
		projet.setChemin(projetDetails.getChemin());
		projet.setDateCreation(projetDetails.getDateCreation());
		projet.setCommentaire(projetDetails.getCommentaire());
		projet.setProjet(projetDetails.getProjet());
		
		Fichier updatedEmployee = fichier_repository.save(projet);
		return ResponseEntity.ok(updatedEmployee);	
	}
	
	@DeleteMapping("/delete/{id}/{idUser}")
	public ResponseEntity<Map<String, Boolean>> deleteProject(@PathVariable Long id,@PathVariable("idUser") String idUser){
		Fichier projet = fichier_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("File not exist with id : " + id));
		User_entity createur = user.findById(idUser).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + idUser));
		Historique historique = new Historique();
		historique.setHistorique(" a supprimé la pièce jointe "+projet.getNom());
		historique.setIdCreateur(createur);
		historique.setProjet(projet.getProjet());
		historiqueRepository.save(historique);
		fichier_repository.delete(projet);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/deleteByIdUser/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteByIdUser(@PathVariable String id){
		Fichier projet = fichier_repository.findByUserId(id).orElseThrow(() -> new RessourceNotFoundException("File not exist with user_id : " + id));
		
		fichier_repository.delete(projet);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("download/{filename}")
	public ResponseEntity<Resource> downloadFiles(@PathVariable("filename") String filename) throws IOException {
	    Path filePath = get(DIRECTORY).toAbsolutePath().normalize().resolve(filename);
	    if(!Files.exists(filePath)) {
	        throw new FileNotFoundException(filename + " was not found on the server");
	    }
	    Resource resource = new UrlResource(filePath.toUri());
	    HttpHeaders httpHeaders = new HttpHeaders();
	    httpHeaders.add("File-Name", filename);
	    String mimeType = Files.probeContentType(filePath);
	    if (mimeType == null) {
	        mimeType = "application/octet-stream";
	    }
	    httpHeaders.add(CONTENT_DISPOSITION, "attachment;File-Name=" + resource.getFilename());
	    return ResponseEntity.ok().contentType(MediaType.parseMediaType(mimeType))
	            .headers(httpHeaders).body(resource);
	}
	
	@GetMapping("/projetID/{id}")
	public ResponseEntity<Fichier[]> getFichierByProjet(@PathVariable("id") Long id){
		Fichier[]taches = fichier_repository.findByProjetIdProjet(id).orElseThrow(() -> 
			new RessourceNotFoundException("Projet from fichier table not exist with id : " + id));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/tacheID/{id}")
	public ResponseEntity<Fichier[]> getFichierByTache(@PathVariable("id") Long id){
		Fichier[]taches = fichier_repository.findByTacheIdTache(id).orElseThrow(() -> 
			new RessourceNotFoundException("Projet from fichier table not exist with id : " + id));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/commentaireID/{id}")
	public ResponseEntity<Fichier[]> getFichierByCommentaire(@PathVariable("id") Long id){
		Fichier[]taches = fichier_repository.findByCommentaireIdCommentaire(id).orElseThrow(() -> 
			new RessourceNotFoundException("Commentaire from fichier table not exist with id : " + id));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/userID/{id}")
	public ResponseEntity<Fichier> getFichierByUser(@PathVariable("id") String id){
		Fichier taches = new Fichier();
		try {
			taches = fichier_repository.findByUserId(id).orElseThrow(() -> new RessourceNotFoundException("UserId from fichier table not exist with id : " + id));
		} catch(RessourceNotFoundException e) {
			
		}
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/getUsersPhoto")
	public ResponseEntity<Fichier[]> getUsersPhoto(){
		Fichier[]taches = fichier_repository.findByUserIsNotNull().orElseThrow(() -> 
			new RessourceNotFoundException("Commentaire from fichier table not exist with id : "));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/getCommentairesFichiers")
	public ResponseEntity<Fichier[]> getCommentairesFichiers(){
		Fichier[]taches = fichier_repository.findByCommentaireIsNotNull().orElseThrow(() -> 
			new RessourceNotFoundException("Commentaire from fichier table not exist with id : "));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/getCommentairesFichiersByIdProjet/{idProjet}")
	public ResponseEntity<Fichier[]> getCommentairesFichiersByIdProjet(@PathVariable("idProjet") Long idProjet){
		Fichier[]taches = fichier_repository.findByProjetIdProjetAndCommentaireIsNotNull(idProjet).orElseThrow(() -> 
			new RessourceNotFoundException("Commentaire from fichier table not exist with id : "+idProjet));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/getProjetsFichiers")
	public ResponseEntity<Fichier[]> getProjetsFichiers(){
		Fichier[]taches = fichier_repository.findByProjetIsNotNull().orElseThrow(() -> 
			new RessourceNotFoundException("Commentaire from fichier table not exist with id : "));
		return ResponseEntity.ok(taches);
	}
	
	@GetMapping("/getTacheFichiers")
	public ResponseEntity<Fichier[]> getTacheFichiers(){
		Fichier[]taches = fichier_repository.findByTacheIsNotNull().orElseThrow(() -> 
			new RessourceNotFoundException("Commentaire from fichier table not exist with id : "));
		return ResponseEntity.ok(taches);
	}
}
