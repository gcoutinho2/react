import React, { useState, useEffect } from 'react';

function DevForm({ onSubmit }) {
    const [github_user, setGitHubUser] = useState('');
    const [techs, setTechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err);
            },
            {
                timeout: 30000,
            }
        )
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_user,
            techs,
            latitude,
            longitude
        });


        setGitHubUser('');
        setTechs('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-block">
                <label htmlFor="github_user">Usuário do GitHub</label>
                <input name="github_user" id="github_user" required value={github_user} onChange={e => setGitHubUser(e.target.value)}></input>
            </div>

            <div className="input-block">
                <label htmlFor="techs">Tecnologias</label>
                <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)}></input>
            </div>

            <div className="input-group">
                <div className="input-block">
                    <label htmlFor="latitude">Latitude</label>
                    <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)}></input>
                </div>

                <div className="input-block">
                    <label htmlFor="longitude">Longitude</label>
                    <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)}></input>
                </div>
            </div>

            <button type="submit">Salvar</button>

        </form>
    );
};

export default DevForm;