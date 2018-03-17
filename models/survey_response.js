module.exports = function(Sequelize, DataTypes) {
    var SurveyResponse = Sequelize.define("SurveyResponse", {
        response_id: {
            type: DataTypes.INTEGER,
            field: "response_id",
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        respondent_user_id: {
            type: DataTypes.INTEGER,
            field: "respondent_user_id",
            allowNull: true,
            defaultValue: 0
        },
        survey_id: {
            type: DataTypes.INTEGER,
            field: "survey_id",
            allowNull: false,
        },
        question_id: {
            type: DataTypes.INTEGER,
            field: "question_id",
            allowNull: false,
            references: {
                model: 'models.SurveyQuestion',
                key: 'question_id'
            }
        },
        choice_id: {
            type: DataTypes.INTEGER,
            field: "choice_id",
            allowNull: true
        }
    }, {
        timestamps: true,
        tableName: "survey_response",
        underscored: true
    }, {
        indexes: [{
            name: "responseid_idx",
            unique: true,
            fields: ["response_id"]
        }]
    });


    SurveyResponse.associate = function(models) {
        SurveyResponse.belongsTo(models.User, { foreignKey: "respondent_user_id", targetKey: "user_id" });
        SurveyResponse.belongsTo(models.Survey, { foreignKey: "survey_id", targetKey: "survey_id" });
        SurveyResponse.belongsTo(models.SurveyQuestion, { foreignKey: "question_id", targetKey: "question_id" });
        SurveyResponse.belongsTo(models.SurveyQuestionChoice, { foreignKey: "choice_id", targetKey: "choice_id" });
    };

    return SurveyResponse;
};