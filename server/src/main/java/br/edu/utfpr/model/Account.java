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
public class Account {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Size(min = 2, max = 6)
    private String number;

    @NotNull
    @Size(min = 2, max = 6)
    private String agency;

    @NotNull
    @Size(min = 2, max = 1024)
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
