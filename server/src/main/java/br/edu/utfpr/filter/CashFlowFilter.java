package br.edu.utfpr.filter;

import br.edu.utfpr.enums.TypeTransaction;
import br.edu.utfpr.model.Account;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class CashFlowFilter {

    private String month;
    private String year;
    private List<Long> accounts;
    private TypeTransaction type;
    private LocalDate dateStart;
    private LocalDate dateFinish;
}
