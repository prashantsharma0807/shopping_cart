import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "./Contextapi";

function Login() {
    const {setLoginname}=useContext(Contextapi)
    const [name,setName]=useState('')
    const [pass,setPass]=useState('')
    const [message,setMessage]=useState('')
    let navigate=useNavigate()
   
    
    function handleform(e){
        e.preventDefault()
        const formData={name,pass}
        fetch('/api/logincheck',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)
        }).then((result)=>{return result.json()}).then((data)=>{
            if(data.status===200){
                  window.localStorage.setItem('loginname',data.apiData.name)
                  setLoginname(window.localStorage.getItem('loginname'))
                  if(data.apiData.name==='admin'){
                    navigate('/dashboard')
                  }else{
                    navigate('/product')
                  }
            }else{
                setMessage(data.message)
            }
        })
    }

    return ( 
        <section id='reg'>
        <div className="container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2>Login Page</h2>
                    {message}
                <form onSubmit={(e)=>{handleform(e)}}>
                    <label className="form-label">User Name</label>
                    <input type="text" className="form-control"
                      value={name}
                      onChange={(e)=>{setName(e.target.value)}}
                    />
                    <label className="form-label">Passwaord</label>
                    <input type="password" className="form-control" 
                      value={pass}
                      onChange={(e)=>{setPass(e.target.value)}}
                    />
                    <button type="submit" className="form-control btn btn-success mt-2">Login</button>
                    <Link to='/reg'>Creat a new Account</Link>
                </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>


    </section>
     );
}

export default Login;
