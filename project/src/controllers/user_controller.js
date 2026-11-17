const svc = require("../services/user.service");

exports.createUser = async (req, res, next) => {
  try {
    const user = await svc.register(req.body);
    req.session.userId = user.id;
    res.status(201).json(user);
  } catch (e) { next(e); }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await svc.login(req.body);
    req.session.userId = user.id;
    res.status(200).json({ message: "Success", user });
  } catch (e) { next(e); }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (!req.session?.userId) return res.status(401).json({ error: "unauthorized" });
    const user = await svc.update(req.session.userId, req.params.id, req.body);
    res.status(200).json(user);
  } catch (e) { next(e); }
};

exports.logoutUser = (req, res) => {
  if (!req.session) return res.status(200).json({ message: "Logged out" });
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "internal" });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out" });
  });
};
