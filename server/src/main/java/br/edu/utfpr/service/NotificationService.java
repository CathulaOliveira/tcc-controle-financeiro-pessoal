package br.edu.utfpr.service;

import br.edu.utfpr.model.RecurringTransaction;
import br.edu.utfpr.model.User;
import br.edu.utfpr.notification.whatsapp.SendWhatsAppMessageService;
import br.edu.utfpr.service.impl.RecurringTransactionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final RecurringTransactionServiceImpl recurringTransactionService;
    private final SendWhatsAppMessageService sendWhatsAppMessageService;
    private final UserService userService;

    public void buscarRecurringTransationNotification() {
        User user = userService.getUserLogged();
        List<RecurringTransaction> recurringTransaction = recurringTransactionService.findByDueDate();
        if (recurringTransaction != null && !recurringTransaction.isEmpty()) {
            StringBuilder msg = new StringBuilder();
            recurringTransaction.forEach( item -> {
                String msg1 = item.getDescription() + " no valor de " + item.getPrice();
                msg.append(msg1);
            });
            sendWhatsAppMessageService.sendMsg(msg.toString(), user.getTelephone());
        }
    }
}
