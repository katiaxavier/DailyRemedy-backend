import * as Yup from 'yup';
import crypto from 'crypto';

import User from '../models/User';

class UserController {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    }

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

        const user = await User.findByPk(userID);

        if (!user) {
            return res.status(400).json({ error: 'User does not exist' })
        }

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