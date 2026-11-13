const db = require("../config/db")


exports.getAll = async (req, resp) => {
    const result = await db.query("SELECT * FROM vacancies ORDER BY created_at DESC");
    resp.json(result.rows);
};

exports.getOne = async (req, resp) => {
    const result = await db.query("SELECT * FROM vacancies WHERE id = $1", [req.params.id]);
    if (!result.rows[0]){
        return resp.status(404).json({error: 'Not found'});
    }
    
    resp.json(result.rows[0]);
};

exports.create = async (req, resp) => {
    const {title, description, company, salary} = req.body;
    const result = await db.query("INSERT INTO vacancies (title, description, company, salary) VALUES($1, $2, $3, $4) RETURNING *", [title, description, company, salary]);
    resp.status(201).json(result.rows[0]);
};


exports.remove = async (req, resp) => {
    await db.query("DELETE FROM vacancies WHERE id = $1", [req.params.id]);
    resp.status(204).end();
};


exports.update = async (req, resp) => {
    const {title, description, company, salary} = req.body;
    const result = await db.query("UPDATE vacancies SET title = $1, description = $2, company = $3, salary = $4 WHERE id = $5 RETURNING *", [title, description, company, salary, req.params.id]);
    if (!result.rows[0]){
        return resp.status(404).json({error: "Not found"});
    }
    
    resp.json(result.rows[0]);
};
