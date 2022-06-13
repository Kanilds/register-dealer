import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.png'

export default function Profile() {

  const [carros, setCarros] = useState([])
  const history = useHistory()
  const concessionariaId = localStorage.getItem('concessionariaId')
  const concessionariaName = localStorage.getItem('concessionariaName')

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: concessionariaId,
      }
    }).then(response => {
      setCarros(response.data)
    })
  }, [concessionariaId])
  

  

  async function handleDeleteCarro(id) {
    try {
      await api.delete(`carros/${id}`, {
        headers: {
          Authorization: concessionariaId,
        }
      })
      alert('Carro deletado com sucesso!')      
      setCarros(carros.filter(carro => carro.id !== id))
    } catch (err) {
      alert('Erro ao deletar carro, tente novamente.')
    }
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span> Bem-vinda, {concessionariaName} </span>

        <Link className="button" to="/carros/new"> Cadastrar novo carro </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="e02041" />
        </button>
      </header>
      <h1> Carros Cadastrados </h1>
      <ul>
        {carros.map(carro => (
          <li key={carro.id}>
            <strong> CARRO: </strong>
            <p> {carro.title} </p>
    
            <strong> DESCRIÇÃO: </strong>
            <p> {carro.description} </p>
    
            <strong> VALOR: </strong>
            <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carro.value)} </p>
    
            <button onClick={() => handleDeleteCarro(carro.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}