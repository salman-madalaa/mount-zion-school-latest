package com.zion.school.controller;



import com.zion.school.model.StudentImage;
import com.zion.school.repo.StudentImageRepo;
import com.zion.school.service.StudentImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

/**
 * Created by Lenovo on 20-08-2021.
 */
@RestController
@RequestMapping(value = "api/studentImage")
public class StudentImageController {

    @Autowired
    private StudentImageService studentImageService;
    @Autowired
    private StudentImageRepo studentImageRepo;



    @PutMapping(value="/{regId}/update")
    public StudentImage updateImage(@PathVariable("regId") Integer registrationId ,@RequestParam("imageFile") MultipartFile file) throws IOException {
        StudentImage img2 = null;
        Optional<StudentImage> studentImage = studentImageRepo.findById(registrationId);
        if(studentImage.isPresent()){
            System.out.println("Original Image Byte Size - " + file.getBytes().length);
            StudentImage img = new StudentImage(file.getOriginalFilename(), file.getContentType(),
                    compressBytes(file.getBytes()));
            img.setId(registrationId);
            StudentImage img1 = studentImageRepo.save(img);

            img2 = new StudentImage(img1.getId(),img1.getName(), img1.getType(),
                    decompressBytes(img1.getPicByte()));
        }
//        return ResponseEntity.status(HttpStatus.OK);
        return img2;
    }


    @DeleteMapping(value="/{regId}/delete")
    public void deleteImage(@PathVariable("regId") Integer registrationId) throws IOException {
        Optional<StudentImage> studentImage = studentImageRepo.findById(registrationId);
        if(studentImage != null){
            studentImageRepo.deleteById(registrationId);
        }

    }




    @PostMapping(value="/{regId}/upload")
    public StudentImage uplaodImage(@PathVariable("regId") Integer registrationId ,@RequestParam("imageFile") MultipartFile file) throws IOException {
        StudentImage img2 = null;
        Optional<StudentImage> studentImage = studentImageRepo.findById(registrationId);
        if(!studentImage.isPresent()){
            System.out.println("Original Image Byte Size - " + file.getBytes().length);
            StudentImage img = new StudentImage(file.getOriginalFilename(), file.getContentType(),
                    compressBytes(file.getBytes()));
            img.setId(registrationId);
            StudentImage img1 = studentImageRepo.save(img);

             img2 = new StudentImage(img1.getId(),img1.getName(), img1.getType(),
                    decompressBytes(img1.getPicByte()));
        }
        // return ResponseEntity.status(HttpStatus.OK);

        return img2;
    }

    @GetMapping(path = {"/get/{regId}"})
    public StudentImage getImage(@PathVariable("regId") Integer regId) throws IOException {
        final Optional<StudentImage> retrievedImage = studentImageRepo.findById(regId);
        StudentImage img = new StudentImage(retrievedImage.get().getId(),retrievedImage.get().getName(), retrievedImage.get().getType(),
                decompressBytes(retrievedImage.get().getPicByte()));
        return img;
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}


