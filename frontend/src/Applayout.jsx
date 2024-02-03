/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom"
import Navbar from "./Navbar"

function Applayout() {
    return (
      <>
        <Navbar/>
        <div className="app-container">
        <h1>Encrypted Data Transfer</h1>
        <div className="options-container">
          <Link to="/sender" className="option">
            Sender Side
          </Link>
          <Link to="/receiver" className="option">
            Receiver Side
          </Link>
        </div>
        
        
      </div>
      </>
    )
}

export default Applayout
