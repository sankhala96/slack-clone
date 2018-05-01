export default (sequlize, DataType) => {
    const Member = sequlize.define('member', {
        admin: {
            type: DataType.BOOLEAN,
            defaultValue: false
        }
    });

    return Member;
};
