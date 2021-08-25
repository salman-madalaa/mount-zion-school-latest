package com.zion.school.controller;

import com.zion.school.model.Student;
import com.zion.school.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

/**
 * Created by Lenovo on 01-03-2021.
 */
@RestController
@RequestMapping(value = "api/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @RequestMapping(value = "/new", method = RequestMethod.POST, produces = "application/json")
    public Student create(@RequestBody Student student) {
        return studentService.create(student);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Student> getAllStudents() {
        return studentService.getAll();
    }

    @RequestMapping(value = "/{registrationId}", method = RequestMethod.DELETE)
    public void delete(@PathVariable("registrationId") Integer registrationId) {
        studentService.delete(registrationId);
    }

    @RequestMapping(value = "/{registrationId}", method = RequestMethod.GET)
    public Student getStudent(@PathVariable("registrationId") Integer registrationId) {
        return studentService.get(registrationId);
    }

    @RequestMapping(value = "/{registrationId}", method = RequestMethod.PUT)
    public Student update(@PathVariable("registrationId") Integer registrationId, @RequestBody Student student) {
        return studentService.update(student);
    }

//    @RequestMapping(method = RequestMethod.GET)
//    public Page<Student> getAllStudentsByPage(PageRequest pageRequest){
//    	  Pageable pageable = pageRequestConverter.convert(pageRequest);
//        return studentService.getAllStudentsByPage(pageable);
//    }

    
    //----------------------Normal Students----------------------------

    /*----------- Get the Total Normal Students Count---------*/
    @RequestMapping(value = "/normal/all/count", method = RequestMethod.GET)
    public Integer getTotalStudentsCount() {
        return studentService.getTotalNormalStudentsCount();
    }
    
    /*----------- Get the Total Normal Students ---------*/
    @RequestMapping(value = "/normal/all", method = RequestMethod.GET)
    public List<Student> getTotalNormalStudents() {
        return studentService.getTotalNormalStudents();
    }

    /*
        Get the Students Count based on the class name
        like first class, second class, third class .... like wise
    */
    @RequestMapping(value = "/normal/{className}/classCount", method = RequestMethod.GET)
    public Integer getClassStudentsCount(@PathVariable("className") String className) {
        return studentService.getClassStudentsCount(className);
    }

    /*
       Get the Students based on the class name
       like first class, second class, third class .... like wise
   */
    @RequestMapping(value = "/normal/class/{className}", method = RequestMethod.GET)
    public List<Student> getIndividualClassStudents(@PathVariable("className") String className) {
        return studentService.getIndividualNormalClassStudents(className);
    }


    //----------------------RTE Student----------------------------

    /*----------- Get the Total RTE Students Count---------*/
    @RequestMapping(value = "/rte/all/count", method = RequestMethod.GET)
    public Integer getTotalRteStudentsCount() {
        return studentService.getTotalRteStudentsCount();
    }

    
    /*
       Get the RTE Students Count based on the class name
       like first class, second class, third class .... like wise
   */   
    @RequestMapping(value = "/rte/{className}/classCount", method = RequestMethod.GET)
    public Integer getRteClassStudentsCount(@PathVariable("className") String className) {
        return studentService.getClassRteStudentsCount(className);
    } 
    
    /*----------- Get the Total RTE Students Count---------*/
    @RequestMapping(value = "/rte/all", method = RequestMethod.GET)
    public List<Student> getTotalRteStudents() {
        return studentService.getTotalRteStudents();
    }


    /*
       Get the Rte Students based on the class name
       like first class, second class, third class .... like wise
   */
    @RequestMapping(value = "/rte/class/{className}", method = RequestMethod.GET)
    public List<Student> getIndividualRteClassStudents(@PathVariable("className") String className) {
        return studentService.getIndividualRteClassStudents(className);
    }

}
