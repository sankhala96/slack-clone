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
    });

    User.associate = (models) => {
        User.belongsToMany(models.Team, {
            through: 'member',
            foreignKey: 'userId'
        });
    };

    return User;
}
