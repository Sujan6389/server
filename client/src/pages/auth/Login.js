import React, {useState,useEffect} from 'react';
import {auth, googleAuthProvider} from "../../firebase.js";
import {toast,} from 'react-toastify';
import {Button} from 'antd';
import {MailOutlined,GoogleOutlined} from '@ant-design/icons';
import {useDispatch,useSelector} from "react-redux";
import {createOrUpdateUser} from "../../function/auth";



const Login = ({history}) => {

    const [email,setEmail] = useState("");
    const [password,setpassword] = useState("");
    const [loading,setLoading] = useState(false);

    const { user }= useSelector((state) => ({...state}));

    useEffect(()=>{
        if(user&&user.token) history.push("/");
    }, [user]);


    let dispatch = useDispatch();

    //Role based redirect

    const roleBasedRedirect = (res)=>{

      
      if(res.data.role=="admin"){
        history.push("/admin/dashboard");
      }else{
        history.push("/user/history");
      }
    };

const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true)

      try{
        const result = await auth.signInWithEmailAndPassword(email,password);

        const {user} = result;
        const idTokenResult = await user.getIdTokenResult();

        createOrUpdateUser(idTokenResult.token)
        .then(  (res)=>   {dispatch({
            type: "LOGGED_IN_USER",
            payload:{
                name:res.data.name,
                email:res.data.email,
                token: idTokenResult.token,
                role:res.data.role,
                _id:res.data._id,

              },
           });
           roleBasedRedirect(res);
           }) 
         .catch(err => console.log(err));

            //  history.push('/')

      }

      catch(error){

        console.log(error);
        toast.error(error.message);
        setLoading(false);

      }

    

    };
       //Google Login

        const googleLogin = async() => {
        auth.signInWithPopup(googleAuthProvider)


        .then(async(result)=>{
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
        .then(
          (res)=>   {dispatch({
            type: "LOGGED_IN_USER",
            payload:{
                name:res.data.name,
                email:res.data.email,
                token: idTokenResult.token,
                role:res.data.role,
                _id:res.data._id,

             },
           });
          roleBasedRedirect(res);
           })

          .catch();
            // history.push("/");
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message)
        })

    };
    
     const loginForm = () =>
     <form onSubmit={handleSubmit}>

      <div className="form-group">
        <input type = "email" className = "form-control"
       
       value={email} 
       
       onChange={e => setEmail(e.target.value)} 

       placeholder="Your Email"
       
        autoFocus/>
      </div>

     <div className="form-group">
       <input type = "password" className = "form-control"
       
       value={password} 
       
       onChange={e => setpassword(e.target.value)} 

       placeholder="Your Password"
       
       />
     </div>

       <br/>
       
      <Button
       onClick={handleSubmit}
       type="primary"
       className="mb-3"
       block
       shape="round"
       icon={<MailOutlined/>}
       size="large"
       disabled={ !email|| password.length<6}>
          
          Login with Email and Password
          
      </Button>
    </form>




    return(
        
           <div className="container p-5">
               <div className="row">

                  <div className="col-md-6 offset-3">
                   {loading ? <h4>Loaing...</h4> : 
                   (
                    <h4>Login</h4>
                   )
                   }
          
                   {loginForm()}

                   {/* Google Login */}

                   <Button
             onClick={googleLogin}
             type="danger"
             className="mb-3"
             block
             shape="round"
             icon={<GoogleOutlined/>}
             size="large">
               Login with Google
                   </Button>

             </div>
             </div>
             </div>
           
        
    );
}
export default Login;