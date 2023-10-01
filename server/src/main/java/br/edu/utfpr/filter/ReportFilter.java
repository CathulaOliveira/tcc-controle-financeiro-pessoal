package br.edu.utfpr.filter;

import br.edu.utfpr.enums.TypeTransaction;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class ReportFilter {

    private LocalDate dateInit;
    private LocalDate dateFinish;
    private List<Long> accounts;
    private List<Long> categories;
    private List<TypeTransaction> type;
}
