/* eslint-disable no-control-regex */
import { useNavigate,Form , useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarClientes } from "../data/Clientes";

export async function action({request}){
  const formData= await request.formData();
  // console.log([...formData])
  const datos = Object.fromEntries(formData);
   // console.log(datos)
  // validacion 
 const email = formData.get('email');
  const errores=[];
  if(Object.values(datos).includes('')){
    errores.push('Todos los campos son obligatorios');
  }
  //console.log(errores)

  // eslint-disable-next-line no-useless-escape
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)){
    errores.push('El Email no es valido');
  }
  
  if(Object.keys(errores).length){
    return errores;
  }
  
  await agregarClientes(datos);
  
  return redirect('/');
}

const NuevoCliente = () => {
  const errores =useActionData();
  const navigate =useNavigate();
  

  return (
    <>
     <h1 className=" font-black text-4xl text-blue-900">Nuevo Cliente</h1>
     <p  className=" mt-3">LLena todos los campos para registrar un nuevo cliente</p>

     <div className="flex justify-end">
        <button
          className=" bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() =>navigate('/')}
        >
            Volver
        </button>      
     </div>

     <div className=" bg-white shadow rounded-md md:w3/4 mx-auto mt-20">
          
          {errores?.length && errores.map((error,i)=> <Error key={i}> {error} </Error> ) }
          <Form 
              method="post"              
          >
            <Formulario />
            <input 
              type="submit"
              className=" mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
              value="Registrar Cliente"
            />
          </Form>
      </div>
    </>
  )
}

export default NuevoCliente
