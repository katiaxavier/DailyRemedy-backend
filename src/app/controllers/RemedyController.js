import connection from '../database/connection';

class RemedyController {
    async index(req, res) {
        const remedys = await connection('remedys').select('*');

        return res.json(remedys);
    }

    async create(req, res) {
        const { shift, description, remedy, amount, hours } = req.body;
        const user_id = req.headers.authorization;

        const [id] = await connection('remedys').insert({
            shift,
            description,
            remedy,
            amount,
            hours,
            user_id
        });

        return res.json({ id });
    }

    async delete(req, res) {
        const { id } = req.params;
        const user_id = req.headers.authorization;

        const remedy = await connection('remedys')
            .where('id', id)
            .select('user_id')
            .first();

        if (remedy.user_id !== user_id) {
            return res.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('remedys').where('id', id).delete();

        return res.status(204).send();
    }
};

export default new RemedyController();
