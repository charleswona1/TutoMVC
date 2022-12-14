import '../../Styles/support.css'
import HeaderEcommercant from "./HeaderEcommercant.js";
import NavbarEcommercant from "./NavbarEcommercant.js";
import FooterEcommercant from "./FooterEcommercant.js";
import ApplicationsEcommercant from "./ApplicationsEcommercant.js";
import Loader from '../Racine/Loader';
import { useEffect, useState } from 'react';

function Support () {

  const [dureeP,setdureeP]=useState("")

  const [emplacement,setemplacement]=useState("")

  const [Parking,setParking]=useState("")

  const [ListePArking, setListePArking] = useState([])

  const [checkup, setcheckup] = useState(false)

  const [ApiListe,setApiListe]= useState(false)


  useEffect(() => {
    
    setApiListe(true)

    setListePArking([])

}, [])



useEffect(() => {

  if (ApiListe === true) {

    //appel de bcpay/liste service

    fetch(`http://localhost:9000/GetParking`, {

      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      
    })

      .then((response) => {

          response.json()

            .then((response) => {

              response.map(parking =>{

                ListePArking.push(parking.nom);

              })

              setcheckup(true)

              console.log(ListePArking)

            })

            //console.log(ListePArking)

      })
     

    setApiListe(false)
  }

}, [ApiListe])


 


  useEffect(() => {
      //appel de bcpay/liste service

setListePArking([])


fetch(`http://localhost:9000/GetParking`, {

        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        
      })
      .then((response) => {
  
        response.json()

          .then((response) => {

            response.map(parking =>{

              ListePArking.push(parking.nom);

            })

            setcheckup(true)

          })

          console.log(ListePArking)

    })

  }, [])

return(

<>
  <HeaderEcommercant />

<NavbarEcommercant />

<ApplicationsEcommercant />

<FooterEcommercant />

<div class="supportClient">

<p>Ajoutez un ticket</p>

 {/* Nom de l'expediteur*/}
 <div class="" >

<label for="nom">Emplacement:</label>

<input class="input_requete" type="text" value={dureeP} onChange={(e) => {setdureeP(e.target.value) }} autocomplete="off" id="nom"  required />

</div>

{/* Nom de l'expediteur*/}
<div class="" >

<label for="nom">Duree:</label>

<input class="input_requete" type="text" value={emplacement} onChange={(e) => {setemplacement(e.target.value) }} autocomplete="off" id="nom"  required />

</div>

{/* Nom de l'expediteur*/}
<div class="" >

<label for="nom">Parking</label>

<input class="input_requete" type="text" value={Parking} onChange={(e) => {setParking(e.target.value) }} autocomplete="off" id="nom"  required />

{ListePArking.map(parking =>

<div>

<input type="checkbox" name="services_requete"  />
<label for="services_requete">{parking}</label>

</div>)}

<input type="checkbox" name="services_requete"  />
<label for="services_requete">Parking A</label>

</div>

<button>valider</button>

</div>


</>
)
}

export default Support;	