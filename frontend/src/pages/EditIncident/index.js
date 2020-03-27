import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import api from '../../services/api'
import './styles.css'
import logoImg from '../../assets/logo.svg'
export default function NewIncidents(){

    const history=useHistory();
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [value,setValue]=useState('');
    const ongId=localStorage.getItem('ongId');

    useEffect(()=>{
        api.get(`incidents/17`,{headers:{Authorization:ongId}})
        .then(response=>{
             const incident=response.data;
             setTitle(incident.title);
             setDescription(incident.description);
             setValue(incident.value);
        })
    },[ongId,value,description,title]);
    async function handleUpdateIncident(e){

        e.preventDefault();

        const data={title,description,value};   

        try{
            const response=await  api.put('incidents/16',data,{
                headers:{
                    Authorization:ongId
                }
            });
            history.push('/profile');
        }catch(e){
            alert(`erro ao cadsatra caso tente novamente`)
        }
    }

    return (
      
    <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be the hero"/>
                <h1>Atualizar dados do caso</h1>
                <Link className="back-link" to="/profile">
                <FiArrowLeft size={16} color="#E02041"></FiArrowLeft>
                    Voltar
                </Link>
            </section>
            <form onSubmit={handleUpdateIncident   }>
                <input 
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    placeholder="Titulo do Caso"/>
                <textarea  
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    placeholder="Descrição"/>
                <input 
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                    placeholder="Valor em Reais"/>
                <button 
                    className="button" 
                    type="submit">
                    Atualizar
                </button>
            </form>
        </div>
    </div>
    );
}