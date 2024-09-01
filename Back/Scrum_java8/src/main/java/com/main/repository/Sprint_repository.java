package com.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.Sprint;

@Repository
public interface Sprint_repository extends JpaRepository<Sprint, Long> {
	Optional<Sprint[]> findByIdCreateurId(String user);
	Optional<Sprint[]> findByProjetIdProjet(Long projet);
}
