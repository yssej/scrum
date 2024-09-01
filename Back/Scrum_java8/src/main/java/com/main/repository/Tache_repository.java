package com.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.Tache;

@Repository
public interface Tache_repository extends JpaRepository<Tache, Long> {
	Optional<Tache[]> findByProjetIdProjetOrderByRangAsc(Long projet);
	Optional<Tache[]> findByIdResponsableId(String user);
	Optional<Tache[]> findByIdRapporteurId(String user);
	Optional<Tache[]> findByFonctionnaliteId(Long id);
	Optional<Tache[]> findByFonctionnaliteBacklogId(Long id);
	List<Tache> findAllByOrderByDateDebutAsc();
	List<Tache> findAllByOrderByDateDebutDesc();
	List<Tache> findAllByOrderByRangAsc();
	List<Tache> findByNom(String nom);
	List<Tache> findByEtat(String etat);
	long countByEtat(String etat);
	long countTachesByIdResponsableIdAndEtat(String resp,String etat);
}
