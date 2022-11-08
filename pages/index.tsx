import * as web3 from '@solana/web3.js'
import type { NextPage } from 'next'
import { useState } from 'react'
import AddressForm from '../components/AddressForm'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState<string | undefined>(undefined)

  const addressSubmittedHandler = (address: string | undefined = 'B1aLAAe4vW8nSQCetXnYqJfRxzTjnbooczwkUJAr7yMS') => {
    const key = new web3.PublicKey(address);
    setAddress(key.toBase58())

    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    
    connection.getBalance(key).then(balance => {
      setBalance(balance / web3.LAMPORTS_PER_SOL)
    })
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
