import React,{useEffect,useState} from 'react';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {View,FlatList, Image,Text, TouchableOpacity} from 'react-native';

import api from '../../services/api'
import logoImg from '../../assets/logo.png'
import styles from './styles'

export default function Incidents(){
    const navigation=useNavigation();
    const [incidents,setIncidents]=useState([]);
    const [total,setTotal]=useState(0);
    const [totalCarregado,setTotalCarregado]=useState(0);
    const [page,setPage]=useState(1);
    const [loading,setLoading]=useState(false);
    function navigateToDetail(incident){
        navigation.navigate('Detail',{incident})
    }

    async function loadIncidents(){
        console.log("inicio loadIncidents")
            if(loading){
                return;
            }
            if(total>0 && incidents.length==total){
                return;
            }

            setLoading(true);

            try {
                const response = await api.get('incidents',{params:{page}});

                setIncidents([... incidents, ... response.data]);
    
               
                console.log("total1:",total)
                console.log("totalCarregado1:",totalCarregado)
                
                setTotalCarregado(incidents.length);
                setTotal(response.headers['x-total-count']);
    
                console.log("total2:",total)
                console.log("totalCarregado2:",totalCarregado)
    
                setPage(page+1);
            } catch (error) {
                
            }
          
            setLoading(false);

            console.log("fim loadIncidents")
    }

    async function refreshIncidents(){
        console.log("inicio refreshIncidents")
        if(loading){
            return;
        }

        try{
            setLoading(true);

            const response = await api.get('incidents');
    
            setIncidents( response.data);
            setTotalCarregado(response.data.length);
            setTotal(response.headers['x-total-count']);
            setPage(2);
        }catch(e){

        }
       
        setLoading(false);

       console.log("fim refreshIncidents")

    }

    useEffect( ()=>{
         loadIncidents();

    },[]);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
    Total de <Text style={styles.headerTextBold}> {totalCarregado}/{total} casos </Text>.
                </Text>
                
            </View>


            <Text style={styles.title}>Bem-Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>
                <FlatList 
                refreshing={loading}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                onRefresh={refreshIncidents}
                style={styles.incidentList}

                data={incidents}
                keyExtractor={incident=>String( incident.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item:incident})=>(

                <View  style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}({incident.id})</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',{
                        style:'currency',
                        currency:'BRL'
                        }).format(incident.value)}</Text>

                    <TouchableOpacity style={styles.detailButton} onPress={()=>navigateToDetail(incident)}>
                        <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>
                    </TouchableOpacity>
                </View>

            )}/>
          
        </View>
    )
}