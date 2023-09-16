package br.edu.utfpr.notification.whatsapp;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;

@Service
public class SendWhatsAppMessageService {

    public static final String ACCOUNT_SID = "AC439ca355818b7d1a7068c438617ec11d";
    public static final String AUTH_TOKEN = "aa3cb7af2f51197f8a53331d98fe82d9";

    public void sendMsg(String msg) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                        new PhoneNumber("whatsapp:+554691336424"),
                        new PhoneNumber("whatsapp:+14155238886"),
                        "Olá Cathula, vc possui contas com vencimento na data de HOJE: " + msg)
                .create();
        System.out.println(message);
    }
}
