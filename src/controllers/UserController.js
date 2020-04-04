import crypto from 'crypto';
import connection from '../database/connection'

class UserController {
    async index(req, res) {
        const users = await connection('users').select('*');

        return res.json(users);
    }

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('users').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return res.json({ id });
    }
}

export default new UserController();