package com.main.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.main.credentials.Credentials;

@Service
public class KeycloakService {
	
	@Value("${keycloak.auth-server-url}")
    private String server_url;

    @Value("${keycloak.realm}")
    private String realm;
    
    static Keycloak keycloaka = null;
    
    public String getAccessToken() {
    	Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		return keycloak.tokenManager().getAccessTokenString();
    }
	
	public UsersResource getInstance() {
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		return keycloak.realm(realm).users();
	}
	
	public RolesResource getRoleInstance() {
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		return keycloak.realm(realm).roles();
	}
	
	public List<String> getAllClientRoles(String clientId){ 
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		ClientRepresentation clientRep = keycloak.realm(realm).clients().findByClientId(clientId).get(0); 
		List<String> availableRoles = keycloak.realm(realm).clients().get(clientRep.getId())
		        .roles().list().stream().map(role -> role.getName()).collect(Collectors.toList());
		return availableRoles;
	}
	
	public List<String> getAllClientRoles(){ 
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		ClientRepresentation clientRep = keycloak.realm(realm).clients().findByClientId("realm-management").get(0); 
		List<String> availableRoles = keycloak.realm(realm).clients().get(clientRep.getId())
		        .roles().list().stream().map(role -> role.getName()).collect(Collectors.toList());
		return availableRoles;
	}
	
	public List<String> getRoles() {
		RolesResource source = getRoleInstance();
		List<RoleRepresentation> roles = source.list();
		List<String> role = new ArrayList<String>();
		for(int i = 0; i < roles.size(); i++) {
			role.add(roles.get(i).getName());
		}
		return role;
	}
	
	public void createUser(UserRepresentation user,String password) {
		UsersResource instance = getInstance();
		CredentialRepresentation credential = Credentials
	            .createPasswordCredentials(password);
		user.setCredentials(Collections.singletonList(credential));
		user.setEnabled(false);
		user.setEmailVerified(false);
	    instance.create(user);
	}
	
	public List<UserRepresentation> getUser(String userName){
	    UsersResource usersResource = getInstance();
	    List<UserRepresentation> user = usersResource.search(userName, true);
	    return user;
	}
	
	public UserRepresentation getUserById(String id){
	    UsersResource usersResource = getInstance();
	    UserRepresentation user = usersResource.get(id).toRepresentation();
	    return user;
	}
	
	public List<UserRepresentation> findAll() {
		UsersResource usersResource = getInstance();
		List<UserRepresentation> users = usersResource.list();
		return users;
	}
	
	public void updateUser(String userId, UserRepresentation userDTO,String password){
	    CredentialRepresentation credential = Credentials
	            .createPasswordCredentials(password);
	    UserRepresentation user = new UserRepresentation();
	    user.setUsername(userDTO.getUsername());
	    user.setFirstName(userDTO.getFirstName());
	    user.setLastName(userDTO.getLastName());
	    user.setEmail(userDTO.getEmail());
	    user.setCredentials(Collections.singletonList(credential));

	    UsersResource usersResource = getInstance();
	    usersResource.get(userId).update(user);
	}
	
	public void updateUserDetail(String userId, UserRepresentation userDTO) {
		UserRepresentation userUpdate = getUserById(userId);
		UserRepresentation userDetail = new UserRepresentation();
		userDetail.setUsername(userDTO.getUsername());
		userDetail.setFirstName(userDTO.getFirstName());
		userDetail.setLastName(userDTO.getLastName());
		userDetail.setEmail(userDTO.getEmail());
		userDetail.setCredentials(userUpdate.getCredentials());
		UsersResource usersResource = getInstance();
	    usersResource.get(userId).update(userDetail);
	}
	
	public void setUserPassword(String userId, String password) {
		CredentialRepresentation credential = Credentials
	            .createPasswordCredentials(password);
		UserRepresentation userUpdate = getUserById(userId);
		userUpdate.setCredentials(Collections.singletonList(credential));
		UsersResource usersResource = getInstance();
	    usersResource.get(userId).update(userUpdate);
	}
	
	public void activateCount(String userId) {
		UserRepresentation user = getUserById(userId);
		user.setEnabled(true);
		user.setEmailVerified(true);
		System.out.println("count activated: "+user.isEnabled()+" emailVerified :"+user.isEmailVerified());
		UsersResource usersResource = getInstance();
	    usersResource.get(userId).update(user);
	}
	
	public void deleteUser(String userId){
	    UsersResource usersResource = getInstance();
	    usersResource.get(userId)
	            .remove();
	}
	
	public void addRealmRole(String new_role_name){
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
	  if(!getRoles().contains(new_role_name)){
	     RoleRepresentation roleRep = new  RoleRepresentation();
	     roleRep.setName(new_role_name);
	     roleRep.setDescription("role_" + new_role_name);
	     keycloak.realm(realm).roles().create(roleRep);
	  }
	}
	
	public void addGestionClientRole(String new_role_name){
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
	  if(!getAllClientRoles("gestion").contains(new_role_name)){
	     RoleRepresentation roleRep = new  RoleRepresentation();
	     roleRep.setName(new_role_name);
	     roleRep.setDescription("role_" + new_role_name);
	     ClientRepresentation client = keycloak.realm(realm).clients().findByClientId("gestion").get(0);
	     keycloak.realm(realm).clients().get(client.getId()).roles().create(roleRep);
	  } else {
		  System.out.println("Efa misy");
	  }
	}
	
	public void makeComposite(String role_name){
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		RoleRepresentation role = keycloak
	                          .realm(realm)
	                          .roles()
	                          .get(role_name)
	                          .toRepresentation();
		List<RoleRepresentation> composites = new LinkedList<>();
		composites.add(keycloak
	              .realm(realm)
	              .roles()
	              .get("offline_access")
	              .toRepresentation()
	              );
		keycloak.realm(realm).rolesById()
	                    .addComposites(role.getId(), composites);
	}
	
	public void makeClientComposite(String role_name){
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		ClientRepresentation clientRep = keycloak
		                                .realm(realm)
		                                .clients()
		                                .findByClientId("realm-management")
		                                .get(0);
		RoleRepresentation role = keycloak
		                          .realm(realm)
		                          .clients()
		                          .get(clientRep.getId())
		                          .roles()
		                          .get(role_name)
		                          .toRepresentation();
		 List<RoleRepresentation> composites = new LinkedList<>();  
		 composites.add(keycloak
		              .realm(realm)
		              .roles()
		              .get("offline_access")
		              .toRepresentation()
		              );
		 keycloak.realm(realm).rolesById().addComposites(role.getId(), composites);
	}
	
	public String getUserId(String userName) {
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		String userId = keycloak
                .realm(realm)
                .users()
                .search(userName)
                .get(0)
                .getId();
		return userId;
	}
	
	public void addRealmRoleToUser(String userName, String role_name) {
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		String userId = getUserId(userName);
	  	UserResource user = keycloak
	                    .realm(realm)
	                    .users()
	                    .get(userId);
	  	List<RoleRepresentation> roleToAdd = new LinkedList<>();
	    roleToAdd.add(keycloak
	                  .realm(realm)
	                  .roles()
	                  .get(role_name)
	                  .toRepresentation()
	                 );
	  user.roles().realmLevel().add(roleToAdd);
	}
	
	public void removeRealmRoleToUser(String userName, String role_name) {
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		String userId = getUserId(userName);
	  	UserResource user = keycloak
	                    .realm(realm)
	                    .users()
	                    .get(userId);
	  	List<RoleRepresentation> roleToAdd = new LinkedList<>();
	    roleToAdd.add(keycloak
	                  .realm(realm)
	                  .roles()
	                  .get(role_name)
	                  .toRepresentation()
	                 );
	  user.roles().realmLevel().remove(roleToAdd);
	}
	
	public void addClientRoleToUser(String clientId,String userName, String role_name) {
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		String client_id = keycloak.realm(realm).clients().findByClientId("gestion").get(0).getId();
		String userId = keycloak.realm(realm).users().search(userName).get(0).getId();
		UserResource user = keycloak.realm(realm).users().get(userId);
		List<RoleRepresentation> roleToAdd = new LinkedList<>();
		roleToAdd.add(keycloak.realm(realm).clients().get(client_id).roles().get(role_name).toRepresentation());
		user.roles().clientLevel(client_id).add(roleToAdd);
	}
	
	public void addClientRoleToUser(String userName, String role_name) {
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		String client_id = keycloak.realm(realm).clients().findByClientId("realm-management").get(0).getId();
		String userId = keycloak.realm(realm).users().search(userName).get(0).getId();
		UserResource user = keycloak.realm(realm).users().get(userId);
		List<RoleRepresentation> roleToAdd = new LinkedList<>();
		roleToAdd.add(keycloak.realm(realm).clients().get(client_id).roles().get(role_name).toRepresentation());
		user.roles().clientLevel(client_id).add(roleToAdd);
	}
	
	public void removeClientRoleToUser(String userName, String role_name) {
		Keycloak keycloak = KeycloakBuilder.builder().serverUrl(server_url).realm("master").username("admin")
                .password("admin").clientId("admin-cli").resteasyClient(new ResteasyClientBuilder().connectionPoolSize(10).build())
                .build();
		String userId = getUserId(userName);
	  	UserResource user = keycloak
	                    .realm(realm)
	                    .users()
	                    .get(userId);
	  	ClientRepresentation clientRep = keycloak
                .realm(realm)
                .clients()
                .findByClientId("gestion")
                .get(0);
	  	List<RoleRepresentation> roleToAdd = new LinkedList<>();
	    roleToAdd.add(keycloak.realm(realm).clients().get(clientRep.getId()).roles()
	                  .get(role_name)
	                  .toRepresentation()
	                 );
//	  user.roles().realmLevel().remove(roleToAdd);
	    user.roles().clientLevel("gestion").remove(roleToAdd);
	}
}
