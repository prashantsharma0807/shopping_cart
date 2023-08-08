import { useContext } from "react";
import Left from "./Left";
import { Contextapi } from "./Contextapi";
import { useNavigate } from "react-router-dom";

function Dashboard() {
   const {loginname} = useContext(Contextapi)
   const navigate = useNavigate()

   if (!loginname) {
      navigate('/')
   }
   return (

      <section id="mid">
         <div className="container">
            <div className="row">
               <Left />
               <div className="col-md-9"></div>
            </div>
         </div>

      </section>

   );
}

export default Dashboard;