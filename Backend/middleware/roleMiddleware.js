export const roleMiddleware=(...allowedRoles)=>{
    return (req,res,next)=>{
        try{
            if(!req.user || !req?.user?.user_type){
                return res.status(403).json({message:"User role not found"});
            }
            if(!allowedRoles.includes(req.user.user_type)){
                return res.status(403).json(response("Access denied", null, 500));
            }
            next();
        }catch(error){
            return res.status(500).json({message:error.message});
        }
    }
};