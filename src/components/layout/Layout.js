import { Route, Routes, } from 'react-router-dom'
import { AddClass } from "../../hoc/AddClass/AddClass"
import { Home } from "../../pages/home/Home"
import { Calc } from '../../pages/calc/Cacl'
import { Sample } from '../../pages/sample/Sample'
import { Info } from '../../pages/info/Info'
import { Header } from "../header/Header"
import { Sidebar } from "../sideBar/Sidebar"

import "./layout.scss"

const Layout = () => {

  return (
    <>
      <Header />
      <div className="content">
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/calc' element={<Calc />} />
            <Route path='/sample' element={<Sample />} />
            <Route path='/info' element={<Info />} />
          </Routes> :
        </div>
        <Sidebar />
      </div>
    </>
  )
}

export default AddClass(Layout, 'layout')