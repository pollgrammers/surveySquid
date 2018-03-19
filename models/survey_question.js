module.exports = function(Sequelize, DataTypes) {
    var SurveyQuestion = Sequelize.define("SurveyQuestion", {
        question_id: {
            type: DataTypes.INTEGER,
            field: "question_id",
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        survey_id: {
            type: DataTypes.INTEGER,
            field: "survey_id",
            allowNull: false
        },
        question_type: {
            type: DataTypes.STRING(15),
            field: "question_type",
            allowNull: false,
            validate: {
                isIn: [
                    ["choice", "star"]
                ]
            }
        },
        question_text: {
            type: DataTypes.STRING(1000),
            field: "question_text",
            allowNull: false
        },
    }, {
        timestamps: false,
        tableName: "survey_question"
    }, {
        indexes: [{
            name: "questionid_idx",
            unique: true,
            fields: ["question_id"]
        }]
    });


    SurveyQuestion.associate = function(models) {
        SurveyQuestion.belongsTo(models.Survey, { foreignKey: "survey_id", targetKey: "survey_id" });
        SurveyQuestion.hasMany(models.SurveyQuestionChoice, { foreignKey: "question_id", targetKey:"question_id" });
        SurveyQuestion.hasMany(models.SurveyResponse, { foreignKey: "question_id", targetKey: "question_id" });
        };

    return SurveyQuestion;
};