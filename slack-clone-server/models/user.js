export default (sequlize, DataType) => {
    const User = sequlize.define('user', {
        username: {
            type: DataType.STRING,
            unique: true
        },
        email: {
            type: DataType.STRING,
            unique: true
        },
        password: DataType.STRING
    },{underscored: true});

    User.associate = (models) => {
        User.belongsToMany(models.Team, {
            through: 'member',
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });

        User.belongsToMany(models.Team, {
            through: 'channel_member',
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        })
    };

    return User;
}
