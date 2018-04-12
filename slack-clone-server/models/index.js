import Sequelize from 'sequelize'

const sequwlize = new Sequelize('slack', 'postgres', 'postgres', {
    dialect: 'postgres'
});

const models = {
    User: sequwlize.import('./user'),
    Channel: sequwlize.import('./channel'),
    Message: sequwlize.import('./message'),
    Team: sequwlize.import('./team')
};

Object.keys(models).forEach((modelName) => {
    if('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequwlize;
models.Sequelize = Sequelize;

export default models;