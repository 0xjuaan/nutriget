import { setSession } from "/session";
import supabase from '/lib/supabaseClient.js';

export default async function handler(req, res) {
    if (req.method == 'POST') {

      //Collecting data from payload
      const formData = req.body; //Collecting the 'payload'
      const {username, email, password} = formData;
      
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!data) {
        return res.status(400).json({ error: 'Sign up failed.' });
      }
      // Then update the username for the user
      console.log(data.user)
      const updates = await supabase.from('users')
          .insert({ salt: data.user.id, username: username, email: email})
          

      if (updates.error) {
          console.error(updates.error);
          return res.status(500).json({ error: 'Internal server error' });
      } else {
          // Session
          const session = {user: data.user};
          session.user.onboardNeeded = true; //Setting the session as the user object
          setSession(res, session);
          return res.status(200).json({ user: data.user });
      }
    }
};
