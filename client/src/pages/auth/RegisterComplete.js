import React, {useState,useEffect} from 'react';
import {auth} from "../../firebase.js";
import {toast,} from 'react-toastify';
import {useDispatch,useSelector} from "react-redux";
import {createOrUpdateUser} from "../../function/auth";



const RegisterComplete = ({history}) => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const { user }= useSelector((state) => ({...state}));

    let dispatch = useDispatch();


    useEffect(()=>{
        setEmail(window.localStorage.getItem("emailForRegistration"));
        // console.log(window.href);
        // console.log(window.localStorage.getItem("emailForRegistration"))
        },[user,history]);

const handleSubmit = async (e) => {

    e.preventDefault();
    // validation

    if(!email||!password){
        toast.error("Email and password is required");
        return;
    }
    if(password.length<6){
        toast.error("password must be atleast 6 character");
        return;
    }


    try{
        const result = await auth.signInWithEmailLink(email, window.location.href);
        // console.log("Result",result)
        if(result.user.emailVerified){
            window.localStorage.removeItem("emailForRegistration");

            let user=auth.currentUser
            await user.updatePassword(password);
            const idTokenResult = await user.getIdTokenResult()

            console.log('user',user,'idTokenResult',idTokenResult);
            

            createOrUpdateUser(idTokenResult.token)
            .then((res)=>   {dispatch({
                type: "LOGGED_IN_USER",
                payload:{
                    name:res.data.name,
                    email:res.data.email,
                    token: idTokenResult.token,
                    role:res.data.role,
                    _id:res.data._id,
                    },
            });
          })
            .catch(err => console.log(err))
    

            history.push('/')
            
        }

    }
    catch (error){
        console.log(error);
        toast.error(error.message)

    }

   

};
    
    const completeRegistrationForm = () =>
     <form onSubmit={handleSubmit}>

       <input 
         type = "email"
         className = "form-control" 
         value={email} 
         disabled
         
        />
        <input 
         type = "password"
         className = "form-control" 
         value={password} onChange={e =>setPassword(e.target.value)}
         placeholder="password"
         autoFocus
         
        />
       
       <button type="submit" 
         className="btn btn-raised"> Complete Registration
       </button>

    </form>




    return(
        
           <div className="container p-5">
               <div className="row">

                  <div className="col-md-6 offset-3">
                    <h4>RegisterComplete</h4>
          
                   {completeRegistrationForm()}
                  </div>


               </div>
            </div>
           
        
    );
}
export default RegisterComplete;