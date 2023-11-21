package br.edu.utfpr.controller;

import br.edu.utfpr.model.Account;
import br.edu.utfpr.model.Category;
import br.edu.utfpr.service.CategoryService;
import br.edu.utfpr.service.CrudService;
import br.edu.utfpr.service.impl.CategoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("categories")
@RequiredArgsConstructor
public class CategoryController extends CrudController<Category, Long> {

    private final CategoryServiceImpl categoryService;

    @Override
    protected CrudService<Category, Long> getService() {
        return this.categoryService;
    }

    @GetMapping("find-by-status-ativo")
    public List<Category> findByStatusAtivo() {
        return this.categoryService.findByStatusAtivo();
    }
}
