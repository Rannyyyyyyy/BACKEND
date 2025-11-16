import pool from './db.js';

export const getBook = async () =>{
    const[row]= await pool.query("SELECT * FROM tblbook");
    return row;
}



export const insertBook = async (title, genre, status) => {
    const [result] = await pool.query(
        "INSERT INTO tblbook(title, genre, status) VALUES(?,?, ?)",
        [title, genre, status]
    );
return result.insertId;
}

export const updateBook = async (title, genre, status, bookId) => {
    const [result] = await pool.query(
        "UPDATE tblbook SET title= ?, genre= ?, status= ? WHERE id= ?",
        [title, genre, status, bookId]
    );
    return result.affectedRows;
}

export const deleteBook = async (bookId) => {
    const [result] = await pool.query(
        "DELETE FROM tblbook WHERE id", [bookId]
    );
    return result.affectedRows;
}