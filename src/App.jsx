import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import Saved from './pages/Saved'
import AddRecipe from './pages/AddRecipe'
import YourRecipes from './pages/YourRecipes'
import YourRecipeDetail from './pages/YourRecipes'
import Settings from './pages/Settings'
import WelcomeModal from './components/WelcomeModal'
import PotLoader from './components/PotLoader'
import { DoodleBackground } from './components/Doodles'
import { getUserName, hasUserName } from './utils/userName'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [showWelcome, setShowWelcome] = useState(!hasUserName())
  const [userName, setUserNameState] = useState(getUserName())

  function handleWelcomeComplete(name) {
    setUserNameState(name)
    setShowWelcome(false)
  }

  if (showWelcome) {
    return <WelcomeModal onComplete={handleWelcomeComplete} />
  }

  if (showLoader) {
    return <PotLoader name={userName} onDone={() => setShowLoader(false)} />
  }

  return (
    <BrowserRouter>
      <DoodleBackground />
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
        <Route path="/my-recipes" element={<YourRecipes />} />
        <Route path="/my-recipes/:id" element={<YourRecipeDetail />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App