package com.zion.school.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Lenovo on 20-08-2021.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString
@Table(name = "STUDENT_IMAGE")
public class StudentImage implements Serializable {

//    @Id
//    @GeneratedValue
//    @Column(name="Student_Image_Id")
//    private int id;
//
//    @Column(name = "IMAGE", length = 1000)
//    private byte[] image;



    public StudentImage(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Lob
    @Column(name = "picByte", columnDefinition="BLOB")
    private byte[] picByte;


}
