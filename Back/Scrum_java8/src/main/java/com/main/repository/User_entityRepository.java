package com.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.User_entity;

@Repository
public interface User_entityRepository extends JpaRepository<User_entity, String> {
	User_entity findTop1ByOrderByCreatedtimestampDesc();
}
