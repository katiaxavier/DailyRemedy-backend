import User from '../models/User';

class SessionController {
    async store(req, res) {
        const { id } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(400).json({ error: 'No USER found with this ID' });
        }

        const { name } = user;

        return res.json({
            id,
            name
        });
    }
}

export default new SessionController();