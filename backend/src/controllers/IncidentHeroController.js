const crypto=require('crypto');
const connection=require('../database/connection');
module.exports={


    async create(request,response){
        const {isAnonymous,nameHero,incident_id}=request.body;
        const ong_id= request.headers.authorization;
        console.log(title);

        const [id]= await connection('incidentheroes').insert({
            incident_id,    isAnonymous,nameHero
        });
        return response.json({id});
    },

    async delete(request,response){
        const {id}=request.params;
        const ong_id= request.headers.authorization;

        const incidente= await connection('incidentheroes').where('id',id).select('ong_id').first();

        if(incidente.ong_id!==ong_id){
            return response.status(401).json({error:'Operation not permitted'})
        }
        await connection('incidentheroes').where('id',id).delete();
        return response.status(201).send();
    }
}