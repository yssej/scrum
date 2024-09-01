package com.main.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class Projet_paramService {
	
	private final JdbcTemplate jdbcTemplate;
	
	private final KeycloakService service;

    @Autowired
    public Projet_paramService(JdbcTemplate jdbcTemplate,KeycloakService service) {
        this.jdbcTemplate = jdbcTemplate;
        this.service = service;
    }

    //@PostConstruct
    public void insertDataIfNotExist() {
    	
    	List<String> roles = service.getRoles();
    	List<String> param = new ArrayList<String>();
    	param.add("projet_param");
    	param.add("soustache_param");
    	param.add("sprint_param");
    	param.add("tache_param");
    	for(int i = 0; i < param.size(); i++) {
    		
    		for(int j = 0; j < roles.size(); j++) {
        		String role = roles.get(j);
        		String sql = "SELECT COUNT(*) FROM "+param.get(i)+" WHERE role = ?";
        		int count = jdbcTemplate.queryForObject(sql, Integer.class, role);
        		
        		if (count == 0) {
                    String insertSql = "INSERT INTO "+param.get(i)+" (role,creation,read,update,delete) VALUES (?,?,?,?,?)";
                    boolean faux = false;
                    jdbcTemplate.update(insertSql, role,faux,faux,faux,faux);
                }
        	}
    		
    	}
    }
}
