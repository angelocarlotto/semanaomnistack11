const crypto=require('crypto');
const connection=require('../database/connection');
module.exports={

    async index (request,response){
        const {page=1}=request.query;
        const [count]=await connection('incidents').count();
        console.log(count);

        response.header('X-Total-Count',count['count(*)']);
        const ongs= await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf']);
        return response.json(ongs);
    },
    async get (request,response){

      
        const {id}=request.params;
        console.log("oi",id)
        const ong_id= request.headers.authorization;

        const incidente= await connection('incidents').where('id',id).select('ong_id').first();

        if(incidente.ong_id!==ong_id){
            return response.status(401).json({error:'Operation not permitted'})
        }
        const incident=await connection('incidents').where('id',id).select('*');
        console.log("tchau",incident)
        return response.json(incident);
    },
    async create(request,response){
        const {title,description,value}=request.body;
        const ong_id= request.headers.authorization;
        console.log(title);

        const [id]= await connection('incidents').insert({
         ong_id,    title,description,value
        });
        return response.json({id});
    },

    async update(request,response){
        const {id}=request.params;
        const {title,description,value}=request.body;
        const incidente= await connection('incidents').where('id',id).select('*').first();
         await connection('incidents').where('id',id).update({
             title,description,value
        });
        
        return response.json({old:incidente,new:request.body});
    },

    async delete(request,response){
        const {id}=request.params;
        const ong_id= request.headers.authorization;

        const incidente= await connection('incidents').where('id',id).select('ong_id').first();

        if(incidente.ong_id!==ong_id){
            return response.status(401).json({error:'Operation not permitted'})
        }
        await connection('incidents').where('id',id).delete();
        return response.status(201).send();
    }
}