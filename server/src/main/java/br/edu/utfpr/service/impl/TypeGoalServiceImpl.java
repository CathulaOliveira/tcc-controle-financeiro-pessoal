package br.edu.utfpr.service.impl;

import br.edu.utfpr.model.TypeGoal;
import br.edu.utfpr.repository.TypeGoalRepository;
import br.edu.utfpr.service.TypeGoalService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TypeGoalServiceImpl
        extends CrudServiceImpl<TypeGoal, Long>
        implements TypeGoalService {

    private TypeGoalRepository typeGoalRepository;

    public TypeGoalServiceImpl(TypeGoalRepository typeGoalRepository) {
        this.typeGoalRepository = typeGoalRepository;
    }

    @Override
    protected JpaRepository<TypeGoal, Long> getRepository() {
        return this.typeGoalRepository;
    }
}
