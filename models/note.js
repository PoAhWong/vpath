const db = require("../db/db");

const Note = {
  create: (userId, title, content, day) => {
    console.log(userId, day);
    const postDay = Number(day);
    const sql = `INSERT INTO notes(user_id, title, content, post_day) VALUES ($1, $2, $3, $4) RETURNING *
    `;
    return db
      .query(sql, [userId, title, content, postDay])
      .then((dbRes) => dbRes);
  },

  findNotesByDay: (id, day) => {
    const sql = `
        SELECT * FROM notes
        WHERE user_id = $1 AND post_day = $2
    `;
    return db.query(sql, [id, day]).then((dbRes) => dbRes.rows);
  },

  findNotesByDate: (id, dateDiff) => {
    console.log(typeof id, typeof dateDiff);
    const sql = `
      SELECT * FROM notes
      WHERE user_id = $1 AND post_date = CURRENT_DATE
    `;
    return db.query(sql, [id]).then((dbRes) => dbRes.rows);
  },

  update: (id, title, content) => {
    const sql = `UPDATE notes SET title = $2, content = $3 WHERE id = $1`;
    return db.query(sql, [id, title, content]).then((dbRes) => dbRes);
  },

  delete: (id) => {
    const sql = `DELETE FROM notes WHERE id = $1`;
    return db.query(sql, [id]).then((dbRes) => dbRes);
  },
  //   getAll: () => {
  //     const sql = `SELECT * FROM users`;
  //     return db.query(sql).then((dbRes) => {
  //       console.log(dbRes);
  //       return dbRes.rows;
  //     });
  //   },
};

module.exports = Note;
