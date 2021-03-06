import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.png'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')

  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault()
    
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    }
    
    try {
      const response = await api.post('concessionarias', data)
    
      alert(`Seu ID para acessar o gerenciamento de carros é: ${response.data.id}`)
      history.push('/')
    } catch (err) {
      alert('Erro no cadastro, tente novamente')
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Cadastro </h1>
          <p> Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua CONCESSIONARIA. </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#f13b5c" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input placeholder="Nome da CONCESSIONARIA" value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="WhatsApp" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} />
          <div className="input-group">
            <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
            <input placeholder="UF" value={uf} onChange={e => setUf(e.target.value)} style={{ width: 80 }} />
          </div>
          <button className="button" type="submit"> Cadastrar </button>
        </form>
      </div>
    </div>
  )
}