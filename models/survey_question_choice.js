module.exports = function(Sequelize, DataTypes) {
    var SurveyQuestionChoice = Sequelize.define("SurveyQuestionChoice", {
        choice_id: {
            type: DataTypes.INTEGER,
            field: "choice_id",
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        question_id: {
            type: DataTypes.INTEGER,
            field: "question_id",
            allowNull: false
        },
        choice_text: {
            type: DataTypes.STRING(256),
            field: "choice_text",
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: "survey_question_choice"
    }, {
        indexes: [{
            name: "choiceid_idx",
            unique: true,
            fields: ["choice_id"]
        }]
    });


    SurveyQuestionChoice.associate = function(models) {
        SurveyQuestionChoice.belongsTo(models.SurveyQuestion, { foreignKey: "question_id", targetKey: "question_id" });
        SurveyQuestionChoice.belongsTo(models.SurveyResponse, { foreignKey: "choice_id", targetKey:"choice_id" });
    };

    return SurveyQuestionChoice;
};