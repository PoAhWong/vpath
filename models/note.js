const db = require("../db/db");

const Note = {
  create: (userId, title, content) => {
    const sql = `INSERT INTO notes(user_id, title, content) VALUES ($1, $2, $3) RETURNING *
    `;
    return db.query(sql, [userId, title, content]).then((dbRes) => dbRes);
  },

  findAllByUserId: (id) => {
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
