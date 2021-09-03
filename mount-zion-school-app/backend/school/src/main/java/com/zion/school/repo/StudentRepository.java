package com.zion.school.repo;

import com.zion.school.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
/**
 * Created by Lenovo on 01-03-2021.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student,Integer> {

    List<Student> findByClassToJoin(String className);

  //------------------------------Rte Students--------------------------
    List<Student> findByRteStudentTrueAndClassToJoin(String className);

    List<Student> findByRteStudentTrue();

//------------------------------normal Students--------------------------
	List<Student> findByClassToJoinAndRteStudentFalse(String className);

	List<Student> findByRteStudentFalse();


}


