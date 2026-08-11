import { response } from "../../../utils/response.js";
import { Company,Recruiter } from "../../../models/index.js";
import cloudinary from "../../../utils/common.js";
export const addcompanyservice = async (user_id,file,data) =>{
    try{
        const iscompanyexists = await Company.findOne({where:{user_id:user_id}});
        if(iscompanyexists){
            return response(400,"Company already exists",null);
        }
        if(!file){
            return response(400,"Company logo is required",null);
        }
        const {company_name,industry,company_size,company_website,about_company} = data;
        if(!company_name || !industry || !company_size || !company_website || !about_company){
            return response(400,"All fields are required",null);
        }
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "company_logos",
            resource_type: "image",
        });
        const company = await Company.create({
            company_name,
            industry,
            company_size,
            company_website,
            about_company,
            user_id,
            company_logo: uploadResult.secure_url,
            public_key: uploadResult.public_id,
        });

        const recruiter = await Recruiter.create({
            company_id: company.company_id,
            user_id: user_id,
            position: "Recruiter",
        });
        
        return response(201,"Company added successfully",company);
    } catch (error) {
        console.error("Error adding company:", error);
        return response(500,"Internal server error",null);
    }
}

// get company list only admin

export const getcompanylistservice = async () =>{
    try{
        const companylist = await Company.findAll();
        if(!companylist){
            return response(404,"Company list not found",null);
        }
        return response(200,"Company list found",companylist);
    } catch (error) {
        console.error("Error fetching company list:", error);
        return response(500,"Internal server error",null);
    }
}

// get company with recruiter id
export const getcompanybyrecruiteridservice = async (recruiter_id) =>{
    try{
        const company = await Company.findOne({where:{recruiter_id:recruiter_id}});
        if(!company){
            return response(404,"Company not found",null);
        }
        return response(200,"Company found",company);
    } catch (error) {
        console.error("Error fetching company:", error);
        return response(500,"Internal server error",null);
    }
}

// get company with company id
export const getcompanybycompanyidservice = async (company_id) =>{
    try{
        const company = await Company.findOne({where:{company_id:company_id}});
        if(!company){
            return response(404,"Company not found",null);
        }
        return response(200,"Company found",company);
    } catch (error) {
        console.error("Error fetching company:", error);
        return response(500,"Internal server error",null);
    }
}

// update company only admin
export const updatecompanyservice = async (company_id,data) =>{
    try{
        const company = await Company.findOne({where:{company_id:company_id}});
        if(!company){
            return response(404,"Company not found",null);
        }
        await company.update({company_id:company_id,...data});
        return response(200,"Company updated successfully",company);
    } catch (error) {
        console.error("Error updating company:", error);
        return response(500,"Internal server error",null);
    }
}
// delete company only admin

export const deletecompanyservice = async (company_id) =>{
    try{
        const company = await Company.findOne({where:{company_id:company_id}});
        if(!company){
            return response(404,"Company not found",null);
        }
        await company.destroy();
        return response(200,"Company deleted successfully",company);
    } catch (error) {
        console.error("Error deleting company:", error);
        return response(500,"Internal server error",null);
    }
}

