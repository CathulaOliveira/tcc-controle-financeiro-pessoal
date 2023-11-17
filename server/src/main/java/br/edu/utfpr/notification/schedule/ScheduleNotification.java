package br.edu.utfpr.notification.schedule;

import br.edu.utfpr.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@EnableScheduling
public class ScheduleNotification {

    private final NotificationService notificationService;

    @Scheduled(cron = "00 47 22 * * ?") // Agende a execução todos os dias às 8 da manhã
    public void executarRotina() {
        notificationService.buscarRecurringTransationNotification();
    }
}
