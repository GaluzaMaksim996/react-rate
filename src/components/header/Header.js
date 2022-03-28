import { useContext } from "react"
import { RateContext } from "../../context/RateContext"
import { Navbar } from "../navbar/Navbar"

import "./header.scss"

export const Header = () => {

  const { modalShowHandler } = useContext(RateContext)

  return (
    <div className="header">
      <div className="headerInner">
        <div className="logo">
          <a href='/'>
            <h2>ReateApp</h2>
          </a>
        </div>
        <Navbar />
        <div className="person">
          <i className="fa fa-user" aria-hidden="true" onClick={modalShowHandler}></i>
        </div>
      </div>
      <hr/>
    </div>
  )
}