package br.edu.utfpr.repository;

import br.edu.utfpr.model.Category;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class CategoryRepositoryTest {

    @Autowired
    TestEntityManager testEntityManager;
    @Autowired
    CategoryRepository categoryRepository;

    @AfterEach
    @BeforeEach
    public void cleanup() {
        categoryRepository.deleteAll();
    }

    @Test
    void findAllCategory() {
        Category category = Category.builder().name("Teste").build();
        testEntityManager.persist(category);
        List<Category> category1 = categoryRepository.findAll();
        assertThat(category1.size()).isEqualTo(1);
    }
}
