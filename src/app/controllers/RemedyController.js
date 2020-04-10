import * as Yup from 'yup';
import { startOfHour, parseISO, format, subHours } from 'date-fns';
import Remedy from '../models/Remedy';
import User from '../models/User';

class RemedyController {
    async index(req, res) {
        const remedys = await connection('remedys').select('*');

        return res.json(remedys);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            description: Yup.string(),
            amount: Yup.string().required(),
            hour: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { name, description, amount, hour } = req.body;

        const userID = req.headers.authorization;

        const user = await User.findByPk(userID);

        if (!user) {
            return res.status(400).json({ error: 'User does not exist' })
        }

        // const { id } = await User.findByPk(userID);

        const remedy = await Remedy.create({
            user_id: user.id,
            name,
            description,
            amount,
            hour
        });

        return res.json({ remedy });
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
