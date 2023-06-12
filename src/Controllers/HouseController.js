import House from '../Models/House';
import User from '../Models/User';


class HouseController{

    //MÉTODO PARA LISTA UMA CASA COM STATUS 
    async index(req, res, next){
    
    try {
        const { status } = req.query;
    
        const houses = await House.find({ status });
    
        return res.status(200).json(houses);
        
    } catch (error) {
    
        return res.status(404).json({erro: "Request error"+error.message});
        
    }
    
    
    }
////////////////////////////////////////////////////////////////////////////////////////////////
   //MÉTODO PARA ADICIONAR UMA NOVA CASA 
   async store(req, res, next){
        
        try {
            const { filename } = req.file;
        
            const {description, price, location, status } = req.body;
            
            const { user_id } = req.headers;
            
            const house = await House.create({
                user: user_id,
                description,
                location,
                price,
                status,
                thumbnail: filename
            });
            
       
            return await res.status(201).json(house);
            
        } catch (error) {
        
            return res.status(404).json({erro: "Request error"+error.message});
            
        } 
    }
    
////////////////////////////////////////////////////////////////////////////////////////////////  
    //MÉTODO PARA ATUALIZAR UMA CASA EXISTENTE
    async update(req, res, next) {
        
        try {
            const { filename } = req.file;
        
            const { house_id } = req.params;
            
            const {description, price, location, status } = req.body;
            
            const { user_id } = req.headers;
            
            const user = await User.findById({ user_id });
            const houses = await House.findById({ house_id });
            
            if(String(user._id) !== String(houses.user)){
                
                return res.status(404).json({ error: "Não autorizado!"})
            }
            
             await House.updateOne({ _id: house_id }, {
            
                user: user_id,
                description,
                location,
                price,
                status,
                thumbnail: filename
            });
            
            return res.status(200).send();
            
        } catch (error) {
        
            return res.status(404).json({erro: "Request error"+error.message});
            
        }
    };
    
    async destroy(req, res) {
        
        try {
            const { house_id } = req.body;
            const { user_id } = req.headers;
            
            const user = await User.findById({ user_id });
            const houses = await House.findById({ house_id });
            
            //UM USUÁRIO NÃO PODERÁ DELETAR UMA CASA QUE NÃO SEJA A DELE
            if(String(user._id) !== String(houses.user)){
                
                return res.status(404).json({ error: "Não autorizado!"})
            }
            
            await House.findByIdAndDelete({ _id: house_id });
            
            return res.status(204).json({message: "Deletada com sucesso!" })
            
        } catch (error) {
            
            return res.status(404).json({erro: "Request error"+error.message});
            
        }
    
    }
}

export default new HouseController();