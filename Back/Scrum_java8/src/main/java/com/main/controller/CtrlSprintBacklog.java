package com.main.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.Exception.RessourceNotFoundException;
import com.main.model.Backlog;
import com.main.model.Sprint;
import com.main.model.SprintBacklog;
import com.main.repository.SprintBacklogRepository;
import com.main.repository.Sprint_repository;

@RestController
@RequestMapping("/SprintBacklog")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlSprintBacklog {
	
	@Autowired
	SprintBacklogRepository sprintBacklogRepo;
	@Autowired
	Sprint_repository sprintRepo;
	@Autowired
	WebSocketController socketCtrlr;
	
	@GetMapping("/list")
	public List<SprintBacklog> findAll() {
		return sprintBacklogRepo.findAll();
	}
	
	@PostMapping("/save")
	public SprintBacklog save(@RequestBody SprintBacklog sprintBacklog) {
		SprintBacklog spb =  sprintBacklogRepo.save(sprintBacklog);
		socketCtrlr.onReceiveMessage("backlog");
		return spb;
	}
	
	@GetMapping("/backlogID/{idBacklog}")
	public ResponseEntity<List<Sprint>> getSprintsAtBacklog(@PathVariable("idBacklog") long id) {
		List<SprintBacklog> lists = sprintBacklogRepo.findByBacklogId(id).orElseThrow(() -> new RessourceNotFoundException("Backlog not exist with id : " + id));
		List<Sprint> sprints = new ArrayList<Sprint>();
		for(SprintBacklog loop: lists) {
			sprints.add(loop.getSprint());
		}
		return ResponseEntity.ok(sprints);
	}
	
	@GetMapping("/sprintID/{idSprint}")
	public ResponseEntity<List<Backlog>> getBacklogsAtSprint(@PathVariable("idSprint") long id) {
		List<SprintBacklog> lists = sprintBacklogRepo.findBySprintIdSprint(id).orElseThrow(() -> new RessourceNotFoundException("Backlog not exist with id : " + id));
		List<Backlog> backlogs = new ArrayList<Backlog>();
		for(SprintBacklog loop: lists) {
			backlogs.add(loop.getBacklog());
		}
		return ResponseEntity.ok(backlogs);
	}
	
	@GetMapping("/projetID/{idProjet}")
	public ResponseEntity<List<SprintBacklog>> getBacklogByIdProjet(@PathVariable("idProjet") long id){
		List<SprintBacklog> sprintBacklogs = sprintBacklogRepo.findByProjetIdProjet(id).orElseThrow(() -> new RessourceNotFoundException("Employee not exist with id : " + id));
		return ResponseEntity.ok(sprintBacklogs);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id) {
		SprintBacklog spbkg = sprintBacklogRepo.findById(id).orElseThrow(() -> new RessourceNotFoundException("Backlog not exist with id : " + id));
		sprintBacklogRepo.delete(spbkg);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		socketCtrlr.onReceiveMessage("backlog");
		return ResponseEntity.ok(response);
	}
}
