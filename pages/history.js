import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from 'next/styles/Home.module.css'
import login from 'next/styles/Login.module.css'

import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import ReactModal from 'react-modal';
import MainButton from 'next/components/mainButton'
import Ingredients from '../components/ingredients'

import { getSession } from "/session";




const inter = Inter({ subsets: ['latin'] })

//This is the homepage for users once they log in to Nutriget
export default function History({ session }) {
  if (!session) {
    return <p>You are not logged in</p>;
  }

  const { user } = session;
  const [user_id, setUser_id] = useState(user.id);

  //Fetch this user's meals from the database


  //Make and import a component that displays the meals in a list
  return (<h1>Nothing here yet {user_id}</h1>)
}

export async function getServerSideProps({ req, res }) {
  const session = getSession(req);
  return { props: { session } };
}

