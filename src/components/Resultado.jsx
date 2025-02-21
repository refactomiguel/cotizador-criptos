import React from 'react'
import styled from '@emotion/styled'

const Output = styled.div`
  color: #fff;
  font-family: 'Lato', sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`

const Imagen = styled.img`
  display: block;
  width: 120px;
`

const Texto = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`

const Precio = styled.p`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`

const Resultado = ({ cotizacion }) => {

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = cotizacion

  return (
    <Output>
      <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen Cripto" />
      <div>
        <Precio>El Precio es de: <span>{PRICE}</span></Precio>
        <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
        <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
        <Texto>Variación (24h): <span>{CHANGEPCT24HOUR}</span></Texto>
        <Texto>Última actualización: <span>{LASTUPDATE}</span></Texto>
      </div>

    </Output>
  )
}

export default Resultado
