package br.edu.utfpr.notification.whatsapp;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class SendWhatsAppMessage {

    public static final String ACCOUNT_SID = "";
    public static final String AUTH_TOKEN = "";

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                        new PhoneNumber("whatsapp:+"), // numero real
                        new PhoneNumber("whatsapp:+"), // numero da api
                        "Olá Cathula, vc não possui contas com vencimento próximo")
                .create();
        System.out.println(message);
    }
}
