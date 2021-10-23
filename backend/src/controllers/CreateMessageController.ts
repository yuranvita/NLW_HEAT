import {Request , Response} from 'express'
import { CreateMessageService } from '../services/CreateMessageService'



class CreateMessageController {
    async handle(req : Request, res : Response){

       const createMessageService = new CreateMessageService();

       const { message } = req.body;
       const { user_id } = req;

      const result = await createMessageService.execute(message , user_id);

    
    

      return res.json(result);
    }
}


export { CreateMessageController }