import '../../Styles/login.css'
import {useState, useEffect, useContext} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {UserHomeContext} from '../Context/UserHomeContext'

function Login () {

   //Recuperation Context 

   const value = useContext(UserHomeContext)

   const {

    nom,
    emailH,
    role,
   
     setUserHomeContext
 
   }=value


////////
  const DataConnexion={ 

    email: "",
    password: ""

  }

  const [DataForConnexion , setDataForConnexion]=useState(DataConnexion)

  const {email,password} =DataForConnexion;

  const navigate = useNavigate();

const [ConnexionApi,setConnexionApi]=useState(false)
const [NewTokenApi,setNewTokenApi]=useState(false)
const [MessageTokenEdit,setMessageTokenEdit]=useState(false)
const [BoutonEncours,setBoutonEncours]=useState(true)

const [MessageConnexionEmailInex , setMessageConnexionEmailInex]=useState(false)
const [MessageConnexionTokenExp , setMessageConnexionTokenExp]=useState(false)
const [MessageConnexionTokenPasEncoreActive , setMessageConnexionTokenPasEncoreActive]=useState(false)
const [MessageConnexionTokeninexistantAndJustSend , setMessageConnexionTokeninexistantAndJustSend]=useState(false)
const [MessageConnexionBadPassword , setMessageConnexionBadPassword]=useState(false)
const [MessageErreurApi , setMessageErreurApi]=useState(false)

//Entree d'un formulaire

const handlechange = e => {
  
  setDataForConnexion({...DataForConnexion , [e.target.id]:[e.target.value]})

} 

 
//Verification Validation de connexon et appel du use effect correspondant

const handleSubmit = e => {

  e.preventDefault();
 setConnexionApi(true)
 setBoutonEncours(false)
 ////////////////////hacher mot de passe avant envoie//////

}
//clic sue=r le lien Token
const handleToken = e => {

  e.preventDefault(); 
  
  setNewTokenApi(true)

}


//Appel du use effect pour token
useEffect(() => {

  
  setMessageTokenEdit(false)

  setMessageConnexionEmailInex(false)
  setMessageConnexionTokenExp(false)
  setMessageConnexionTokenPasEncoreActive(false)
  setMessageConnexionTokeninexistantAndJustSend(false)
  setMessageConnexionBadPassword(false)
  setMessageErreurApi(false)
   
  if (NewTokenApi===true){

//appel de bcpay/token_expire

fetch(`http://localhost:9000/token_expire`, {

  method: 'POST',
  headers: {'Content-Type': 'application/json' },
  body: JSON.stringify( String(DataForConnexion.email))
})
        .then((response) =>{
          
          if(response.status=== 800){

            //Token Modifie

            setMessageTokenEdit(true)

            setDataForConnexion({email:"",password:""})
          
          }
        
        }   
    
    )
    .catch(()=>{

      setDataForConnexion({email:"",password:""})
      
      setMessageErreurApi(true)

    })


    setNewTokenApi(false)
}

},[NewTokenApi])

   

//Appel du use effect de validation pour connexiom user au pres de L'API
useEffect(() => {

  setMessageTokenEdit(false)
  setMessageConnexionEmailInex(false)
  setMessageConnexionTokenExp(false)
  setMessageConnexionTokenPasEncoreActive(false)
  setMessageConnexionTokeninexistantAndJustSend(false)
  setMessageConnexionBadPassword(false)
  setMessageErreurApi(false)
   
  if (ConnexionApi===true){

    const DataForConnexion2={

      email: String(DataForConnexion.email),
      password:String(DataForConnexion.password),
  
  }

//appel de bcpay/connexion



fetch(`http://localhost:9000/connexion`, {

  method: 'POST',
  headers: {'Content-Type': 'application/json' },
  body: JSON.stringify(DataForConnexion2)
})
        .then((response) =>{
        
          if(response.status=== 1000){

            //Connexion e_commercant

            //Connexion reussie

            setDataForConnexion({email:"",password:""})

            response.json()
              
              .then((Promise)=>{

               setUserHomeContext({nom:Promise.nom}) 
               setUserHomeContext({emailH:Promise.email})
               setUserHomeContext({role:"e-commercant"})

               //redirection home e_commercant

               navigate('/home');
              
             })
             
             

          }
         else if (response.status=== 1010){

          //Connexion Administarteur

            //Connexion reussie

            setDataForConnexion({email:"",password:""})

            response.json()
              
              .then((Promise)=>{
                
                setUserHomeContext({nom:Promise.nom}) 
                setUserHomeContext({emailH:Promise.email})
                setUserHomeContext({role:"Administrateur"})

                //redirection home Administrateur

             navigate('/dashboard');
 
             
             })

             

          }
          else if(response.status=== 1001){
            //Email inexsitant

            setMessageConnexionEmailInex(true)

           setDataForConnexion({email:"",password:""})

           setBoutonEncours(true)

          }
          else if(response.status=== 1002){

            // Token expire
            setMessageConnexionTokenExp(true)

            setBoutonEncours(true)

          }
          else if(response.status=== 1003){

            //Token Valide mais pas de click

            setMessageConnexionTokenPasEncoreActive(true)

            setDataForConnexion({email:"",password:""})

            setBoutonEncours(true)
          }
          else if(response.status=== 1004){

            //Token inexistant et viens d'etre envoye
            
            setMessageConnexionTokeninexistantAndJustSend(true)

            setDataForConnexion({email:"",password:""})

            setBoutonEncours(true)
          }
          else if(response.status=== 1005){

            //Mauvais mot de passe
            setMessageConnexionBadPassword(true)

            setDataForConnexion({email:"",password:""})

            setBoutonEncours(true)

          }
          else if(response.status=== 1008){

            //Premiere connexion Admin

           
            setUserHomeContext({emailH:email})
            

           navigate('/connexionAdmin')

          }
          else if(response.status=== 1007){

            //Une erreur s'est produite
            setMessageErreurApi(true)

            setDataForConnexion({email:"",password:""})

            setBoutonEncours(true)

          }
          
        }
    
    )
    .catch(()=>{

      setMessageErreurApi(true)

      setDataForConnexion({email:"",password:""})

      setBoutonEncours(true)
      
    })


    setConnexionApi(false)
}

},[ConnexionApi])







return (  
  
 <>

<div class="login"> 
	
	<h1 class="titre_login">Nom du projet </h1>

  <form  onSubmit={handleSubmit} > 

    <div class="email_login" >

    <label for="email">Email:</label>
     
    <input  class="input_login" autocomplete="off" type="email" id="email" onChange={handlechange} value={email}  placeholder="example@gmail.com" required/>
    
     </div>  

     <div class="password_login" >
     
     <label for="password">Mot de passe:</label>
     
     <input class="input_password" type="password" autocomplete="off" id="password" onChange={handlechange} value={password} placeholder="Mot de passe" required/>
     
    </div>

   {BoutonEncours===true && <button type="submit" class="connexion_login"> Connexion </button>} 
   {BoutonEncours===false && <button type="submit" class="connexion_login" disabled> Connexion </button>} 

    <div class="forget_password_login" ><Link to="/forgetpassword">mot de passe oublie ?</Link></div>

    <div class="inscription_login" ><Link to='/inscription'>Inscription en un click?</Link></div>


   
   </form>
 
</div>		


{MessageConnexionEmailInex ===true && <span class="messagecompte">Cet email n'existe,nous vous recommnadons de creer un compte </span>}

{MessageConnexionTokenExp ===true && <div class="messagecompte">Le lien d'activation qui vous ete envoye a expire,<a href="#" onClick={handleToken} >cliquez ici pour demander un nouveau mail</a> </div>}
{MessageConnexionTokenPasEncoreActive ===true && <span class="messagecompte">Votre compte n'est toujours pas active,consultez vos mails pour activer celui ci </span>}

{MessageConnexionTokeninexistantAndJustSend ===true && <span class="messagecompte">Un token de validation de votre compte viens d'etre envoye,consultez vos mails et activez votre compte </span>}
{MessageConnexionBadPassword ===true && <span class="messagecompte">Vos identifiants sont incorrects,entrez le bon mot de passe </span>}

{MessageTokenEdit ===true && <span class="messagecompte">Un nouveau mail d'activation de votre compte a ete envoye,consultez le!! </span>}

{MessageErreurApi===true && <span class="messagecompte">Une erreur s'est produite,verifiez votre connexion</span>}
 </>

		)
}







export default Login;	
