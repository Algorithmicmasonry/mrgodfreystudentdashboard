import mongoose, { Schema, models } from "mongoose";

const studentSchema = new Schema({
  name: { type: String, required: true },
  matNo: { type: String, required: true },
  department: { type: String, required: true },
  cgpa: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  level: { type: String, required: true },
  status: {
    type: String,
    enum: ["Active", "Graduated", "Suspended", "Dropped-out"],
    default: "Active",
  },
});

const Student = mongoose?.models.Student || mongoose.model("Student", studentSchema);

  export {Student}
