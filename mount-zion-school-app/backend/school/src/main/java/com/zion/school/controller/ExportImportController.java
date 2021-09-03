package com.zion.school.controller;

import com.zion.school.helper.ExcelHelper;
import com.zion.school.message.ResponseMessage;
import com.zion.school.model.Student;
import com.zion.school.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

/**
 * Created by Lenovo on 28-08-2021.
 */
@RestController
@RequestMapping(value = "api/exportimport")
public class ExportImportController {

    @Autowired
    ExcelService fileService;

    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (ExcelHelper.hasExcelFormat(file)) {
            try {
                fileService.save(file);

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }

        message = "Please upload an excel file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }

    @GetMapping("/tutorials")
    public ResponseEntity<List<Student>> getAllTutorials() {
        try {
            List<Student> tutorials = fileService.getAllStudents();

            if (tutorials.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(tutorials, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> getFile() {
        String filename = "tutorials.xlsx";
        InputStreamResource file = new InputStreamResource(fileService.load());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }


    //---------------- get the excel based on the class name -------------------------
    @GetMapping("/download/{isRteStudent}/{classname}")
    public ResponseEntity<Resource> getExcelIndividualClassname(@PathVariable("isRteStudent")Boolean isRteStudent,@PathVariable("classname")String classname) {
        String filename = classname+"class.xlsx";
        InputStreamResource file = new InputStreamResource(fileService.loadStudents(isRteStudent, classname));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }


}
