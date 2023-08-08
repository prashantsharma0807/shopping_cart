import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "./Contextapi";

function Products() {
       
  const {loginname,cart,setCart}=useContext(Contextapi)

  const [product,setProduct]=useState([])
  const [message,setMessage]=useState('')
  const navigate=useNavigate()
     if(!loginname){
        navigate('/')
     }
     useEffect(()=>{
        fetch('/api/stockproduct').then((result)=>{return result.json()}).then((data)=>{
                if(data.status===200){
                    setProduct(data.apidata)
                }else{
                    setMessage(data.message)
                }
        })
     },[])
     
    function handlecart(e,product){
        let _cart ={...cart}
        if(!_cart.items){
            _cart.items={}
        }
        if(!_cart.items[product._id]){
            _cart.items[product._id] =1
        }else{
            if(_cart.items[product._id] >=4)
            {
                return
            }
            _cart.items[product._id] +=1
        }

        if(!_cart.totalItems){
            _cart.totalItems =1
        }else{
            _cart.totalItems +=1
        }
        setCart(_cart)
        
    }

    return ( 
        
        <section id='products'>
        <div className="container">
            <div className="row mx-auto">
            {message}
            {product.map((result)=>(
                <div className="col-md-4" key={result._id}>
                    <div className="card ms-2 me-2 mt-4" style={{width:'20rem', height:'19rem'}}>
                        <img src={`./images/${result.img}`} style={{width:'120px'}} className="card-img-top  mx-auto" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{result.name}</h5>
                                <p className="card-text">{result.weight}</p>
                                <h4 className="card-text"> ₹{result.price}</h4>
                                <button onClick={(e)=>{handlecart(e,result)}} className="btn btn-success ms-2 me-3">Add Cart</button>
                              <Link to={`/moredetaile/${result._id}`}><button className="btn btn-warning ms-5">More Details</button> </Link>  
                            </div>
                    </div>
                </div>
                ))}
                
            </div>
        </div>

    </section>
    );
}

export default Products;