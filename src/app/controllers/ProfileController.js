import connection from '../database/connection';

class ProfileController {
    async index(req, res) {
        const user_id = req.headers.authorization;

        const remedys = await connection('remedys')
            .where('user_id', user_id)
            .select('*');
        return res.json(remedys);
    }
}

export default new ProfileController();