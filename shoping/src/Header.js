import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Contextapi } from './Contextapi';

function Header() {
    let navigate = useNavigate()
    const { loginname, setLoginname, cart } = useContext(Contextapi)

    function handlelogout(e) {
        window.localStorage.removeItem('loginname')
        setLoginname(window.localStorage.getItem('loginname'))
        navigate('/')
    }
    
    return (
        <section id="header">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {loginname ?
                            <nav className="navbar navbar-expand-lg navbar-light bg-primary pt-0 pb-0">
                                <div className="container-fluid">
                                    <Link className="navbar-brand me-5 pt-0" >CityMall</Link>
                                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                        <span className="navbar-toggler-icon"></span>
                                    </button>
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                            <li className="nav-item">
                                                <Link className="nav-link active mt-2 me-2 pt-1" aria-current="page" to="/product">Home</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link active mt-2 pt-1" aria-current="page">Welcome {loginname}</Link>
                                            </li>
                                           
                                            <li className="nav-item">
                                            <Link className="nav-link active pt-1" aria-current="page" to="/cart">
                                                <button type="button" className="btn btn-primary position-relative pt-0">
                                                   <i className="bi bi-cart4"></i>
                                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-2">
                                                    {!cart.totalItems ? 0 : cart.totalItems}
                                                        <span className="visually-hidden">unread messages</span>
                                                    </span>
                                                </button></Link>
                                            </li>
                                        </ul>
                                        <button onClick={(e) => { handlelogout(e) }} className='btn btn-danger' id='logout'>Logout</button>
                                    </div>
                                    
                                </div>
                            </nav>
                            : <p></p>} </div>
                </div>
            </div>
        </section>
    );
}

export default Header;