package com.champ.oms.service;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    @Autowired
    private JavaMailSender emailSender;

    public void sendEmail(String recipientEmail, String subject, String content) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        String htmlContent = "<!DOCTYPE html>"
                + "<html>"
                + "<head>"
                + "<style>"
                + "body {font-family: Arial, sans-serif;}"
                + ".card {max-width: 600px; margin: 0 auto; padding: 20px; background-color: #2196F3; border-radius: 4px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16), 0 2px 12px rgba(0, 0, 0, 0.12);}"
                + ".button {display: inline-block; background-color: white; color: #2196F3; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 500;}"
                + ".button a {color: #2196F3; text-decoration: none;}"
                + ".button:hover {background-color: #1976D2; color: white;}"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class=\"card\">"
                + "<h1 style=\"color: white\">" + subject + "</h1>"
                + "<p style=\"color: white\">Login your account using this temporary password: " + content + "</p>"
                + "<a href=\"http://localhost:4200/login\" class=\"button\"><span style=\"text-decoration: none;\">Go to Login Page</span></a>"
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


