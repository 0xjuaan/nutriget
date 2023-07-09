import { destroySession } from "/session";

//Function starts here
export default async function Logout(req, res) {
try{
    await destroySession(res);
}
catch(err){
    console.error(err.message);
    res.status(500).json({ error: 'Cant Destroy Session' });
}

res.status(200).json({ 'response': 'Logged out' });
}

  