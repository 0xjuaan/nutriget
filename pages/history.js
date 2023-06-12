import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from 'next/styles/Home.module.css'
import login from 'next/styles/Login.module.css'

import {useState, useEffect} from 'react';
import MealList from '../components/mealList'
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

  const [mealData, setMealData] = useState([]);

  //Fetch this user's meals from the database
  useEffect(() => {
  fetch ('/api/getMeals', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user_id: user_id})
  })
  .then(response => response.json())
  .then(meal_data => setMealData(meal_data.rows));
}, [mealData]);

  //Make and import a component that displays the meals in a list
  //First prop: data.rows, which is an array of objects
  //Also pass a function that deletes the meal from the database (based on meal_id)
  console.log(mealData)
  return (
  <MealList data={mealData}/>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = getSession(req);
  return { props: { session } };
}

