package com.main.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.mail.MessagingException;

import org.keycloak.adapters.springsecurity.client.KeycloakRestTemplate;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

import com.main.Exception.RessourceNotFoundException;
import com.main.model.Fichier;
import com.main.model.MailContent;
import com.main.repository.Fichier_repository;
import com.main.service.EmailSenderService;
import com.main.service.KeycloakService;

@RestController
@RequestMapping(path = "/User")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlUser {
	
	private KeycloakRestTemplate restTemplate;

	private String keycloakServerUrl;
	
	@Value("${keycloak.client-key-password}")
    private String idClient;
	
	@Autowired
	KeycloakService service;
	
	@Autowired
	Fichier_repository repo;
	
	@Autowired
	EmailSenderService emailSenderService;
	
	public CtrlUser(KeycloakRestTemplate restTemplate,
			@Value("${keycloak.auth-server-url}") String keycloakServerUrl) {
		this.restTemplate = restTemplate;
		this.keycloakServerUrl = keycloakServerUrl;
	}
    
    @GetMapping("users")
	public List<UserRepresentation> users() {
		ResponseEntity<UserRepresentation[]> response = restTemplate.getForEntity(
				URI.create(keycloakServerUrl + "/admin/realms/Gestion_test/users"), UserRepresentation[].class);
        return Arrays.asList(response.getBody());
	}
    
    @GetMapping("token")
	public String getAccessToken() {
    	return service.getAccessToken();
    }
    
    @GetMapping("roles")
	public List<RoleRepresentation> roles(){
		ResponseEntity<RoleRepresentation[]> response = restTemplate.getForEntity(
				URI.create(keycloakServerUrl + "/admin/realms/Gestion_test/roles"), RoleRepresentation[].class);
        return Arrays.asList(response.getBody());
	}
    
    @GetMapping("clientRoles")
	public List<RoleRepresentation> clientRoles(){
    	ResponseEntity<RoleRepresentation[]> response = restTemplate.getForEntity(
				URI.create(keycloakServerUrl + "/admin/realms/Gestion_test/clients/"+idClient+"/roles"), RoleRepresentation[].class);
        return Arrays.asList(response.getBody());
	}
    
    @GetMapping("userswithrole2")
	public List<UserRepresentation> lesUsers2() {
		List<UserRepresentation> finale = users();
		List<RoleRepresentation> roles = roles();
		String role = "azerty";
		List<UserRepresentation> users = null;
		for(int i = 0; i < finale.size(); i++) {
			List<String> usersRole = new ArrayList<String>();
			for(int j = 0; j < roles.size(); j++) {
				role = roles.get(j).getName();
				ResponseEntity<UserRepresentation[]> response = restTemplate.getForEntity(
						URI.create(keycloakServerUrl + "/admin/realms/Gestion_test/roles/"+roles.get(j).getName()+"/users"), UserRepresentation[].class);
				users = Arrays.asList(response.getBody());
				for(int k = 0; k < users.size() ; k++) {
					if(finale.get(i).getUsername().toString().equalsIgnoreCase(users.get(k).getUsername().toString())) {
						usersRole.add(role);
						break;
					}
				}
			}
			finale.get(i).setRealmRoles(usersRole);
		}
		return finale;
	}
     
    @GetMapping("userswithClientrole")
	public List<UserRepresentation> usersWithClientRole() {
		List<UserRepresentation> finale = users();
		List<RoleRepresentation> roles = clientRoles();
		String role = "azerty";
		List<UserRepresentation> users = null;
		for(int i = 0; i < finale.size(); i++) {
			List<String> usersRole = new ArrayList<String>();
			for(int j = 0; j < roles.size(); j++) {
				role = roles.get(j).getName();
				ResponseEntity<UserRepresentation[]> response = restTemplate.getForEntity(
						URI.create(keycloakServerUrl + "/admin/realms/Gestion_test/clients/"+idClient+"/roles/"+roles.get(j).getName()+"/users"), UserRepresentation[].class);
				users = Arrays.asList(response.getBody());
				for(int k = 0; k < users.size() ; k++) {
					if(finale.get(i).getUsername().toString().equalsIgnoreCase(users.get(k).getUsername().toString())) {
						usersRole.add(role);
						break;
					}
				}
			}
			finale.get(i).setRealmRoles(usersRole);
		}
		return finale;
	}
    
    @GetMapping("getUsersByRole/{roleName}")
	public List<UserRepresentation> getUsersByRole(@PathVariable("roleName")String roleName) {
    	List<UserRepresentation> valiny = new ArrayList<UserRepresentation>();
    	List<UserRepresentation> allUsersWithRoles = lesUsers2();
		ResponseEntity<UserRepresentation[]> response = restTemplate.getForEntity(
				URI.create(keycloakServerUrl + "/admin/realms/Gestion_test/roles/"+roleName+"/users"), UserRepresentation[].class);
		List<UserRepresentation> allUsersWithRoleSpecified = new ArrayList<UserRepresentation>();
		allUsersWithRoleSpecified = Arrays.asList(response.getBody());
        for(int i = 0; i < allUsersWithRoles.size(); i++) {
        	for(int k = 0; k < allUsersWithRoleSpecified.size(); k++) {
        		if(allUsersWithRoles.get(i).getUsername().toString().equalsIgnoreCase(allUsersWithRoleSpecified.get(k).getUsername().toString())) {
        			valiny.add(allUsersWithRoles.get(i));
        			break;
        		}
        	}
        }
		return valiny;
	}
    
    @GetMapping("getUsersByClientRole/{roleName}")
	public List<UserRepresentation> getUsersByClientRole(@PathVariable("roleName")String roleName) {
    	List<UserRepresentation> valiny = new ArrayList<UserRepresentation>();
    	List<UserRepresentation> allUsersWithRoles = usersWithClientRole();
		ResponseEntity<UserRepresentation[]> response = restTemplate.getForEntity(
				URI.create(keycloakServerUrl + "/admin/realms/Gestion_test/clients/"+idClient+"/roles/"+roleName+"/users"), UserRepresentation[].class);
		List<UserRepresentation> allUsersWithRoleSpecified = new ArrayList<UserRepresentation>();
		allUsersWithRoleSpecified = Arrays.asList(response.getBody());
        for(int i = 0; i < allUsersWithRoles.size(); i++) {
        	for(int k = 0; k < allUsersWithRoleSpecified.size(); k++) {
        		if(allUsersWithRoles.get(i).getUsername().toString().equalsIgnoreCase(allUsersWithRoleSpecified.get(k).getUsername().toString())) {
        			valiny.add(allUsersWithRoles.get(i));
        			break;
        		}
        	}
        }
		return valiny;
	}
    
    @GetMapping("userWithRole/{idUser}")
    public UserRepresentation userWithRoles(@PathVariable("idUser")String idUser) {
    	UserRepresentation finale = getUserById(idUser);
    	List<RoleRepresentation> roles = roles();
		String role = "azerty";
		List<UserRepresentation> users = null;
		List<String> usersRole = new ArrayList<String>();
		for(int j = 0; j < roles.size(); j++) {
			role = roles.get(j).getName();
			ResponseEntity<UserRepresentation[]> response = restTemplate.getForEntity(
					URI.create(keycloakServerUrl + "/admin/realms/Gestion_test/roles/"+roles.get(j).getName()+"/users"), UserRepresentation[].class);
			users = Arrays.asList(response.getBody());
			for(int k = 0; k < users.size() ; k++) {
				if(finale.getUsername().toString().equalsIgnoreCase(users.get(k).getUsername().toString())) {
					usersRole.add(role);
					break;
				}
			}
		}
		finale.setRealmRoles(usersRole);
		return finale;
    }
    
    @GetMapping("userWithClientRoles/{idUser}")
    public UserRepresentation userWithClientRoles(@PathVariable("idUser")String idUser) {
    	UserRepresentation finale = getUserById(idUser);
    	List<RoleRepresentation> roles = clientRoles();
		String role = "azerty";
		List<UserRepresentation> users = null;
		List<String> usersRole = new ArrayList<String>();
		for(int j = 0; j < roles.size(); j++) {
			role = roles.get(j).getName();
			ResponseEntity<UserRepresentation[]> response = restTemplate.getForEntity(
					URI.create(keycloakServerUrl + "/admin/realms/Gestion_test/clients/"+idClient+"/roles/"+roles.get(j).getName()+"/users"), UserRepresentation[].class);
			users = Arrays.asList(response.getBody());
			for(int k = 0; k < users.size() ; k++) {
				if(finale.getUsername().toString().equalsIgnoreCase(users.get(k).getUsername().toString())) {
					usersRole.add(role);
					break;
				}
			}
		}
		finale.setRealmRoles(usersRole);
		return finale;
    }

    @PostMapping("/save/{password}/{token}")
    public String addUser(@RequestBody UserRepresentation userDTO,@PathVariable("password") String password,@PathVariable("token") String token){
        service.createUser(userDTO,password);
        List<String> rolesName = service.getAllClientRoles();
        for(String role:rolesName) {
        	service.addClientRoleToUser(userDTO.getUsername(), role);      	
        }
        String userId = service.getUserId(userDTO.getUsername());
        String lien = "http://localhost:4200/EmailActivation/"+userId+"/"+token;
        String mailBody = "Clickez sur ce lien pour valider votre email sur notre site : "+lien;
        MailContent mail = new MailContent(userDTO.getEmail(),mailBody,"validation de l'email");
        mail.setRoot(null);
        
        try {
        	emailSenderService.sendMailWithAttachement("jessyowen48@gmail.com",mail.getDestinataire(),mail.getBody(),mail.getObject(),mail.getRoot());
        } catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return userDTO.getUsername();
    }
    
    @GetMapping(path = "/getUserByUsername/{userName}")
    public List<UserRepresentation> getUser(@PathVariable("userName") String userName){
        List<UserRepresentation> user = service.getUser(userName);
        return user;
    }
    
    @GetMapping(path = "/getUserById/{Id}")
    public UserRepresentation getUserById(@PathVariable("Id") String id){
        UserRepresentation user = service.getUserById(id);
        return user;
    }
    
    @GetMapping("/allUsers")
    public List<UserRepresentation> getUsers(){
        List<UserRepresentation> user = service.findAll();
        return user;
    }
    
    @GetMapping(path ="/userId/{username}")
    public String getUserId(@PathVariable("username") String username){
        String user = service.getUserId(username);
        return user;
    }


    @PutMapping(path = "/update/{userId}/{password}")
    public String updateUser(@PathVariable("userId") String userId,@PathVariable("password") String password, @RequestBody UserRepresentation userDTO){
        service.updateUser(userId, userDTO,password);
        return "User Details Updated Successfully.";
    }
    
    @PutMapping(path = "/activateCount/{userId}")
    public String activateCount(@PathVariable("userId") String userId){
        service.activateCount(userId);
        return "User Details Updated Successfully.";
    }
    
    @PutMapping(path = "/updateUserDetail/{userId}")
    public String updateUserDetail(@PathVariable("userId") String userId, @RequestBody UserRepresentation userDTO){
        service.updateUserDetail(userId, userDTO);
        return "User Details Updated Successfully.";
    }
    
    @PutMapping(path = "/setUserPassword/{userId}/{password}")
    public String setUserPassword(@PathVariable("userId") String userId,@PathVariable("password") String password){
        service.setUserPassword(userId, password);
        return "Password Updated Successfully.";
    }

    @DeleteMapping(path = "/delete/{userId}")
    public String deleteUser(@PathVariable("userId") String userId){
        Fichier fichier = null;
        try {
            fichier = repo.findByUserId(userId).orElseThrow(() -> new RessourceNotFoundException("File not exist with user_id : " + userId));
            repo.delete(fichier);
        } catch (RessourceNotFoundException e) {
            
        }
        service.deleteUser(userId);
        return "User Deleted Successfully.";
    }
    
    @GetMapping("/getRolesNotToUser/{userId}")
    public List<RoleRepresentation> getRolesNotToUser(@PathVariable("userId") String userId) {
    	UserRepresentation user = userWithRoles(userId);
    	List<RoleRepresentation> rolesFinal = new ArrayList<RoleRepresentation>();
    	List<RoleRepresentation> roles = roles();
    	for(RoleRepresentation allRoles: roles) {
    		if(!user.getRealmRoles().contains(allRoles.getName())) {
    			rolesFinal.add(allRoles);
    		}
    	}
    	return rolesFinal;
    }
    
    @GetMapping("/getClientRolesNotToUser/{userId}")
    public List<RoleRepresentation> getClientRolesNotToUser(@PathVariable("userId") String userId) {
    	UserRepresentation user = userWithClientRoles(userId);
    	List<RoleRepresentation> rolesFinal = new ArrayList<RoleRepresentation>();
    	List<RoleRepresentation> roles = clientRoles();
    	for(RoleRepresentation allRoles: roles) {
    		if(!user.getRealmRoles().contains(allRoles.getName())) {
    			rolesFinal.add(allRoles);
    		}
    	}
    	return rolesFinal;
    }
}
