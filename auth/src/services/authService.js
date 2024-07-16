const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/userRepository");
const config = require("../config");
const User = require("../models/user");
/*
   Class to hold the business logic for the auth service interacting with the user repository
*/
class AuthService{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async findUserByUsername(username){
        return await this.userRepository.getUserByUsername(username);
    }
    async login(username, password){
        console.log(
            "hello"
        );
        const user = await this.userRepository.getUserByUsername(username);

        if(!user){
            return {success: false, message:"user not found"};
        }
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return {success:false, message:"invalid username or password"};
        }

        const token = jwt.sign({id:user._id},config.jwtSecret);

        return {success:true, token};

    }

    async register(user){
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return await this.userRepository.createUser(user);
    }

    async deleteTestUsers() {
        // Delete all users with a username that starts with "test"
        await User.deleteMany({ username: /^test/ });
      }
    async findUserByUserId(id){
        const user = await User.findById(id);
        return user;
    }
}

module.exports = AuthService;