import * as Yup from 'yup';
import { getHours, parseISO, startOfHour, subHours } from 'date-fns';
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
            hour: Yup.date().required(),
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

        const getHour = getHours(parseISO(hour));
        const hourStart = startOfHour(parseISO(hour));

        let turno = "";

        turno = getHour <= 6 ? "Madrugada" : turno;
        turno = getHour >= 6 ? "Manhã" : turno;
        turno = getHour >= 12 ? "Tarde" : turno;
        turno = getHour >= 18 ? "Noite" : turno;

        const remedy = await Remedy.create({
            user_id: user.id,
            name,
            description,
            amount,
            hour: hourStart,
            shift: turno
        });

        return res.json({ remedy });
    }

    async delete(req, res) {
        const { id } = req.params;
        const user_id = req.headers.authorization;


        const remedy = await Remedy.findOne({
            where: {
                id,
                user_id
            },
        });

        if (!remedy) {
            return res.status(401).json({
                error: "Nothing found.",
            });
        }

        await remedy.destroy();

        return res.status(204).send();
    }
};

export default new RemedyController();
