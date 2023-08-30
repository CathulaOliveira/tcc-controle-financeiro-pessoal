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
@SequenceGenerator(name = "goal_seq", sequenceName = "goal_id_seq", allocationSize = 1)
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "goal_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    protected User user;

    @NotNull
    @Size(max = 250)
    private String description;

    @NotNull
    @Column(name = "type_transaction_expected")
    private TypeTransaction typeTransactionExpected;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "type_goal_id", referencedColumnName = "id")
    private TypeGoal type;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    private LocalDate startDate;

    private LocalDate endDate;

    private BigDecimal price;

    private BigDecimal progress;
}
