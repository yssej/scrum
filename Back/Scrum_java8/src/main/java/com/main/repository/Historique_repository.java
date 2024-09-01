package com.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.Historique;

@Repository
public interface Historique_repository extends JpaRepository<Historique, Long> {
	Optional<Historique[]> findByProjetIdProjet(Long projet);

}
