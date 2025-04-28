"use server";

import { Student } from "@/db/models/studentSchema";
import { connectToDB } from "@/db/connectToDb";

export const getStudents = async () => {
  await connectToDB();
  try {
    const students = await Student.find({}).lean();

    if (!students || students.length === 0) {
      return {
        success: false,
        message: "No students found",
        data: [],
      };
    }

    const formattedStudents = students.map((student) => ({
      id: student._id.toString(), // Convert MongoDB ObjectId to string
      name: student.name,
      matNo: student.matNo,
      department: student.department,
      cgpa: student.cgpa,
      email: student.email,
      phone: student.phone,
      gender: student.gender,
      level: parseInt(student.level, 10), // Convert level to number
      status: student.status,
    }));

    return {
      success: true,
      message: "Students retrieved successfully",
      data: formattedStudents,
    };
  } catch (error) {
    console.error("Failed to fetch students:", error.message);
    return { success: false, message: "Internal server error", data: [] };
  }
};
