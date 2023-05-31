import { destroySession, getSession } from "/session";

//Function starts here
export default async function Logout(req, res) {

const session = await getSession(req);
await destroySession(res);
res.status(200).json({ 'response': 'Logged out' });
}

  