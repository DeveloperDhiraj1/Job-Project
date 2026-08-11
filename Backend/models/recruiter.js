import { DataTypes } from 'sequelize';

const recruiterModel = (sequelize) => {
  return sequelize.define('Recruiter', {
    recruiter_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
};

export default recruiterModel;