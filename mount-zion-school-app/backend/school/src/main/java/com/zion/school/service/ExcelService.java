package com.zion.school.service;


import com.zion.school.helper.ExcelHelper;
import com.zion.school.model.Student;
import com.zion.school.repo.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ExcelService {
  @Autowired
  StudentRepository studentRepository;

  public void save(MultipartFile file) {
    try {
      List<Student> students = ExcelHelper.excelToStudents(file.getInputStream());
      studentRepository.saveAll(students);
    } catch (IOException e) {
      throw new RuntimeException("fail to store excel data: " + e.getMessage());
    }
  }

  public ByteArrayInputStream load() {
    List<Student> tutorials = studentRepository.findAll();

    ByteArrayInputStream in = ExcelHelper.studentsToExcel(tutorials);
    return in;
  }

  public List<Student> getAllStudents() {
    return studentRepository.findAll();
  }
}
