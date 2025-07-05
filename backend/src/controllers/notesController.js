import Note from "../models/Note.js";
import express from "express";

export async function getAllNotes(req,res){
    try{
        console.log("Fetched all Notes\n");
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    }
    catch(err){
        // console.log("Error in getAllNotes Controller",err)
        console.error("Error in getAllNotes Controller", err);
        res.status(500).send({message: "Internal Server Error"});
    }
}
export async function getNoteById(req,res){
    try{
        const requiredNote = await Note.findById(req.params.id);
        if(!requiredNote){
            return res.status(404).json({message: "Note Not Found"});
        }
        res.status(200).json(requiredNote);
    }
    catch(err){
        console.error("Error in getNoteById Controller", err);
        res.status(500).send({message: "Internal Server Error"});
    }
}

export async function createNotes(req,res){
    try{
        const {title,content} = req.body;
        const newNote = new Note({title,content});
        await newNote.save();
        res.status(200).json({message: "New Note Created", note: newNote});
    }
    catch(err){
        console.error("Error in Create New Note Controller", err);
        res.status(500).send({message: "Internal Server Error"});
    }
    // res.status(201).json({message: "Note created successfully!"});
}

export async function updateNotes(req,res){
    try{
        const {title,content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title, content},
            {
                new: true,
                runValidators:true
            }
        );
        if(!updatedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message : "Note updated successfully!", note: updatedNote});
    }
    catch(err){
        console.error("Internal Server Error", err);
        res.status(500).json({message : "Error in updateNote Controller"});
    }
}

export async function deleteNotes(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(
            req.params.id
        )
        if(!deletedNote){
            return res.status(404).json({message: "Note Not Found"});
        }
        res.status(200).json({message: "Note deleted"});
    }
    catch(err){
        console.error("Internal server Erro",err);
        res.status(500).json({message: "Error in deletedNote Controller"});
    }
}