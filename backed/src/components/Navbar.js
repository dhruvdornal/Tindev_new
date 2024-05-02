import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <>
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Tindev</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        
      </ul>
      <form className="d-flex" role="search">
        <Link to="/register"><button className="btn btn-outline-success mx-1" type="submit">Signup</button></Link>
        <Link to="/login"><button className="btn btn-outline-success mx-1" type="submit">Login</button></Link>
      </form>
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar