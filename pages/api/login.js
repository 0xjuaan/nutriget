import { setSession } from "/session";
import supabase from '/lib/supabaseClient.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ 'response': 'Empty' });
    }

    //Login with supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error(error);
      return res.status(400).json({ 'response': 'Invalid Email Or Password' });
    }

    // Setting user session
    const session = {user: data.user};
    setSession(res, session);
    return res.status(200).json({ user: data.user });
  } 


  else {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }
}
