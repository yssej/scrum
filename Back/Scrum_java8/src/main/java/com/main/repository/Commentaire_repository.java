package com.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.Commentaire;

@Repository
public interface Commentaire_repository extends JpaRepository<Commentaire, Long> {
	Optional<Commentaire[]> findByTacheIdTache(Long tache);
	Optional<Commentaire[]> findByCreateurId(String user);
	Optional<Commentaire[]> findByProjetIdProjet(Long commentaire);
	Optional<Commentaire[]> findByProjetIdProjetOrderByTempDesc(Long projet);
	Optional<Commentaire[]> findByBacklogId(Long backlog);
	Optional<Commentaire[]> findByFonctionnaliteId(Long fonction);
	List<Commentaire> findByOrderByTempDesc();
	List<Commentaire> findByOrderByTempAsc();
}
