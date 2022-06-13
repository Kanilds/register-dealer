import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Carros() {
  const [carros, setCarros] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  function navigateToDetail(carro) {
    navigation.navigate('Detail', { carro })
  }

  async function loadCarros() {
    if (loading) {
      return
    }

    if (total > 0 && carros.length == total) {
      return
    }

    setLoading(true)

    const response = await api.get('carros', {
      params: { page }
    })

    setCarros([... carros, ... response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page + 1)
    setLoading(false)
  }

  useEffect(() => {
    loadCarros()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
      </View>
      <Text style={styles.title}> Bem-vindo! </Text>
      <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia. </Text>

      <FlatList data={carros} style={styles.carroList} keyExtractor={carro => String(carro.id)}  onEndReached={loadCarros} onEndReachedThreshold={0.2} renderItem={({ item: carro }) => (
        <View style={styles.carro}>
          <Text style={styles.carroProperty}> ONG: </Text>
          <Text style={styles.carroValue}> {carro.name} </Text>

          <Text style={styles.carroProperty}> CASO: </Text>
          <Text style={styles.carrotValue}> {carro.title} </Text>

          <Text style={styles.carroProperty}> VALOR: </Text>
          <Text style={styles.carroValue}> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carro.value)} </Text>

          <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(carro)}>
            <Text style={styles.detailsButtonText}> Ver mais detalhes </Text>
            <Feather name="arrow-right" size={16} color='#e02041' />
          </TouchableOpacity>
        </View>
      )} />
    </View>
  )
}
