import '../../Styles/App.css';
import Login from './Login.js';
import Inscription from './Inscription.js';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import ForgetPassword from './ForgetPassword';
import ForgetPassword2 from './ForgetPassword2';
import ForgetPassword3 from './ForgetPassword3';
import PremiereConnexionAdmin from './PremiereConnexionAdmin';

//Import e-commercant
import Home from '../E_commercant/Home';
import Creer_une_requete_E_commercant from '../E_commercant/Creer_une_requete_E_commercant';
import Liste_requeteEcommercant from '../E_commercant/Liste_requeteEcommercant';
import EditRequest from '../E_commercant/EditRequest';
import EditProfilEcommercant from '../E_commercant/EditProfilEcommercant';
import ListeServices from '../E_commercant/ListeServices';
import Documentation from '../E_commercant/Documentation';
import Support from '../E_commercant/Support';
import DemandePaiement from '../E_commercant/DemandePaiement';
import ListeDemandePaiementClient from '../E_commercant/ListeDemandePaiementClient';


function App() {

  return (
    < >
    
    

<UserResetPasswordContextProvider>     
  <UserHomeContextProvider> 
    <RequestContextProvider>
      <ServicesContextProvider>
        <PaiementContextProvider>
      <BrowserRouter>

        <Routes>

         
          <Route path='/' element={<Login/>}/>
         
        
          <Route path='/home/documentation' element={<Documentation />} />
          <Route path='/home/support' element={<Support />} />
        
          
         


        </Routes>
      
      </BrowserRouter>
      
      </PaiementContextProvider>

      </ServicesContextProvider>
      
      </RequestContextProvider>

      </UserHomeContextProvider>

      </UserResetPasswordContextProvider>

    </>
  );
}

export default App;
