import client from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import Auth from './pages/Auth';
import { useState, useEffect , useMemo} from 'react';
import {ToastContainer} from "react-toastify";
import { getToken ,decodeToken } from './Utils/token';
import AuthContext from './context/AuthContext';
import Navigation from './routes/Navigation';


export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(()=> {
    const token = getToken();
    if(!token){
      setAuth(null);

    }else{
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () =>{
    console.log('close')
  }

  const setUser =(user) =>{
    setAuth(user)
  }
  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if(auth === undefined) return null;

  return (

    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
      <div className="App">
        {!auth ? <Auth/> : <Navigation />}
        <ToastContainer position='top-right' theme='colored' autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
      </AuthContext.Provider>
    </ApolloProvider>
   
  );
}

