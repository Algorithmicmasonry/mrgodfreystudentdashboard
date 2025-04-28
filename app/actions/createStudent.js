"use server"

import { Student } from "@/db/models/studentSchema";
import { connectToDB } from "@/db/connectToDb";

/* 
cgpa
: 
"4.88"
department
: 
"Computer Science"
email
: 
"oamenemmanuel22@gmail.com"
gender
: 
"Male"
level
: 
"100"
matNo
: 
"cosc/22382"
name
: 
"jammy nathan"
phone
: 
"07048268704"
status
: 
"Active"*/

export const createStudent = async (formData) => {
  await connectToDB();
  try {
    if (!formData) {
      console.log("Form data is required");
      return;
    }

    const {
      name,
      matNo,
      department,
      cgpa,
      email,
      phone,
      gender,
      level,
      status,
    } = formData;

    const existingStudent = await Student.findOne({
      email,
      matNo,
      department,
    }).lean();

    if (existingStudent) {
      console.log("Student already exists in the database");
      return {
        success: false,
        message: "Student already exists in the database",
      };
    }

    const newStudent = new Student({
      name,
      matNo,
      department,
      cgpa,
      email,
      phone,
      gender,
      level,
      status,
    });

    await newStudent.save();
    const plainStudent = newStudent.toObject();

    return {
      success: true,
      message: "Student created successfully",
      data: plainStudent,
    };
  } catch (error) {
    console.error("Failed to create student", error.message);
    return { success: false, message: "Internal server error" };
  }
};
