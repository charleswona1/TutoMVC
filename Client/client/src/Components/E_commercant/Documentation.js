import '../../Styles/documentation.css'
import HeaderEcommercant from "./HeaderEcommercant.js";
import NavbarEcommercant from "./NavbarEcommercant.js";
import FooterEcommercant from "./FooterEcommercant.js";
import ApplicationsEcommercant from "./ApplicationsEcommercant.js";
import Loader from '../Racine/Loader';
import { useEffect, useState } from 'react';

function Documentation() {

  const [nomParking, setnomParking] = useState("")

  const [ApinomParking, setApinomParking] = useState("")

  const [ApiLIsteParking, setApiLIsteParking] = useState(false)

  const [ListePArking, setListePArking] = useState([])

  const [checkup, setcheckup] = useState(false)

  const handleCreerParking = () => {

    console.log(nomParking)

    setApinomParking(true)
  }

  const handleListeParking = ()=>{

    setApiLIsteParking(true)
  }

  useEffect(() => {

    if (ApiLIsteParking === true) {

      setListePArking([])

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
        .catch(() => {
        })

      setApiLIsteParking(false)
    }

  }, [ApiLIsteParking])






  useEffect(() => {


    if (ApinomParking === true) {

      //appel de bcpay/liste service

      fetch(`http://localhost:9000/creerParking`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nomParking),
      })

        .then((response) => {

          if (response.status === 10000) {
            response.json()

              .then((response) => {

              })
          }
          else if (response.status === 10001) {


          }


        })
        .catch(() => {



        })

      setApinomParking(false)
    }

  }, [ApinomParking])


  return (

    <>
      <HeaderEcommercant />

      <NavbarEcommercant />

      <ApplicationsEcommercant />

      <FooterEcommercant />

      <div class="documentationClient">

        <p>CREATION PARKING</p>


        {/* Nom de l'expediteur*/}
        <div class="nom_requete" >

          <label for="nom">Nom du parking:</label>

          <input class="input_requete" type="text" value={nomParking} onChange={(e) => {setnomParking(e.target.value) }} autocomplete="off" id="nom"  required />

        </div>

        <button onClick={handleCreerParking}>creer</button>

        <p>Liste Parking</p>


        <button onClick={handleListeParking}>Actualiser</button>

{
  checkup === true && <>

{ListePArking.map(e=><div>

    <div>{e}</div>

  </div>)}
  
  <div>verifier en console</div>


  </>
}

      </div>

    </>
  )
}

export default Documentation;	
