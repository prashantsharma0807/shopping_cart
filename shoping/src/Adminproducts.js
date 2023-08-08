import { Link, useNavigate } from "react-router-dom";
import Left from "./Left";
import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./Contextapi";

function Adminproducts() {
    const [product,setProduct]=useState([])
    const [message,setMessage]=useState('')
    const {loginname}=useContext(Contextapi)
    const navigate=useNavigate()
     if(loginname!=='admin'){
       navigate('/')
     }
    useEffect(()=>{
        fetch('/api/allproducts').then((result)=>{return result.json()}).then((data)=>{
            if(data.status===200){
               setProduct(data.apidata)
            }else{
                setMessage(data.message)
            }
        })
    },[product]) 

    function handledelet(e,id){
        fetch(`/api/adminproductdelet/${id}`,{
            method:'DELETE',
        }).then((result)=>{return result.json()}).then((data)=>{
            if(data.status===200){
                setMessage(data.message)
               // navigate('/adminproducts')
               
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
        <h2 className="text-center">Products Management</h2>
        <Link to='/adminaddproduct'><button className="form-control btn btn-info">Add More Products </button></Link>
        {message}
        <table className="table table-hover">
            
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>Products Name</th>
                    <th>Products Image</th>
                    <th>Products Descripation</th>
                    <th>Products Price</th>
                    <th>Products Qunatity</th>
                    <th>Products Weight</th>
                    <th>Products Status</th>
                    <th>Products Update</th>
                    <th>Products Delet</th>
                </tr>
            </thead>
            <tbody>
                {product.map((result,key)=>(
                <tr key={result._id}>
                    <td>{key+1}</td>
                    <td>{result.name}</td>
                    <td><img src={`../images/${result.img}`} style={{width:'100px'}} alt=""/></td>
                    <td>{result.desc}</td>
                    <td>{result.price}</td>
                    <td>{result.qty}</td>
                    <td>{result.weight}</td>
                    <td>{result.status}</td>
                    <td><Link to={`/adminupdateproduct/${result._id}`}><button className="btn btn-warning">Update</button></Link></td>
                    <td><button onClick={(e)=>{handledelet(e,result._id)}} className="btn btn-danger">Delet</button></td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    </div>
    </div>
    

</section>
   
);
}

export default Adminproducts;