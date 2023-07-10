import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import {useState, useEffect} from 'react';
import MealList from '../components/mealList'
import { useRouter } from 'next/router'
import ReactModal from 'react-modal';

import { getSession } from "/session";
import styles from 'next/styles/Home.module.css'
const inter = Inter({ subsets: ['latin'] })

//This is the homepage for users once they log in to Nutriget
export default function History({ session }) {
  

  const { user } = session;
  const [user_id, setUser_id] = useState(user.id);

  const [mealData, setMealData] = useState([]);
  const [change_val, setChange] = useState(0);

  

  //Fetch all of this user's meals from the database
  useEffect(() => {
  fetch ('/api/getMeals', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user_id: user_id})
  })
  .then(response => response.json())
  .then(meal_data => {
    if (meal_data.response == 'No meals') {
      setMealData("None")
    }
    else {
    setMealData(meal_data)
    }
  });
}, [change_val]);



const deleteMeal = (event) => {
  const meal_id = event.target.id;
  console.log(`meal is ${meal_id}`);
  fetch('/api/deleteMeal', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({user_id: user_id, meal_id: meal_id})
  })
  .then(response => response.json())
  .then(data => {
    setChange(change_val + 1)});
}

  //Make and import a component that displays the meals in a list
  //First prop: data.rows, which is an array of objects
  //Also pass a function that deletes the meal from the database (based on meal_id)
  return (
    <>
    <h1 className={styles.title}>History</h1>
    <MealList data={mealData} function_on_click={deleteMeal}/>
  </>
  )
}

export async function getServerSideProps({ req, res }) {
  const session = getSession(req);
  
  if (!session) {
    return <p>You are not logged in</p>;
  }
  return { props: { session } };
}

