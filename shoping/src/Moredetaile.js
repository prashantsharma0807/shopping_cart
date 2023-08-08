import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Contextapi } from "./Contextapi";

function Moredetaile() {
    const {id}=useParams()
    const[name,setName]=useState('')
    const[desc,setDesc]=useState('')
    const[price,setPrice]=useState('')
    const[weight,setWeight]=useState('')
    const[img,setImg]=useState('')
    const[message,setMessage]=useState('')
    const {loginname}=useContext(Contextapi)
    const navigate=useNavigate()
    if(!loginname){
        navigate('/')
    }
    useEffect(()=>{
        fetch(`/api/singledataile/${id}`).then((result)=>{return result.json()}).then((data)=>{
            // console.log(data)
            if(data.status===200){
                    setName(data.apidata.name)
                    setDesc(data.apidata.desc)
                    setPrice(data.apidata.price)
                    setWeight(data.apidata.weight)
                    setImg(data.apidata.img) 
            }else{
                      setMessage(data.message)
            }
        })
    },[])
    return (
        <section id='moredetaile'>
        <div className="container">
            <div className="row mx-auto">
                <div className="col-md-6">
                    {message}
                        <img src={`../images/${img}`} style={{width:'180px'}} className="mx-auto d-block img-fluid" alt="..."/>
                                <h5>{name}</h5>
                                <h5>{weight}</h5>
                                <h4 className="card-text mt-3"> ₹{price}</h4>
                                
                    </div>
                    <div className="col-md-4"><p>{desc}</p></div>
                    <div className="col-md-2"></div>
                </div>            
            </div>
    </section>
      );
}

export default Moredetaile;