import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Left from "./Left";
import { Contextapi } from "./Contextapi";

function Adminaddproduct() {
  const {loginname}=useContext(Contextapi)
  const navigate=useNavigate()
  if(!loginname){
    navigate('/')
  }

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [qty, setQty] = useState('')
  const [weight, setWeight] = useState('')
  const [img, setImg] = useState('')
  const [message, setMessage] = useState('')
  

  function handleimage(e) {
    setImg(e.target.files[0])
  }

  function handleform(e) {
    e.preventDefault()

    let data = new FormData()
    data.append('img', img)
    data.append('name', name)
    data.append('desc', desc)
    data.append('price', price)
    data.append('qty', qty)
    data.append('weight', weight)
    
    fetch('/api/productadd', {
      method: 'POST',
      body: data
    }).then((result) => { return result.json() }).then((data) => {
      //console.log(data)
      if (data.status === 201) {
        setMessage(data.message)
      } else (
        setMessage(data.message)
      )
    })
  
  }

  return (
    <section id="mid">
      <div className="container">
        <div className="row">
          <Left />
          <div className="col-md-9">
            <h2 className="text-center">Add More Product Form</h2>
            {message}
            <form onSubmit={(e) => { handleform(e) }}>
              <label>Product Name</label>
              <input type="text"
                className="form-control"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />
              <label>Product Descripation</label>
              <textarea
                className="form-control"
                value={desc}
                onChange={(e) => { setDesc(e.target.value) }} />
                
              <label>Product Price</label>
              <input type="number"
                className="form-control"
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
              />
              <label>Product Quantity</label>
              <input type="number"
                className="form-control"
                value={qty}
                onChange={(e) => { setQty(e.target.value) }}
              />
              <label>Product Weight</label>
              <input type="text"
                className="form-control"
                value={weight}
                onChange={(e) => { setWeight(e.target.value) }}
              />
              <label>Product Image</label>
              <input type="file"
                className="form-control"
                onChange={(e) => { handleimage(e) }}
              />
              <button type="submit" className="form-control btn btn-warning mt-2">Add Product</button>
              
            </form>
          </div>
        </div>
      </div>


    </section>
    );
}

export default Adminaddproduct;