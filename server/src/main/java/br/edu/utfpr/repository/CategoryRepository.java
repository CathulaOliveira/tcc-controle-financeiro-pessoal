package br.edu.utfpr.repository;

import br.edu.utfpr.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
