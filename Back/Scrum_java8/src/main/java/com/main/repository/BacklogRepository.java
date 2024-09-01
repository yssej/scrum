package com.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.Backlog;

@Repository
public interface BacklogRepository extends JpaRepository<Backlog, Long> {
	
	Optional<Backlog[]> findByProjetIdProjetOrderByPositionAsc(Long projet);
	Optional<Backlog[]> findBySprintIdSprint(Long sprint);
	long countByEtatNotAndProjetIdProjet(String etat,long idProjet);
	long countByProjetIdProjet(long idProjet);
}
