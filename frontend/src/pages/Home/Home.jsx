import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Navbar/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Appdownload from '../../components/Appdownload/Appdownload'

const Home = () => {

  const [Category, setCategory] = useState("All");

  return (
    <div>
      <Header/> 
      <ExploreMenu category={Category} setCategory={setCategory}/>
      <FoodDisplay category={Category}/>
      <Appdownload/>
    </div>
  )
}

export default Home
