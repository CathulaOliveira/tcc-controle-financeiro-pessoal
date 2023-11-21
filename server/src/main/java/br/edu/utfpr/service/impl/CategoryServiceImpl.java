package br.edu.utfpr.service.impl;

import br.edu.utfpr.enums.Status;
import br.edu.utfpr.model.Account;
import br.edu.utfpr.model.Category;
import br.edu.utfpr.model.User;
import br.edu.utfpr.repository.CategoryRepository;
import br.edu.utfpr.service.CategoryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl
        extends CrudServiceImpl<Category, Long>
        implements CategoryService {

    private CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    protected JpaRepository<Category, Long> getRepository() {
        return this.categoryRepository;
    }

    public List<Category> findByStatusAtivo() {
        return categoryRepository.findByStatusEquals(Status.ATIVO);
    }
}
