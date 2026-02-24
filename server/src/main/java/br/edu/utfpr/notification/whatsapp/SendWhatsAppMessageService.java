package br.edu.utfpr.notification.whatsapp;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.stereotype.Service;

@Service
public class SendWhatsAppMessageService {

    public static final String ACCOUNT_SID = "account_sid";
    public static final String AUTH_TOKEN = "auth_token";
    public static final String PHONE_NUMBER_ORIGIN = "+origin";

    public void sendMsg(String msg, String phoneNumberDentination) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.creator(
                        new PhoneNumber("whatsapp:+55"+phoneNumberDentination),
                        new PhoneNumber("whatsapp:+"+PHONE_NUMBER_ORIGIN),
                        msg)
                .create();
    }
}
