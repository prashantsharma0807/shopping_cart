import { useState } from "react";
import { Link } from "react-router-dom";

function Reg() {

    const [name,setName]=useState('')
    const [pass,setPass]=useState('')
    const [message,setMessage]=useState('')

    function handleform(e){
        e.preventDefault()
        const formData={name,pass}
        fetch('/api/regdata',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(formData)
        }).then((result)=>{return result.json()}).then((data)=>{
            if(data.status===201){
                setMessage(data.message)
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
                    <h2>Registration Page</h2>
                    {message}
                <form onSubmit={(e)=>{handleform(e)}}>
                    <label className="form-label">User Name</label>
                    <input type="text" className="form-control" 
                      value={name}
                      onChange={(e)=>{setName(e.target.value)}}
                    />
                    <label className="form-label">Passwaord</label>
                    <input type="password" className="form-control" required minLength={6}
                      value={pass}
                      onChange={(e)=>{setPass(e.target.value)}}
                    />
                    <button type="submit" className="form-control btn btn-success mt-2">Creat Account</button>
                    <Link to='/'>Login Page</Link>
                </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>


    </section>
     );
}

export default Reg;
