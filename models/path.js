const db = require("../db/db");

const Path = {
  create: (userId) => {
    const sql = `INSERT INTO path(user_id) VALUES ($1) RETURNING *`;
    return db.query(sql, [userId]).then((dbRes) => dbRes);
  },

  getCreateDate: (userId) => {
    const sql = `SELECT create_date, CURRENT_DATE - create_date as length FROM path WHERE user_id = $1`;
    return db.query(sql, [userId]).then((dbRes) => dbRes.rows[0]);
  },
};

module.exports = Path;
