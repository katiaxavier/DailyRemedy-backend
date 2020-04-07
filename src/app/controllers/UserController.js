import * as Yup from 'yup';
import crypto from 'crypto';

import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            whatsapp: Yup.string()
                .required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { name, email, whatsapp } = req.body;

        const userExists = await User.findOne({ where: { email: req.body.email } });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const id = crypto.randomBytes(4).toString('HEX');

        await User.create({
            id,
            name,
            email,
            whatsapp
        });

        return res.json({ id });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            whatsapp: Yup.string(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { name, email, whatsapp } = req.body;

        const userID = req.headers.authorization;

        const userExist = await User.findOne({
            where: { id: userID }
        });

        if (!userExist) {
            return res.status(400).json({ error: 'User does not exist' })
        }

        const user = await User.findByPk(userID);

        if (email && email !== user.email) {
            const userExists = await User.findOne({ where: { email: email } });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists.' });
            }
        }

        await user.update(req.body);

        return res.json({
            name,
            email,
            whatsapp
        });
    }

}

export default new UserController();