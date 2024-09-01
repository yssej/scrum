package com.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.Fonctionnalite;

@Repository
public interface FonctionnaliteRepository extends JpaRepository<Fonctionnalite, Long> {
	
	Optional<Fonctionnalite[]> findByBacklogId(long projet);
	Optional<Fonctionnalite[]> findByProjetIdProjet(long projet);
}
