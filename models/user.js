module.exports = function(Sequelize, DataTypes) {
    var User = Sequelize.define("User", {
        user_id: {
            type: DataTypes.INTEGER,
            field: "user_id",
            autoIncrement: true,
            primaryKey: true
        },
        user_email: {
            type: DataTypes.STRING(50),
            field: "user_email",
            allowNull: false,
            validate: {
              isEmail: true
            }
        },
        user_fname: {
            type: DataTypes.STRING(20),
            field: "user_fname"
        },
        user_lname: {
            type: DataTypes.STRING(20),
            field: "user_lname"
        },
        user_image: {
            type: DataTypes.STRING(2083),
            field: "user_image"
        },
    }, {
        timestamps: false,
        tableName: "app_user"
    }, {
        indexes: [{
            name: "userid_idx",
            unique: true,
            fields: ["user_id"]
        }]
    });

    User.associate = function(models) {
        User.hasMany(models.Survey, { foreignKey: "user_id", targetKey:"user_id" });
        User.hasMany(models.SurveyResponse, {foreignKey: "respondent_user_id", targetKey:"user_id" });

    };

    return User;
};