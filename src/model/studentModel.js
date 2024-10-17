import mongoose from "mongoose";
const DataSchema = mongoose.Schema(
    {
        studentID: { type: String,unique: true, required: true, },
        email: { type: String, unique: true, required: true, lowercase: true },
        password: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        gender: { type: String},
        phone: { type: String }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const studentModel = mongoose.model("students", DataSchema);


export default studentModel