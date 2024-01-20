package com.project.fullstackbackend.repository;

import com.project.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User,Long> {
    boolean existsByUsername(String username);
    //boolean existsByEmail(String email);
}
