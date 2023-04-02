package br.edu.utfpr.repository;

import br.edu.utfpr.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //Select * from user where username = ''
    // @Query(value = "Select u From User as u where u.username=:username")
    User findByUsername(String username);
}
