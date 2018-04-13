export default (sequlize, DataType) => {
    const Team = sequlize.define('team', {
        name: {
            type: DataType.STRING,
            unique: true
        }
    });

    Team.associate = (models) => {
        Team.belongsToMany(models.User, {
            through: 'member',
            foreignKey: {
                name: 'teamId',
                field: 'team_id'
            }
        });
        Team.belongsTo(models.User, {
            foreignKey: 'owner'
        })
    };

    return Team;
}
