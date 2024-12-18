function giveAccess(roles = []){
    return (req, res, next) =>{
        const userRole = req?.user?.role;
        if(roles.includes(userRRole)){
            next();
        } else{
            res.status(401).send ({status: "failed" ,message: "Access denied"});
        }
    }
}

module.exports = giveAccess;
