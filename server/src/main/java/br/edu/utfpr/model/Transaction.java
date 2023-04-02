package br.edu.utfpr.model;

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
public class Transaction {

    @Id
    @GeneratedValue
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
    @Column(nullable = false)
    private BigDecimal price = BigDecimal.ZERO;

    @Size(max = 250)
    private String description;

    @NotNull
    private LocalDate date;

    @NotNull
    @Enumerated(EnumType.STRING)
    private TypeTransaction type;
}
