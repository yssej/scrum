package com.main.controller;

import java.io.IOException;
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
import com.main.model.Notification;
import com.main.repository.Notification_repository;

@RestController
@RequestMapping("/Notification")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlNotification {
	
	@Autowired
	Notification_repository notification_repository;
	
	@Autowired
	WebSocketController socketCtrlr;
	
	@GetMapping("/list")
	public List<Notification> findAll() {
		return notification_repository.findAll();
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<Notification> getNotificationById(@PathVariable("id") Long id){
		Notification notification = notification_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(notification);
	}
	
	@PostMapping("/save")
	public Notification create(@RequestBody Notification notification) throws JsonParseException,JsonMappingException,IOException {
		Notification ans = notification_repository.save(notification);
		System.out.println(notification.getDestinataire().getId());
		socketCtrlr.onReceiveMessage(notification.getDestinataire().getId());
		return ans;
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Notification> update(@PathVariable("id") long id,@RequestBody Notification notificationDetails) {
		Notification notification = notification_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		
		notification.setNotification(notificationDetails.getNotification());
		notification.setTemp(notificationDetails.getTemp());
		notification.setIsread(notificationDetails.isIsread());
		notification.setDestinataire(notificationDetails.getDestinataire());
		
		Notification updatednotification = notification_repository.save(notification);
		return ResponseEntity.ok(updatednotification);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id){
		Notification notification = notification_repository.findById(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		
		notification_repository.delete(notification);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/destinataireID/{id}")
	public ResponseEntity<Notification[]> getDestinataireById(@PathVariable("id") String id){
		Notification[]notifications = notification_repository.findByDestinataireIdOrderByTempDesc(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(notifications);
	}
	
	@PutMapping("/readNotificationByUserID/{id}")
	public ResponseEntity<List<Notification>> readNotificationByUserID(@PathVariable("id") String id){
		Notification[]notifications = notification_repository.findByDestinataireIdOrderByTempDesc(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		List<Notification> notificationsUpdated = new ArrayList<Notification>();
		for(Notification notification: notifications) {
			notification.setNew(false);
			notificationsUpdated.add(notification);
		}
		notification_repository.saveAll(notificationsUpdated);
		return ResponseEntity.ok(notificationsUpdated);
	}
}
