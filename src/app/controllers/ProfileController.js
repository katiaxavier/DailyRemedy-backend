import Remedy from '../models/Remedy'

class ProfileController {
    async show(req, res) {
        const user_id = req.headers.authorization;
        const remedys = await Remedy.findAll({
            where: {
                user_id
            },
            order:[
                ['hour', 'ASC']
            ],
        });

        return res.json(remedys);
    }
}

export default new ProfileController();