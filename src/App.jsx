import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Schools from './pages/SpecialSchoolList'
import Subjects from './pages/SpecialSubjectList'
import Recommend from './pages/Recommend'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/schools' element={<Schools />} />
          <Route path='/subjects' element={<Subjects />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
