package br.edu.utfpr.notification.whatsapp;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class SendWhatsAppMessage {

    public static final String ACCOUNT_SID = "account_sid";
    public static final String AUTH_TOKEN = "auth_token";

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                        new PhoneNumber("whatsapp:+numero"), // numero real
                        new PhoneNumber("whatsapp:+api"), // numero da api
                        "Olá Cathula, sua transação recorrente Agua vence hoje")
                .create();
        System.out.println(message);
    }
}
