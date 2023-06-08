/* eslint-disable no-control-regex */
import { useLoaderData,useNavigate,Form , useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { obtenerCliente,editarClientes } from "../data/Clientes";


export async function loader({params}){
    const cliente= await obtenerCliente(params.clienteid);
    if(Object.values(cliente).length === 0 ){
        throw new Response('',{
            status:404,
            statusText:' No Hay Resultados'
        })
    }
    return  cliente;
  }
  
  export async function action({params,request}){
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
    await editarClientes(params.clienteid,datos);    
    return redirect('/');
  }
  

const EditarCliente = () => {
    const cliente = useLoaderData();       
    const navigate =useNavigate();
    const errores =useActionData();
  return (
    <>
     <h1 className=" font-black text-4xl text-blue-900">Editar Cliente</h1>
     <p  className=" mt-3">LLena todos los campos para Editar al cliente</p>

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
            <Formulario  
            cliente={cliente}
            />
            <input 
              type="submit"
              className=" mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
              value="Editar Cliente"
            />
          </Form>
      </div>
    </>
  )
}

export default EditarCliente
