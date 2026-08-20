import { useState } from 'react'
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
import { DoodleBackground } from './components/Doodles'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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