
import User from '../Models/User';

class SessionController{

    async store(req, res, next){
        
        const { email } = req.body;
        
        let user = await User.findOne({ email });
        
        if(!user){
        
             user = await User.create({ email });
        }
    
        return res.json(user);
    
    }


}

export default new SessionController();