const crypto=require('crypto');
const connection=require('../database/connection');
module.exports={

    async index (request,response){
        const ongs= await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request,response){
        const {name,email,city,uf,whatsapp}=request.body;
        const id=crypto.randomBytes(4).toString('HEX');
        console.log(name);
        await connection('ongs').insert({
            id,name,email,whatsapp,city,uf
        });
        return response.json({id});
    },
    async delete(request,response){
        const {id}=request.params;

        const incidente= await connection('ongs').where('id',id).select('id').first();

        if(!incidente){
            return response.status(401).json({error:'Operation not permitted'})
        }
        await connection('ongs').where('id',id).delete();
        return response.status(201).send();
    }

}