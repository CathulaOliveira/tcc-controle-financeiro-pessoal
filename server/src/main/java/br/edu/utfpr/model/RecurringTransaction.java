package br.edu.utfpr.model;

import br.edu.utfpr.enums.PaymentStatus;
import br.edu.utfpr.enums.TypeTransaction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "recurring_transaction_seq", sequenceName = "recurring_transaction_id_seq", allocationSize = 1)
@Table(name = "recurring_transaction")
public class RecurringTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recurring_transaction_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_origin_id", referencedColumnName = "id")
    private Account accountOrigin;

    @ManyToOne
    @JoinColumn(name = "account_destination_id", referencedColumnName = "id")
    private Account accountDestination;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @NotNull
    private BigDecimal price = BigDecimal.ZERO;

    @Size(max = 250)
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TypeTransaction type;

    private LocalDate dueDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus  = PaymentStatus.PENDENTE;

}
