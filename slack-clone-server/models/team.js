export default (sequlize, DataType) => {
    const Team = sequlize.define('team', {
        name: {
            type: DataType.STRING,
            unique: true
        }
    });

    Team.associate = (models) => {
        Team.belongsToMany(models.User, {
            through: models.Member,
            foreignKey: {
                name: 'teamId',
                field: 'team_id'
            }
        });
    };

    return Team;
}
