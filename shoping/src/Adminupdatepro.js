import { useNavigate, useParams } from "react-router-dom";
import Left from "./Left";
import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";

function Adminupdatepro() {
    
    let navigate= useNavigate()

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState('')
    const [weight, setWeight] = useState('')
    const [status,setStatus]=useState('')
    const [img,setImg]=useState('')
    const [message,setMessage]=useState('')
    const {id}=useParams()
    const {loginname}= useContext(Contextapi)
    
    if(!loginname){
        navigate('/')
    }
 useEffect(()=>{
       fetch(`/api/singlproduct/${id}`).then((result)=>{return result.json()}).then((data)=>{
        if(data.status===200){
                setName(data.apidata.name)
                setDesc(data.apidata.desc)
                setPrice(data.apidata.price)
                setQty(data.apidata.qty)
                setWeight(data.apidata.weight)
                setStatus(data.apidata.status)
        }else{
            setMessage(data.message)
        }
       })
 },[id])

 function handleimage(e){
    setImg(e.target.files[0])
 }

 function handleform(e){
    e.preventDefault()

    let data = new FormData()
    data.append('img', img)
    data.append('name', name)
    data.append('desc', desc)
    data.append('price', price)
    data.append('qty', qty)
    data.append('weight', weight)
    data.append('status', status)
    //console.log(data)
    fetch(`/api/updateproduct/${id}`,{
        method:'PUT',
        body:data  
    }).then((result)=>{return result.json()}).then((data)=>{
        if(data.status===201){
            navigate('/adminproducts')
        }else{
            setMessage(data.message)
        }
    })
    

 }

    return ( 
        <section id="mid">
    <div className="container">
    <div className="row">
    <Left/>
    <div className="col-md-9">
    <h2 className="text-center">Update Product</h2>
    
    <form onSubmit={(e)=>{handleform(e)}}>
        {message}
            <label>Product Name</label>
            <input type="text" 
            className="form-control"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            />
            <label>Product Descripation</label>
            <textarea
            className="form-control"
            value={desc}
            onChange={(e)=>{setDesc(e.target.value)}}
            />
            <label>Product Price</label>
            <input type="number" 
            className="form-control"
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
            />
            <label>Product Quantity</label>
            <input type="number" 
            className="form-control"
            value={qty}
            onChange={(e)=>{setQty(e.target.value)}}
            />
            <label>Product Weight</label>
              <input type="text"
                className="form-control"
                value={weight}
                onChange={(e)=>{setWeight(e.target.value)}}
              />
            <label>Product Status</label>
             <select value={status} onChange={(e)=>{setStatus(e.target.value)}} className="form-select">
                <option value="OUT-STOCK">OUT STOCK</option>
                <option value="IN-STOCK">IN STOCK</option>
             </select>
            <label>Product Image</label>
            <input type="file"
            className="form-control"
            onChange={(e)=>{handleimage(e)}}
            />
            <button type="submit" className="form-control btn btn-warning mt-2">Update Product</button>
         </form>
    </div>
    </div>
    </div>
</section> 
    );
}

export default Adminupdatepro;