import '../../Styles/navbarEcommercant.css'
import { Link} from 'react-router-dom';
import { click } from '@testing-library/user-event/dist/click';
import { useEffect, useState ,useContext} from 'react';
import {UserHomeContext} from '../Context/UserHomeContext'

function NavbarEcommercant () {

  //HandleClick 

const handleClick=e=>{

  e.preventDefault()
  
  for(let m=1; m<4; m++){

    var index="element_navbar_filsEcommercant"+m 
    document.getElementById(index).style.color="black" 
    document.getElementById(e.target.id).style.fontStyle="none"
    document.getElementById(e.target.id).style.fontSize="17px"
   
    
  } 
  console.log(e.target.id)

  document.getElementById(e.target.id).style.color="red" 
  document.getElementById(e.target.id).style.fontSize="17px"
  
}

//Recuperation Context 

  const value = useContext(UserHomeContext)

  const {

   nom,
   emailH,
   role,
  
    setUserHomeContext

  }=value



const [nbreReq,setnbreReq]=useState()

  const [check_up,setcheck_up]=useState(false)

  const [list_requetes_pasT,setlist_requetes_pasT]=useState([])



useEffect(() => {
   
  //appel de bcpay/liste requete by user

  const user={
    email:String(emailH)

  }
  
  fetch(`http://localhost:9000/liste_requete`, {
  
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(user), 
  
  })
          .then((response) =>{

            if(response.status===10000){

              response.json()

              .then((response)=>{
  
                setlist_requetes_pasT([])
  
                response.map(e=>{
    
                  if(e.statut==='EN COURS TRAITEMENT'){
                    
                      list_requetes_pasT.push(e)
     
                  }
                })  
  
                if (list_requetes_pasT.length=== 1){
                  setnbreReq(1)
                  setcheck_up(true)
  
                }
                else if (list_requetes_pasT.length=== 0){
                  setnbreReq(0)
                  setcheck_up(true)
                }
                else{
                  setnbreReq(list_requetes_pasT.length/2)
                  setcheck_up(true)
                } 
               
        
              })
 
              
            }
            else if(response.status===10001){

              setnbreReq(0)
                  setcheck_up(true)

            }
            
          })
          .catch(()=>{
            
            setnbreReq(0)
                  setcheck_up(true)
          })
  
  },[])

  //liste des demandes en cours

const [Liste_demande_enCours,setListe_demande_enCours]=useState([])

const [check_upDemande,setcheck_upDemande]=useState(false)

const [nbredemande,setnbredemande]=useState()


  //Appel de api liste demandes by user

useEffect(() => {

    const user = {
      email:String(emailH)
    }

setListe_demande_enCours([])
//appel de bcpay/liste des demandes by user

fetch(`http://localhost:9000/GetDemandesPaiementByUser`, {

  method: 'POST',
  headers: {'Content-Type': 'application/json' },
  body: JSON.stringify(user)  
})
        .then((response) =>{

          if(response.status===10000){

            response.json()

            .then((response)=>{
  
              response.map(demande=>{
                
                if(demande.status==="EN COURS"){
  
                  Liste_demande_enCours.push(demande)
  
                }
  
              })
  
              if (Liste_demande_enCours.length=== 1){
                setnbredemande(1)
                setcheck_upDemande(true)
  
              }
              else if (Liste_demande_enCours.length=== 0){
                setnbredemande(0)
                setcheck_upDemande(true)
              }
              else{
                setnbredemande(Liste_demande_enCours.length/2)
                setcheck_upDemande(true)
              } 
   
              
            })

          }
          else if(response.status===10001){

            setnbredemande(0)
            setcheck_upDemande(true)
          }
          
        })

        .catch(()=>{

          setnbredemande(0)
            setcheck_upDemande(true)
        })

},[])

 
return (
  
 <>
 
<div className="navbarEcommercant">

     

        <p class="element_navbar_e_commercant" id="element_navbar_e_commercant1" onClick={handleClick} ><Link class="element_navbar_filsEcommercant" id="element_navbar_filsEcommercant1" to='/home' >Acceuil</Link></p>

        <p class="element_navbar_e_commercant" id="element_navbar_e_commercant2" onClick={handleClick}> <Link class="element_navbar_filsEcommercant" id="element_navbar_filsEcommercant2" to='/home/ListeDemande'>Demande de paiement{nbredemande !==0 && <div class="compteurdemande">{nbredemande}</div>}</Link></p>

				<p class="element_navbar_e_commercant" id="element_navbar_e_commercant3" onClick={handleClick}> <Link class="element_navbar_filsEcommercant" id="element_navbar_filsEcommercant3" to='/home/creer_requete'>Souscrire a un service</Link></p>     

				<p class="element_navbar_e_commercantservices" id="element_navbar_e_commercant4" onClick={handleClick}> <Link class="element_navbar_filsEcommercant" id="element_navbar_filsEcommercant4" to='/home/liste_requete'>Liste des services <div class="souscrits">souscrits</div> {nbreReq !==0 && <div class="compteurClient">{nbreReq}</div>}</Link></p>

				<p class="element_navbar_e_commercant" id="element_navbar_e_commercant5"  onClick={handleClick}><Link class="element_navbar_filsEcommercant" id="element_navbar_filsEcommercant5" to='/home/liste_Services'>Consulter les services</Link></p>

				<p class="element_navbar_e_commercant" id="element_navbar_e_commercant6" onClick={handleClick}><Link class="element_navbar_filsEcommercant" id="element_navbar_filsEcommercant6" to='/home/documentation'>Documentation</Link></p>

				<p class="element_navbar_e_commercant" id="element_navbar_e_commercant7" onClick={handleClick}><Link class="element_navbar_filsEcommercant" id="element_navbar_filsEcommercant7" to='/home/support'>Support</Link></p>




</div>

 </>

		)
}







export default NavbarEcommercant;	
