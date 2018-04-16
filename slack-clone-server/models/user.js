export default (sequlize, DataType) => {
    const User = sequlize.define('user', {
        username: {
            type: DataType.STRING,
            unique: true,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: 'The username can only contain letters and numbers',
                },
                len: {
                    args: [3, 25],
                    msg: 'The username needs to be between 3 and 25 characters long',
                },
            },
        },
        email: {
            type: DataType.STRING,
            unique: true,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email',
                },
            },
        },
        password: DataType.STRING
    });

    User.associate = (models) => {
        User.belongsToMany(models.Team, {
            through: 'member',
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        });

        User.belongsToMany(models.Channel, {
            through: 'channel_member',
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }
        })
    };

    return User;
}
