package com.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.main.model.Notification;

@Repository
public interface Notification_repository extends JpaRepository<Notification, Long> {
	Optional<Notification[]> findByDestinataireIdOrderByTempDesc(String user);
}
