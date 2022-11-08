import * as web3 from '@solana/web3.js'
import type { NextPage } from 'next'
import { useState } from 'react'
import AddressForm from '../components/AddressForm'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [isExecutable, setExecutable] = useState(false)
  const [address, setAddress] = useState('B1aLAAe4vW8nSQCetXnYqJfRxzTjnbooczwkUJAr7yMS')

  const addressSubmittedHandler = (addr: string = address) => {
    try {
      const key = new web3.PublicKey(addr);

      setAddress(key.toBase58());

      const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
      connection.getBalance(key).then(balance => {
        setBalance(balance / web3.LAMPORTS_PER_SOL)
      })
      connection.getAccountInfo(key).then(info => { setExecutable(!!info?.executable) })
    } catch (error) {
      setAddress('')
      setBalance(0)
      alert(error)
    }
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <i>executable sample: ComputeBudget111111111111111111111111111111</i>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
        <p>{`Is it executable?: ${isExecutable ? 'Yes' : 'Nope'}`}</p>
      </header>
    </div>
  )
}

export default Home
