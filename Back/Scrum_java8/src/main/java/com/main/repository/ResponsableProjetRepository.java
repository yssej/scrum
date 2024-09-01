package com.main.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.ResponsableProjet;

@Repository
public interface ResponsableProjetRepository extends JpaRepository<ResponsableProjet, Long> {
	Optional<ResponsableProjet[]> findByProjetIdProjet(long projet);
	Optional<ResponsableProjet[]> findByProjetIdProjetAndBacklogIsNullAndTacheIsNullAndFonctionnaliteIsNull(long projet);
	Optional<ResponsableProjet[]> findByProjetIdProjetAndBacklogIsNotNullAndTacheIsNullAndFonctionnaliteIsNull(long projet);
	Optional<ResponsableProjet[]> findByBacklogIdAndFonctionnaliteIsNotNullAndProjetIsNullAndTacheIsNull(long backlog);
	Optional<ResponsableProjet[]> findByFonctionnaliteIdAndTacheIsNotNullAndBacklogIsNullAndProjetIsNull(long fonctionnalite);
	Optional<ResponsableProjet[]> findByTacheIdTache(long tache);
	Optional<ResponsableProjet[]> findByFonctionnaliteId(long fonctionnalite);
	Optional<ResponsableProjet[]> findByProjetIdProjetAndFonctionnaliteIsNotNull(long projet);
	Optional<ResponsableProjet[]> findByBacklogId(long backlog);
	Optional<ResponsableProjet[]> findByIdResponsableId(String id);
	Optional<ResponsableProjet[]> findByIdProductOwnerId(String id);
	Optional<ResponsableProjet[]> findByIdScrumMasterId(String id);
	Optional<ResponsableProjet[]> findByIdCreateurId(String id);
	Optional<ResponsableProjet[]> findByIdDevellopersId(String id);
	List<ResponsableProjet> findByIdProductOwnerIdAndProjetIdProjet(String userId,long idProjet);
	List<ResponsableProjet> findByIdResponsableIdOrIdProductOwnerIdOrIdScrumMasterIdOrIdDevellopersIdAndProjetIsNotNullAndBacklogIsNullAndFonctionnaliteIsNullAndTacheIsNull(String userId0,String userId2,String userId3,String userId1);
	List<ResponsableProjet> findByIdResponsableIdOrIdProductOwnerIdOrIdScrumMasterIdOrIdDevellopersIdAndProjetIsNotNullAndBacklogIsNotNullAndFonctionnaliteIsNullAndTacheIsNull(String userId0,String userId2,String userId3,String userId1);
	List<ResponsableProjet> findByIdResponsableIdOrIdProductOwnerIdOrIdScrumMasterIdOrIdDevellopersIdAndProjetIsNotNullAndBacklogIsNotNullAndFonctionnaliteIsNotNullAndTacheIsNull(String userId0,String userId2,String userId3,String userId1);
	List<ResponsableProjet> findByIdResponsableIdOrIdProductOwnerIdOrIdScrumMasterIdOrIdDevellopersIdAndProjetIsNotNullAndBacklogIsNotNullAndFonctionnaliteIsNotNullAndTacheIsNotNull(String userId0,String userId2,String userId3,String userId1);
	List<ResponsableProjet> findByIdResponsableIdOrIdProductOwnerIdOrIdScrumMasterIdOrIdDevellopersId(String userId0,String userId2,String userId3,String userId1);
}
