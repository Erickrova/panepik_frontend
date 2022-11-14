import {BrowserRouter,Routes,Route} from "react-router-dom"
import { AuthProvider } from "./context/AuthProvider"
import { ChatProvider } from "./context/ChatProvider"
import { ModalsProvider } from "./context/ModalsProvider"
import { UsuarioProvider } from "./context/UsuarioProvider"
import Layout from "./layouts/Layout"
import Chat from "./paginas/Chat"
import Home from "./paginas/Home"
import Login from "./paginas/Login"
import Perfil from "./paginas/Perfil"
import PerfilBuscado from "./paginas/PerfilBuscado"
import Registrar from "./paginas/Registrar"

function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
      <UsuarioProvider>
      <ModalsProvider>
      <ChatProvider>


        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
          </Route>

          <Route path="/home" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="perfil/:nombre/:codigo" element={<PerfilBuscado />} />
            <Route path="chat" element={<Chat />} />

          </Route>
        </Routes>
        
      </ChatProvider>
      </ModalsProvider>
      </UsuarioProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
