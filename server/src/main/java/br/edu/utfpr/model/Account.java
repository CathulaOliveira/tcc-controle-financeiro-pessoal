package br.edu.utfpr.model;

import br.edu.utfpr.enums.TypeAccount;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(name = "account_seq", sequenceName = "account_id_seq", allocationSize = 1)
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "account_seq")
    private Long id;

    @Size(max = 250)
    private String name;

    @NotNull
    @Size(min = 6, max = 12)
    private String number;

    @NotNull
    @Size(min = 4, max = 4)
    private String agency;

    @NotNull
    @Size(min = 2, max = 255)
    private String bank;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeAccount type;

    @JsonIgnore
    private BigDecimal balance = BigDecimal.ZERO;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    protected User user;
}
