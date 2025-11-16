import * as StudentModel from "../models/StudentModel.js";

export const fetchStudent = async (_req, res) =>{
    try{
        const student = await StudentModel.getStudent();
        res.status(200).json(student);
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

export const createStudent = async (req, res) => {
    const { srcode, name, course } = req.body;  
    try {
        const studentId = await StudentModel.insertStudent(srcode, name, course);
        res.status(200).json({ success: true, message:  studentId }); 
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const editStudent = async (req, res) => {
  const {srcode, name, course} = req.body;
  const {studentId} = req.params

  try{
  const updateId = await StudentModel.updateStudent(srcode, name, course, studentId);
    res.status(200).json({success: true, message: updateId});
  }catch(e){
    console.log(e);
    res.status(500).json({success: false, message: "internal server error"});
  }

}


export const deleteStudent = async (req, res) => {
  const {studentId} = req.params

  try{
    const deleteId = await StudentModel.deleteStudent(studentId);
    res.status(200).json({success: true, message: deleteId});
  }catch(e){
    console.log(e);
    res.status(500).json({success: false, message: "internal server error"});
  }

}