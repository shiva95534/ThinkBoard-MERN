import mongoose from "mongoose";

// creating schema
const noteSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
    },
    {timestamps: true}
);

// model based on schema
const Note = mongoose.model("Note",noteSchema);

export default Note;