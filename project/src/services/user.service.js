const bcrypt = require("bcrypt");
const repo = require("../repositories/user.repository");

const httpError = (status, message) =>
  Object.assign(new Error(message), { status });

module.exports = {
  async register({ name, email, password }) {
    if (!name || !email || !password) throw httpError(400, "name, email, password required");
    if (password.length < 6) throw httpError(400, "password too short");

    const existing = await repo.findByEmail(email);
    if (existing) throw httpError(409, "email already used");

    const passwordHash = await bcrypt.hash(password, 8);
    return repo.create({ name, email, passwordHash });
  },

  async login({ email, password }) {
    const user = await repo.findByEmail(email);
    if (!user) throw httpError(400, "Invalid credentials");
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw httpError(400, "Invalid credentials");
    return { id: user.id, name: user.name, email: user.email };
  },

  async update(currentUserId, targetId, { name, email, password }) {
    if (String(currentUserId) !== String(targetId)) throw httpError(403, "Forbidden");
    const passwordHash = password ? await bcrypt.hash(password, 8) : null;
    const updated = await repo.update(targetId, { name, email, passwordHash });
    if (!updated) throw httpError(404, "Not found");
    return updated;
  },
};
