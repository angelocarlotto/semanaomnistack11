import React,{useEffect, useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'
import logoImg from '../../assets/logo.svg'
export default function Profile(){
        const history=useHistory();
const [incidents,setInccidents]=useState([]);
        const ongName=localStorage.getItem('ongName');
        const ongId=localStorage.getItem('ongId');
        useEffect(()=>{
                api.get('profile',{
                        headers:{
                                Authorization:ongId
                        }
                }).then(response=>{
                        setInccidents(response.data)
                })
        },[ongId]);

       async  function handleDeleteIncidente(id){
                try {
                        await api.delete(`incidents/${id}`,{
                                headers:{
                                        Authorization:ongId
                                }
                        })

                        setInccidents(incidents.filter(e=>e.id!==id))
                } catch (error) {
                        alert('erro ao deletar caso, tente novamente')
                }
        }

        function handleLogout(){
                localStorage.clear();
                history.push('/');
        }
    return (
      
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vindo, {ongName}</span>
                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#e02041"></FiPower>

                </button>
            </header>

            <h1>Casos Cadastrados</h1>
            <ul>
            {incidents.map(incident=>(

                                <li key={incident.id}>
                                <strong>CASO:</strong>
                                <p>
                                {incident.title}
                                </p>
                                <strong>DESCRIÇÃO:</strong>
                                <p>
                                {incident.description}
                                </p>

                                <strong>VALOR:</strong>
                                <p>
                                  {Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(  incident.value)}
                                </p>

                                <button onClick={()=>handleDeleteIncidente(incident.id)} type="button">

                                        <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>

                                </button>
                                </li>
            ))}
            </ul>
        </div>
    );
}