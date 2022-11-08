import * as web3 from '@solana/web3.js'
import type { NextPage } from 'next'
import { useState } from 'react'
import AddressForm from '../components/AddressForm'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')

  const addressSubmittedHandler = (address: string) => {
    const key = new web3.PublicKey(address);
    setAddress(address)
    setBalance(1000)
  }

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>
          Start Your Solana Journey
        </p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
      </header>
    </div>
  )
}

export default Home
