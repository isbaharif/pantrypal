import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import RecipeDetail from './pages/RecipeDetail'
import Saved from './pages/Saved'
import { DoodleBackground } from './components/Doodles'

function App() {
  return (
    <BrowserRouter>
      <DoodleBackground />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App