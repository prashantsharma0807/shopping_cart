import { Link } from "react-router-dom";

function Left(){
    return(
        <div className="col-md-3 mt-2">
            <Link to='/adminproducts'><button className="btn btn-info">Products Management</button></Link>
        </div>
    );
}
export default Left;