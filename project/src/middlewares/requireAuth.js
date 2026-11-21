module.exports = {
  apiAuth(req, res, next) {
    if (!req.session?.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    next();
  },

  pageAuth(req, res, next) {
    if (!req.session?.userId) {
      return res.redirect("/login");
    }
    next();
  },
};
