import connection from '../database/connection';

class SessionController {
    async create(req, res) {
        const { id } = req.body;

        const user = await connection('users')
            .where('id', id)
            .select('name')
            .first();

        if (!user) {
            return res.status(400).json({ error: 'No USER found with this ID' });
        }

        return res.json(user);
    }
}

export default new SessionController();