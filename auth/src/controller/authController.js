const AuthService = require("../services/authService");

/**
 * Class to encapsulate the logic for the auth routes
 */

class AuthController{
    constructor(){
        this.authService= new AuthService();
    }
  

    async login(req,res){
        const {username, password} = req.body;
        console.log(username);
        const result = await this.authService.login(username,password);

        if(result.success){
            res.json({token:result.token});
        } else {
            res.status(400).json({message:result.message});
        }
    }

    async register(req, res){
        const user = req.body;

        // query if same user exist

        try{
            const existingUser = await this.authService.findUserByUsername(user.username);
            if(existingUser){
                console.log("Username already taken")
                throw new Error("Username already taken");
            }

            //nai toh register karado
            const result = await this.authService.register(user);
            res.json({result});
        }catch (err) {
            res.status(400).json({ message: err.message });
          }
    }

    async getProfile(req, res) {
        const userId = req.user.id;
    
        try {
          const user = await this.authService.findUserByUserId(userId);
          res.json(user);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }

}
module.exports = AuthController;