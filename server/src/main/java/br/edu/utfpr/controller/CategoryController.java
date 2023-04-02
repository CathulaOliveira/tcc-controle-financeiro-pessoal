package br.edu.utfpr.controller;

import br.edu.utfpr.model.Category;
import br.edu.utfpr.service.CategoryService;
import br.edu.utfpr.service.CrudService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("categories")
@RequiredArgsConstructor
public class CategoryController extends CrudController<Category, Long> {

    private final CategoryService categoryService;

    @Override
    protected CrudService<Category, Long> getService() {
        return this.categoryService;
    }
}
