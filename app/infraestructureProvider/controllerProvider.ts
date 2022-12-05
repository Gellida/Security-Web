import { UseCase } from "../domainProvider/UseCase";

export class Controller {
    static async execute(useCase: UseCase, data: any, res, handler?: (any) => void) {
        try {
            const useCaseData = await useCase.start(data);
            if(handler) handler(useCaseData);
            else res.json({data : useCaseData});
        } catch (error) {
            res.json({ error : error.message });
        }
    }
}