import House from "../Models/House";



class DashBoardController{

   async show(req, res){
        
        try {
            const { user_id } = req.headers;
        
            const houses = await House.find({ user: user_id});
        
            return res.status(200).json(houses);
            
        } catch (error) {
        
            return res.status(400).json({erro: "Request error"+error.message});
            
        }
    
    }

}

export default new DashBoardController();