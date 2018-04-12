export default (sequlize, DataType) => {
    const Channel = sequlize.define('channel', {
        name: DataType.STRING,
        public: DataType.BOOLEAN
    });

    Channel.associate = (models) => {
        Channel.belongsTo(models.Team, {
            foreignKey: 'teamId'
        });
    };

    return Channel;
}
