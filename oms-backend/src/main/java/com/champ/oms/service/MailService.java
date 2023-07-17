package com.champ.oms.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.SendFailedException;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class MailService {
    @Autowired
    private JavaMailSender emailSender;

    //    public void sendEmail(String recipientEmail, String subject, String content) {
//        SimpleMailMessage mailMessage = new SimpleMailMessage();
//
//        String htmlContent = "<!DOCTYPE html>"
//                + "<html>"
//                + "<head>"
//                + "<style>"
//                + "body {font-family: Arial, sans-serif;}"
//                + ".container {max-width: 600px; margin: 0 auto; padding: 20px;}"
//                + ".button {display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;}"
//                + "</style>"
//                + "</head>"
//                + "<body>"
//                + "<div class=\"container\">"
//                + "<h1>" + subject + "</h1>"
//                + "<p>" + content + "</p>"
//                + "<a href=\"https://example.com/login\" class=\"button\">Go to Login Page</a>"
//                + "</div>"
//                + "</body>"
//                + "</html>";
//
//        mailMessage.setFrom("oms.reset.service@gmail.com");
//        mailMessage.setTo(recipientEmail);
//        mailMessage.setSubject(subject);
//        mailMessage.setText(htmlContent);
//
//        this.emailSender.send(mailMessage);
//    }
    public void sendEmail(String recipientEmail, String subject, String content) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        String htmlContent = "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "body {font-family: Arial, sans-serif;}"
                + ".container {max-width: 600px; margin: 0 auto; padding: 20px;}"
                + ".button {display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;}"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class=\"container\">"
                + "<h1>" + subject + "</h1>"
                + "<p>" + content + "</p>"
                + "<a href=\"https://example.com/login\" class=\"button\">Go to Login Page</a>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            helper.setFrom("oms.reset.service@gmail.com");

            emailSender.send(message);
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException(e);
        }
    }

}


