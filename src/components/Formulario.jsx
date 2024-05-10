import { useEffect, useState } from 'react'
import Error from './Error'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setFormData}) => {
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
  const [ cripto, SelectCriptomonedas ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

  useEffect( () => {
    const fetchCriptos = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=EUR';

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const criptos = resultado.Data.map( item => {
        const cripto = { id: item.CoinInfo.Name, nombre: item.CoinInfo.FullName}
        return cripto
      })

      setCriptos(criptos)
    }

    fetchCriptos();
  }, [])


  const _handleSubmit = e => {
    e.preventDefault()

    if( [moneda, cripto].includes('')) {
      setError(true)
      return
    }

    setError(false)
    setFormData({moneda, cripto})
  }


  return (
    <>
    { error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={_handleSubmit}>
        <SelectMonedas />
        <SelectCriptomonedas />

        <InputSubmit
          type="submit"
          value="Cotizar"
        />
      </form>
    </>
  )
}

export default Formulario
