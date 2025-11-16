import * as BookModel from "../models/BookModel.js";

export const fetchBooks = async ( req, res) =>{
    try{
        const books = await BookModel.getBook();
        res.status(200).json(books);
    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })

    }
}

export const createBook = async (req, res) => {
    const { title, genre, status } = req.body;  
    try {
        const bookId = await BookModel.insertBook(title, genre, status);
        res.status(200).json({ success: true, message:  bookId }); 
    } catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const editBook = async (req, res) => {
  const {title, genre, status} = req.body;
  const {bookId} = req.params

  try{
    const updateId = await BookModels.updateBook(title, genre, status, bookId);
    res.status(200).json({success: true, message: updateId});
  }catch(e){
    console.log(e);
    res.status(500).json({success: false, message: "internal server error"});
  }

}


export const deleteBook = async (req, res) => {
  const {bookId} = req.params

  try{
    const deleteId = await BookModels.deleteBook(bookId);
    res.status(200).json({success: true, message: deleteId});
  }catch(e){
    console.log(e);
    res.status(500).json({success: false, message: "internal server error"});
  }

}