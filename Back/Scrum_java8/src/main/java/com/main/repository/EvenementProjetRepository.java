package com.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.EvenementProjet;

@Repository
public interface EvenementProjetRepository extends JpaRepository<EvenementProjet, Long>{
	Optional<EvenementProjet[]> findByProjetIdProjetOrderByMomentAsc(long idProjet);
	List<EvenementProjet> findAllByOrderByMomentAsc();
}
