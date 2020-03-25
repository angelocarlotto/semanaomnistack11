import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'
import api from '../../services/api';
import './styles.css'
import logoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png'
export default function Logon(){

  const [id,setId]=useState('');
  const history=useHistory();
  async function handleLogin(e){
    e.preventDefault();

    try{
      const response=await  api.post('sessions',{id});
         console.log(response.data.name)
        localStorage.setItem('ongId',id);
        localStorage.setItem('ongName',response.data.name);

        history.push('./profile');
       }catch(e){
           alert(`falha no login, tente novamente`)
       }
  }
    return (
      
      <div className="logon-container">

          <section className="form">

          <img src={logoImg} alt="Be The Hero"/>
          <form onSubmit={handleLogin}>
              <h1>Faça seu Logon</h1>
              <input 
              placeholder="Sua ID"
              value={id}
              onChange={e=>setId(e.target.value)}/>
              <button 
              className="button" 
              type="submit" 
              alt="">Entrar</button>
            <FiLogIn 
            size={16} 
            color="#E02041"></FiLogIn>
              <Link
               className="back-link" 
              to="/register">Não tenho cadastro</Link>
          </form>
          </section>
          <img src={herosImg} alt="Heroes"/>
      </div>
      
    );
}