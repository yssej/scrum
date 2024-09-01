package com.main.repository;

import org.springframework.stereotype.Repository;

import com.main.model.Fichier;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface Fichier_repository extends JpaRepository<Fichier, Long> {
	Optional<Fichier[]> findByProjetIdProjetAndCommentaireIsNotNull(Long projet);
	Optional<Fichier[]> findByProjetIdProjet(Long projet);
	Optional<Fichier[]> findByTacheIdTache(Long tache);
	Optional<Fichier[]> findByCommentaireIdCommentaire(Long commentaire);
	Optional<Fichier> findByUserId(String id);
	Optional<Fichier[]> findByProjetIsNotNull();
	Optional<Fichier[]> findByTacheIsNotNull();
	Optional<Fichier[]> findByCommentaireIsNotNull();
	Optional<Fichier[]> findByUserIsNotNull();
}
