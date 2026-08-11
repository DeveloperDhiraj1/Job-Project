import { DataTypes } from 'sequelize';

const companyModel = (sequelize) => {
  return sequelize.define('Company', {
    company_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_size: {
      type: DataTypes.STRING,
      allowNull: false,
    
    },
    company_logo:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    company_website: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    about_company: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    
    
  });
};

export default companyModel;