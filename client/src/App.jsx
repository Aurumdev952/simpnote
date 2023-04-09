import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
// import Login from './components/main/Login'
// import SignUp from './components/main/SignUp'
import Auth from './routes/Auth'
import MainApp from './routes/MainApp'
// import AllNotes from './components/main/AllNotes'
// import QuickNotes from './components/main/QuickNotes'
// import Test from './components/other/Test'

// const Home = lazy(() => import('./routes/Home'))
const Login = lazy(() => import('./components/main/Login'))
const SignUp = lazy(() => import('./components/main/SignUp'))
// const Auth = lazy(() => import('./routes/Auth'))
// const MainApp = lazy(() => import('./routes/MainApp'))
const AllNotes = lazy(() => import('./components/main/AllNotes'))
const QuickNotes = lazy(() => import('./components/main/QuickNotes'))

function App() {
 

  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/auth' element={<Auth />}>
            <Route path='login' element={<Login />}/>
            <Route path='signup' element={<SignUp />}/>
        </Route>
        <Route path='/app' element={<MainApp />}>
          <Route path='notes'  element={<AllNotes />}/>
          <Route path='quickview' element={<QuickNotes />}/>
          <Route path='profile'/>
          {/* <Route path='test' element={<Test />}/> */}
        </Route>
    </Routes>
  )
}

export default App
