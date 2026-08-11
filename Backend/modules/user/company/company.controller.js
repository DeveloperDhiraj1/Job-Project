import { addcompanyservice } from "./company.service.js";
export const addCompanycontroller=async(req,res)=>{
    const file=req.file;
    const user_id=req.user.user_id;
    const data=req.body;
    const result=await addcompanyservice(user_id,file,data);
    return res.json(result.statusCode || 200).json(result);
}
