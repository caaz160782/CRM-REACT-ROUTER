import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Index, {loader as clientesLoader} from './pages/Index'
import NuevoCliente,  {action as nuevoClienteAction } from './pages/NuevoCliente'
import EditarCliente, {loader as clienteLoader, action as clienteAction } from './pages/EditarCliente'
import {action as deleteClienteAction } from './components/Cliente'
import ErrorPage from './components/ErrorPage'




const router= createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {
        index:true,
        element:<Index/>,
        loader: clientesLoader,
        errorElement: <ErrorPage/>
      },      
      {
          path: '/clientes/nuevo',
          element: <NuevoCliente/>,
          action: nuevoClienteAction,
          errorElement: <ErrorPage/>
      },
      {
        path: '/clientes/:clienteid/editar',
        element: <EditarCliente/>,
        loader: clienteLoader,
        action: clienteAction,
        errorElement: <ErrorPage/>
      },  
      {
        path: '/clientes/:clienteid/eliminar',     
        action:deleteClienteAction,
        errorElement: <ErrorPage/>   
      },      
    ]
  },
 
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider 
    router={router}
  />
  </React.StrictMode>,
)
