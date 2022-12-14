import '../../Styles/headerEcommercant.css'
import deconnexion from '../../Styles/Images/deconnexion.jpeg'
import parametres2 from '../../Styles/Images/parametres2.jpeg'
import { useContext,useEffect, useState} from 'react';
import {UserHomeContext} from '../Context/UserHomeContext'
import { Link,useNavigate } from 'react-router-dom';

function HeaderEcommercant () {

  const [DeconnexionApi,setDeconnexionApi]=useState(false)

  //Recuperation Context 
 
  const value = useContext(UserHomeContext)

  const {

   nom,
   emailH,
   role,
  
    setUserHomeContext

  }=value
 
  //Pour les redirections
  const navigate = useNavigate();
  
	//Chargement de la page
 
  useEffect(() => {
  
   //
    
  },[])

  //clic sue=r le lien Deconnexion
const handleDeconnexion = e => {

  e.preventDefault(); 
  setDeconnexionApi(true)

}

//Effet de bord pour deconnexion  appel de bcpay/deconnexion

useEffect(() => {

  if (DeconnexionApi===true){

//appel de bcpay/deconnexion

fetch(`http://localhost:9000/deconnexion`, {

  method: 'GET',
  headers: {'Content-Type': 'application/json' },

})
        .then((response) =>{
          
          if(response.status=== 810){

            //Deconnexion

            setUserHomeContext({nom:null}) 
               setUserHomeContext({emailH:null})
               setUserHomeContext({role:null})

               //redirection login

               navigate('/');
           
          
          }
        
        }
    
    )


    setDeconnexionApi(false)
}

},[DeconnexionApi])


return (
  
 <> 
<header>
  <div class="title">Bc Pay</div>

  <div class="info_user">

  <h3>{nom}</h3>
  <h3>{emailH}</h3>
  <h3> {role}</h3>
  
</div>

<img  src={parametres2} alt='profil' class="img_edit_profilHeader" title="Cliquez pour vous deconnectez" />

<Link to='/home/editer_profil' class="edit_profilEcommercant"> Editez mon profil</Link>

<img  src={deconnexion} alt='profil' class="img_deconnexionHeader" title="Cliquez pour vous deconnectez" /><a href="#" onClick={handleDeconnexion} class="deconnexonHeader"  title="Cliquez pour vous deconnectez">Deconnexion</a>

</header>


<nav>



</nav>




 </>

		)
}







export default HeaderEcommercant;	
