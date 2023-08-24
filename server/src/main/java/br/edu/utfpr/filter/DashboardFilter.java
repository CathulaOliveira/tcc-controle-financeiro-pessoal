package br.edu.utfpr.filter;

import br.edu.utfpr.enums.TypeTransaction;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class DashboardFilter {

    private String month;
    private String year;
    private List<Long> accounts;
    private List<Long> categories;
    private TypeTransaction type;
    private LocalDate dateStart;
    private LocalDate dateFinish;
}
