'use client'
import { table } from 'console'
import React, { FormEvent,FormEventHandler, useEffect, useState, ChangeEvent } from 'react'
import toast from 'react-hot-toast'

interface ClientesInt {
  id: string
  nombre: string
  monto: number
  impuesto: number
}

interface CuentaInt {
  subtotal: number
  iva: number
}

const Form = () => {
  const [clientes, setClientes] = useState<ClientesInt[]>([])
  const [nombre, setNombre] = useState<string>("")
  const [total, setTotal] = useState<number>(0)
  const [cuenta, setCuenta] = useState<CuentaInt>({
    subtotal: 0.0,
    iva: 0.0,
  })
  const [error, setError] = useState<string>("")
  const [isOk, setIsOk] = useState<boolean>(false)
  const [diferencia, setDiferencia] = useState<number>(0)

  const addPeople: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setClientes((prevState) => {
      return [...prevState, { nombre: nombre, monto: 0, id: crypto.randomUUID(), impuesto: 0 }]
    })
    setNombre("")
    notify()
  }

  useEffect(() => {
    setTotal(() => {
      if (!cuenta.iva || !cuenta.subtotal) {
        return null
      } else {
        return parseFloat((cuenta.iva + cuenta.subtotal).toFixed(2))
      }
    })
  }, [cuenta])

  const handlerMonto = (value: string, id: string) => {

    
    setClientes((prevState) => {
      const nuevoMonto = parseFloat(value)
      const newArray = prevState.map((l) => {
        const impuesto = (nuevoMonto / cuenta.subtotal) * cuenta.iva
        return l.id === id ? { ...l, monto: nuevoMonto, impuesto: parseFloat(impuesto.toFixed(2)) } : l
      })

      const suma = newArray.reduce((acc, cliente) => (acc += cliente.monto), 0)

      if(!total){
setError("Tienes que tener un total")
        setIsOk(false)

      }else if (suma > cuenta.subtotal) {
        setError("la suma de los montos supera el subtotal de la cuenta")
        setIsOk(false)
      } else if (suma < cuenta.subtotal) {
        setIsOk(false)
        setError("Falta dinero: $" + (cuenta.subtotal - suma).toFixed(2))
      } else if (suma === cuenta.subtotal) {
        setIsOk(true)
        setError("Todo esta bien")
      } else {
        setError("")
        setIsOk(false)
      }
      return newArray
    })
  }

  const notify = () => toast.success('Cliente agregado.');
  return (
    <div className='bg-sky-300 w-full min-h-screen py-20'>
      <form
        onSubmit={addPeople}
        className='rounded-md bg-slate-900 text-slate-50 p-10 w-3/4 m-auto flex flex-col gap-5'
      >
        <label htmlFor=''>Nombre del cliente:</label>
        <input
          value={nombre}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
          type='text'
          placeholder='Jhon Doe ....'
          className='b-1 bg-slate-50 text-slate-900 p-2 rounded-md outline-none focus:bg-sky-300'
        />
        <input
          type='submit'
          value='Ingresar'
          className='bg-green-700 px-10 py-4 rounded-md text-slate-900'
        />
        {clientes.length === 0 ? <div></div> :(
            <div className='flex flex-col gap-2'>
                <label htmlFor=''>Subtotal de la cuenta:</label>
        <input
          type='number'
          value={cuenta.subtotal}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCuenta({ ...cuenta, subtotal: parseFloat(e.target.value)})
          }
          className='b-1 bg-slate-50 text-slate-900 p-2 rounded-md outline-none focus:bg-sky-300'
        />
        <label htmlFor=''>Impuesto de la cuenta:</label>
        <input
          type='number'
          value={cuenta.iva}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCuenta({ ...cuenta, iva: parseFloat(e.target.value) })
          }
          className='b-1 bg-slate-50 text-slate-900 p-2 rounded-md outline-none focus:bg-sky-300'
        />
        <label className='text-xl text-slate-50'>Total: ${total}</label></div>)}
      </form>

      <div className='mt-3 w-3/4  m-auto'>
        <p className={`${!isOk ? "text-red-700" : "text-green-600"} text-center font-black`}>{error}</p>
      </div>

      <div className='w-full h-auto mt-5 p-4'>
        {clientes.length === 0 ? (
          <p className='w-full text-center'>No hay clientes agregados</p>
        ) : (

            <table className='w-full m-auto '>
                <thead >
                    <tr className='grid  grid-cols-3 p-1 bg-slate-900 text-slate-50'>
                        <th>Nombre</th>
                        <th>Subtotal a pagar</th>
                        <th>Impuesto </th>
                    </tr>
                </thead>
                <tbody className='bg-slate-50'>
                        {
                        
        clientes.map((e) => {
            return (
              <tr key={e.id} className=' w-full p-1 grid grid-cols-3 border-1 border-b-slate-100'>
                <td className='text-center'>
                <h3 className='font-medium text-xl'>{e.nombre}</h3>

                </td>
                <td className='text-center'>
                    <input
                  type='number'
                  onChange={(k: ChangeEvent<HTMLInputElement>) => handlerMonto(k.target.value, e.id)}
                  value={e.monto}
                  className='font-bold w-[70px] outline-none border-[0.7px] p-1 border-slate-700 focus:border-green-500'
                />
                </td>
                <td className='text-right'>
                    <p className='text-slate-950'>{e.impuesto ? e.impuesto : 0.0}</p>
                    </td>
              </tr>
            )
          })
                    }
                </tbody>
            </table>
          
        )}
      </div>
    </div>
  )
}

export default Form