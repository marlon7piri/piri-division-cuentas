'use client'
import React, { FormEvent, useEffect, useState, ChangeEvent } from 'react'

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
  }

  useEffect(() => {
    setTotal(() => {
      if (!cuenta.iva || !cuenta.subtotal) {
        return 0.0
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

      if (suma > cuenta.subtotal) {
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

  return (
    <div className='bg-sky-300 w-full min-h-screen py-20'>
      <form
        onSubmit={addPeople}
        className='rounded-md bg-slate-900 text-slate-50 p-10 w-3/4 m-auto flex flex-col gap-5'
      >
        <label htmlFor=''>Nombre:</label>
        <input
          value={nombre}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
          type='text'
          placeholder='Jhon Doe ....'
          className='b-1 bg-slate-50 text-slate-900 p-2 rounded-md'
        />
        <input
          type='submit'
          value='Ingresar'
          className='bg-green-700 px-10 py-4 rounded-md text-slate-900'
        />
        <label htmlFor=''>Total de la cuenta:</label>
        <input
          type='number'
          value={cuenta.subtotal}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCuenta({ ...cuenta, subtotal: parseFloat(e.target.value) || 0 })
          }
          placeholder='total de la cuenta'
          className='b-1 bg-slate-50 text-slate-900 p-2 rounded-md'
        />
        <label htmlFor=''>Impuesto de la cuenta:</label>
        <input
          type='number'
          value={cuenta.iva}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCuenta({ ...cuenta, iva: parseFloat(e.target.value) || 0 })
          }
          placeholder='impuesto de la cuenta'
          className='b-1 bg-slate-50 text-slate-900 p-2 rounded-md'
        />
        <label className='text-xl'>Total: ${total}</label>
      </form>

      <div className='mt-3'>
        <p className={`${!isOk ? "text-red-700" : "text-green-600"} text-center font-black`}>{error}</p>
      </div>

      <div className='w-full h-auto mt-5'>
        {clientes.length === 0 ? (
          <p className='w-full text-center'>No hay clientes agregados</p>
        ) : (
          clientes.map((e) => {
            return (
              <div key={e.id} className='w-3/4 flex p-4 items-center justify-center mt-2 gap-2'>
                <h3 className='font-black'>{e.nombre}</h3>
                <input
                  type='number'
                  onChange={(k: ChangeEvent<HTMLInputElement>) => handlerMonto(k.target.value, e.id)}
                  value={e.monto}
                  className='font-bold w-[80px] outline-none border-b-1 border-slate-800 focus:border-b-green-500'
                />
                <p className='text-slate-950'>{e.impuesto ? e.impuesto : 0.0}</p>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Form
