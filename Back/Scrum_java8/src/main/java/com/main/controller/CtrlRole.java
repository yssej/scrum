package com.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.service.KeycloakService;

@RestController
@RequestMapping(path = "/Role")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlRole {
	
	@Autowired
	KeycloakService service;
	
	@GetMapping("/allRoles")
    public List<String> getRoles(){
        List<String> user = service.getRoles();
        return user;
    }
	
	@GetMapping("/allClientRoles")
    public List<String> getClientRoles(){
        List<String> user = service.getAllClientRoles("gestion");
        return user;
    }
	
	@PostMapping("/save/{roleName}")
	public void save(@PathVariable("roleName") String role){
		service.addRealmRole(role);
	}
	
	@PutMapping("/addRole/{user}/{role}")
	public void addRole(@PathVariable("user") String user,@PathVariable("role") String role) {
		service.addRealmRoleToUser(user, role);
	}
	
	@PostMapping("/saveGestionClientRole/{roleName}")
	public void saveGestionClientRole(@PathVariable("roleName") String role){
		service.addGestionClientRole(role);
	}
	
	@PutMapping("/addClientRole/{user}/{role}")
	public void addClientRole(@PathVariable("user") String user,@PathVariable("role") String role) {
		service.addClientRoleToUser("gestion",user, role);
	}
	
	@PutMapping("/removeRole/{user}/{role}")
	public void removeRole(@PathVariable("user") String user,@PathVariable("role") String role) {
		service.removeRealmRoleToUser(user, role);
	}
	
	@PutMapping("/removeClientRole/{user}/{role}")
	public void removeClientRole(@PathVariable("user") String user,@PathVariable("role") String role) {
		service.removeClientRoleToUser(user, role);
	}
}
