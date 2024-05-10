import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import ImagenCriptos from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`


function App() {

  const [ formData, setFormData ] = useState({})
  const [ cotizacion, setCotizacion] = useState({})
  const [ loading, setLoading ] = useState(false)

  useEffect( () => {
    if (Object.keys(formData).length > 0) {

      const cotizarCripto = async () => {
        setLoading(true)
        setCotizacion({})
        const { moneda, cripto } = formData
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`

        const response = await fetch(url);
        const result = await response.json();

        setCotizacion(result.DISPLAY[cripto][moneda])
        setLoading(false)
      }

      cotizarCripto();
    }
  }, [formData])

  return (
    <Contenedor>
      <Imagen src={ImagenCriptos} alt="Monedas" />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setFormData={setFormData}/>

        { loading && <Spinner /> }

        { cotizacion.PRICE &&
          <Resultado cotizacion={cotizacion}/>
        }

      </div>

    </Contenedor>
  )
}

export default App
