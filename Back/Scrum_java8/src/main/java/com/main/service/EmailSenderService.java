package com.main.service;

import java.io.File;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;


@Service
public class EmailSenderService {

	@Autowired
	private JavaMailSender javamailSender;
	
	@Value("${spring.mail.username}")
    private String mail;
	
	public void sendMailWithAttachement(String sender,String toEmail,String body,String subject,String attachement) throws MessagingException {
		MimeMessage mimeMessage = javamailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);
		
		mimeMessageHelper.setFrom(mail);
		mimeMessageHelper.setTo(toEmail);
		mimeMessageHelper.setText(body);
		mimeMessageHelper.setSubject(subject);
		
		if(attachement != null) {
			FileSystemResource fileSystemResource = new FileSystemResource(new File(attachement));
			mimeMessageHelper.addAttachment(fileSystemResource.getFilename(), fileSystemResource);
		}
		javamailSender.send(mimeMessage);
		
		System.out.println("Mail sent with successfully");
	}
}
