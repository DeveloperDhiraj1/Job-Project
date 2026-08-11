import userModel from './user.model.js';
import { sequelize } from '../config/db.js';
import companyModel from './company.js';
import recruiterModel from './recruiter.js';

const User = userModel(sequelize);
const Company = companyModel(sequelize);
const Recruiter = recruiterModel(sequelize);

Recruiter.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Recruiter, { foreignKey: 'user_id' });

Company.belongsTo(User, { foreignKey: 'user_id' });
Recruiter.belongsTo(Company, { foreignKey: 'company_id' });



export { User, Company, Recruiter };