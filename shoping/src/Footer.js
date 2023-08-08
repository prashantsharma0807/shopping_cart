import { useContext } from "react";
import { Contextapi } from "./Contextapi";


function Footer() {
    const{loginname}=useContext(Contextapi)
   
    
    return (
        <>  
        {loginname?
        <section id="footer">
        
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h2>CityMall Pvt Ltd</h2>
                    <p><span><i className="bi bi-buildings"></i></span>CityMall Commerce Private Limited, is an Indian instant delivery service. It was founded in 8 July 2023 and is based out of Gurgaon.</p>
                </div>
                <div className='col-md-4'>
                    <p><span><i className="bi bi-telephone"></i></span> 0141-72726262</p>
                    <p><span><i className="bi bi-phone"></i></span> +91-6377004991</p>
                    <p><span><i className="bi bi-envelope"></i></span> Admin@xyz.com</p>
                </div>
                <div className="col-md-4" id="logo">
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-whatsapp"></i>
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-instagram"></i>
                </div>
            </div>
        </div>

        
                
        
    </section>

    :<p></p>}
    </>
    );
}

export default Footer;