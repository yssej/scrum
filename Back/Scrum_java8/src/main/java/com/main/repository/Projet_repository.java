package com.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.Projet;

@Repository
public interface Projet_repository extends JpaRepository<Projet, Long> {
	Optional<Projet[]> findByIdCreateurId(String user);
//	Optional<Projet[]> findByIdResponsableId(String user);
	List<Projet> findAllByOrderByDateCreationAsc();
	List<Projet> findAllByOrderByDateCreationDesc();
	List<Projet> findByNom(String nom);
	List<Projet> findByEtat(String etat);
	long countByEtat(String etat);
}
