package domain

import java.util.Properties
import javax.mail.Message
import javax.mail.MessagingException
import javax.mail.Session
import javax.mail.Transport
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeMessage
import org.uqbar.commons.model.exceptions.UserException

class EmailSender {

	String email = "a.la.carte2019unsam@gmail.com"
	String clave = "alacarte2019unsam"

	def void enviarMail(String destinatario, String asunto, String mensaje) {

		val Properties props = System.getProperties();
		props.put("mail.smtp.host", "smtp.gmail.com"); // El servidor SMTP de Google
		props.put("mail.smtp.user", this.email); // El usuario de la cuenta
		props.put("mail.smtp.clave", this.clave); // La clave de la cuenta
		props.put("mail.smtp.auth", "true"); // Usar autenticación mediante usuario y clave
		props.put("mail.smtp.starttls.enable", "true"); // Para conectar de manera segura al servidor SMTP
		props.put("mail.smtp.port", "587"); // El puerto SMTP seguro de Google
		val Session session = Session.getDefaultInstance(props);
		val MimeMessage message = new MimeMessage(session);

		try {
			val internetAdress = new InternetAddress(email)
			message.setFrom(internetAdress)
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(destinatario)); // Se podrían añadir varios de la misma manera
			message.setSubject(asunto);
			message.setText(mensaje)
			val Transport transport = session.getTransport("smtp")
			transport.connect("smtp.gmail.com", this.email, this.clave);
			transport.sendMessage(message, message.getAllRecipients());
			transport.close
		} catch (MessagingException e) {
			throw new UserException(e.getMessage)
		}
	}

}
