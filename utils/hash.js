const bcrypt = require("bcrypt");

exports.hashPassword = (password) =>{
    return bcrypt.hashSync(password, Number(process.env.SALT_ROUNDS) || 10);

}

exports.comparePassword = (password, hash) =>{
    return bcrypt.compareSync(password, hash);
}