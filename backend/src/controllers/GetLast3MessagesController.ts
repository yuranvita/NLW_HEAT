import { Request, Response } from "express";
import { GetLast3MessagesService } from "../services/GetLast3MessageService";



class GetLast3MessagesController{
    async hundle(req : Request , res : Response){
        const service = new GetLast3MessagesService();

        const result = await service.execute();


        res.json(result);
    }
}


export { GetLast3MessagesController }