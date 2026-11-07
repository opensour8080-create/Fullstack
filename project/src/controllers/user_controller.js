const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.createUser = async (req, resp) => {
    console.log(req.session);
    const {name, email, password} = req.body;
    try {
        const hash_password = await bcrypt.hash(password, 8);
        const result = await pool.query("INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, hash_password]);   

        
        var newUser = result.rows[0];

        req.session.userId = newUser.id;
        resp.status(201).json(result.rows[0]);
    } 
    catch (err){
        resp.status(500).json({ error: err.message});
    }
};



exports.updateUser = async (req, resp) => {
    const {id} = req.params;
    const {name, email, password} = req.body;

    try {
        let result;
        
        if (password) {
            const hash_password = await bcrypt.hash(password, 8);
            result = await pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *", [name, email, hash_password, id]);
        } else {
            result = await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", [name, email, id]);
        }

        resp.status(200).json(result.rows[0]);
    }
    catch(err){
        resp.status(500).json({ error: err.message});
    }
};





exports.loginUser = async (req, resp) => {
    const {password, email} = req.body;
    try{
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if(result.rows.length === 0){
            return resp.status(400).json({message:"Invalid email"});
        }
        const user = result.rows[0]; 
        const Password = await bcrypt.compare(password, user.password);
        if (!Password){
            return resp.status(400).json({message:"Invalid password"});
        }

        req.session.userId = user.id;

    return resp.status(200).json({message: "Success"});
    } catch (err){
        return resp.status(500).json({error: err.message});
    }
};
