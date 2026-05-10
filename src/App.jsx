import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Contact from './components/Contact/Contact'
import ProjectDetail from './components/ProjectDetail/ProjectDetail'
import HamburgerNav from './components/HamburgerNav/HamburgerNav'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <HamburgerNav />
          <Header />
          <Main />
          <Contact />
        </>
      } />
      <Route path="/proyecto/:id" element={<ProjectDetail />} />
    </Routes>
  )
}

export default App