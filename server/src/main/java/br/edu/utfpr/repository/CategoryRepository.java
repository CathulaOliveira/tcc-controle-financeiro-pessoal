package br.edu.utfpr.repository;

import br.edu.utfpr.enums.Status;
import br.edu.utfpr.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByStatusEquals(Status status);
}
