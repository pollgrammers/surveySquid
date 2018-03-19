// var User = require("./user.js");

module.exports = function(Sequelize, DataTypes) {
    var Survey = Sequelize.define("Survey", {
        survey_id: {
            type: DataTypes.INTEGER,
            field: "survey_id",
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.STRING(50),
            field: "user_id",
            allowNull: false
        },
        survey_name: {
            type: DataTypes.STRING(50),
            field: "survey_name"
        },
        survey_desc: {
            type: DataTypes.STRING(1000),
            field: "survey_desc"
        },
        survey_type: {
            type: DataTypes.STRING(15),
            field: "survey_type",
            allowNull: false,
            defaultValue: "public",
            validate: {
                isIn: [
                    ["public", "private"]
                ]
            }
        },
        survey_start_date: {
            type: DataTypes.DATEONLY,
            field: "survey_start_date",
            defaultValue: Sequelize.NOW
        },
        survey_end_date: {
            type: DataTypes.DATEONLY,
            field: "survey_end_date"
        }
    }, {
        timestamps: false,
        tableName: "survey"
    }, {
        indexes: [{
            name: "surveyid_idx",
            unique: true,
            fields: ["survey_id"]
        }]
    });


    Survey.associate = function(models) {
        Survey.belongsTo(models.User, {foreignKey: "user_id", targetKey:"user_id" });
        Survey.hasMany(models.SurveyQuestion, {foreignKey: "survey_id", targetKey:"survey_id" });
        Survey.hasMany(models.SurveyResponse, {foreignKey: "survey_id", targetKey: "survey_id" });
    };

    return Survey;
};