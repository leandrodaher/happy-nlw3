import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';


export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;
        
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanageView.render(orphanage));
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);
        
        //

        // request.files irá retornar um Array de arquivos pois o usuário pode fazer upload
        // de várias imagens para um orfanato no momento de sua criação.
        // console.log(request.files);
        //
        // por algum motivo desconhecido o TypeScript não reconhece que request.files é um Array de Arquivos do Multer
        // então temos que forçar a tipagem para Express.Multer.File usando o 'as' e colocar '[]' na frente do tipo
        // para dizer que é um Array. Se estivessemos lidando com upload de 1 arquivo apenas 'as Express.Multer.File[]' não seria necessário.
        const requestImages = request.files as Express.Multer.File[];
        
        const images = requestImages.map(image => {
            return { path: image.filename } // path é a unica informação que temos no model Images.ts, id é automático
        })


        //

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            //open_on_weekends,
            //open_on_weekends: JSON.parse(open_on_weekends),
            open_on_weekends: open_on_weekends === 'true', // converte a string "true" ou "false" do parâmetro da URL em boolean true ou false, caso contrario ele nao reconhece o valor e deixa sempre como false. Basicamente a expressão "a === b" vai retornar verdadeiro ou falso.
            images
        };

        // schema de validação dos dados
        const schema = Yup.object().shape({
            name: Yup.string().required(), //.required('Nome obrigatório'),
            latitude: Yup.number().required() ,
            longitude: Yup.string().required(),
            about: Yup.string().required().max(300), // max de 300 caracteres
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        // valida os dados
        await schema.validate(data, {
            abortEarly: false, // retorna a mensagem de todos os campos que estão errados, sem isto ele retorna o primeiro erro que encontrar e aborta.
        })

        const orphanage = orphanagesRepository.create(data);
    
        await orphanagesRepository.save(orphanage);

        return response.status(201).json(orphanage);
    }
}