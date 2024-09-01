package com.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.SprintBacklog;

@Repository
public interface SprintBacklogRepository extends JpaRepository<SprintBacklog, Long> {
	Optional<List<SprintBacklog>> findByBacklogId(long id);
	Optional<List<SprintBacklog>> findBySprintIdSprint(long id);
	Optional<List<SprintBacklog>> findByProjetIdProjet(long id);
}
