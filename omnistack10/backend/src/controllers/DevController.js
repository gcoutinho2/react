const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index, show, store, update, destroy

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(req, res) {
        const { github_user, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_user });

        if (!dev) {
            const response = await axios.get(`https://api.github.com/users/${github_user}`);

            const { name = login, avatar_url, bio } = response.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_user,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }


        return res.json(dev);
    },

    async update(req, res) {
        const { github_user } = req.params;
        const { techs, ...rest } = req.body;
        rest.github_user = github_user;

        const dev = await Dev.findOne({ github_user });

        if (techs)
            var techsArray = parseStringAsArray(techs);

        const newdev = await Dev.updateOne({ github_user }, {
            techs: techs ? techsArray : dev.techs,
            ...rest
        });

        return res.json({
            modifiedCount: newdev.nModified,
            ok: newdev.ok
        });
    },
};