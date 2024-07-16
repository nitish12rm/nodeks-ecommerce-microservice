const User = require("../models/user");

class UserRepository{
    async createUser(user){
        return await User.create(user);
    }

    async getUserByUsername(username){
        console.log("enter");

        const user = await User.findOne({ username });
        console.log("user");
        return user;
    }
}
module.exports = UserRepository;