import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

export default withIronSessionApiRoute(
  async function handler(req, res) {
    switch (req.method) {
      case 'POST':
        try {
          const createNote = JSON.parse(req.body)
          const createdNote = await db.note.add(req.session.user.id, createNote)
  
          if (createdNote === null) {
            req.session.destroy();
            return res.status(401).json({error: "Not Authorized"})
          }
          return res.status(200).json(createNote)
        } catch (error) {
          return res.status(400).json({ error: error.message })
        }
      default:
        return res.status(404).end()
  
    }
  },
  sessionOptions
)