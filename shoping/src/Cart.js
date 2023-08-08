import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Cart() {

    const {loginname,cart,setCart}=useContext(Contextapi) 
    
    const [product,setProduct]=useState([])
    const [message,setMessage]=useState('')
    const navigate=useNavigate()
    
    if(!loginname){
        navigate('/')
     }
     
    useEffect(()=>{
        if(!cart.items){
            return
        }
        fetch('/api/cartproduct',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({ids:Object.keys(cart.items)})
        }).then((result)=>{return result.json()}).then((data)=>{
              if(data.status===200){
                    setProduct(data.apidata)
              }else{
                     setMessage(data.message)
              }
        })
    },[cart])

    let totalAmount=0

    function handleqty(id){
       return cart.items[id]
    }
    function handleprice(id,price){
      let  productPrice=handleqty(id)*price
        totalAmount +=productPrice
        return productPrice
    }
    
    function handleincrement(e,id){
        let currentqty= handleqty(id)
        if(currentqty===4){
            return
        }
        let _cart={...cart}
        _cart.items[id]=currentqty+1
        _cart.totalItems +=1
        setCart(_cart)
    }
       function handledecrement(e,id){
        let currentqty=handleqty(id)
        if(currentqty===1){
            return
        }
        let _cart={...cart}
        _cart.items[id]=currentqty-1
        _cart.totalItems -=1
        setCart(_cart)
       }
       function handleremove(e,id){
        let currentqty=handleqty(id)
        let _cart= {...cart}
        delete _cart.items[id]
        _cart.totalItems -=currentqty
        setCart(_cart)
       }

    return ( 
        <>{product.length?
        <section id='cart'>
       <div className="container">
         <div className="row">
            <div className="col-md-12">
                <h2 className="text-center">Cart Summary</h2>
                {message} 
            <table className="table table-hover">
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Products Name</th>
                    <th>Products Image</th>
                    <th>Products Qunatity</th>
                    <th>Products Price</th>
                    <th>Products Delet</th>
                </tr>
            </thead>
            <tbody>  
                {product.map((result,key)=>(  
                <tr key={result._id}>
                    <td>{key+1}</td>
                    <td>{result.name}</td>
                    <td><img src={`./images/${result.img}`} style={{width:'100px'}} alt=""/></td>
                    <td><button onClick={(e)=>{handleincrement(e,result._id)}} style={{border:'none'}}>+</button>{handleqty(result._id)}<button onClick={(e)=>{handledecrement(e,result._id)}} style={{border:'none'}}>-</button></td>
                    <td>{handleprice(result._id,result.price)}</td>
                    <td><button onClick={(e)=>{handleremove(e,result._id)}} className="btn btn-danger">Remove from Cart</button></td>  
                </tr>
                ))}
            </tbody>
            <tr>
              <td colSpan='7'><h4 className="text-center">Total Amount:{totalAmount}</h4></td>
            </tr>
        </table>
            </div>
            </div>
            </div>
   </section>
      :<img src="empty-cart.png" id="empty" className="mx-auto d-block img-fluid" style={{width:'40%'}} alt=""/>} 
   </>
     );
}

export default Cart;

