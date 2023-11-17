package br.edu.utfpr.notification.whatsapp;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class SendWhatsAppMessage {

    public static final String ACCOUNT_SID = "AC439ca355818b7d1a7068c438617ec11d";
    public static final String AUTH_TOKEN = "aa3cb7af2f51197f8a53331d98fe82d9";

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                        new PhoneNumber("whatsapp:+554691336424"), // numero real
                        new PhoneNumber("whatsapp:+14155238886"), // numero da api
                        "Olá Cathula, sua transação recorrente Agua vence hoje")
                .create();
        System.out.println(message);
    }
}
