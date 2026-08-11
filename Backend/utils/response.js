export const response=(msg,statusCode,data={})=>{
    return {
        msg,
        statusCode,
        data
    };
}