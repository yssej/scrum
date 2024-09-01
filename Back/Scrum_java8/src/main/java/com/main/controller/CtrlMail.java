package com.main.controller;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.model.MailContent;
import com.main.service.EmailSenderService;

@RestController
@RequestMapping(path = "/Mail")
@CrossOrigin(origins="http://localhost:4200")
public class CtrlMail {
	
	@Autowired
	EmailSenderService emailSenderService;
	
	@PostMapping("/send")
	public void sendMail(@RequestBody MailContent mail) {
		
		try {
			emailSenderService.sendMailWithAttachement("jessyowen48@gmail.com",mail.getDestinataire(),mail.getBody(),mail.getObject(),mail.getRoot());
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
