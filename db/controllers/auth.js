import { compare } from 'bcrypt'
import User from '../models/user'
import { normalizeId, dbConnect} from './util/connection'

export async function login(username, password){
    if (!(username && password))
        throw new Error('Must include username and password')

    await dbConnect()
    const user = await User.findOne({username}).lean()

    if (!user)
        throw new Error('User not found')

    const checkPassword= await compare(password, user.password)

    if (!checkPassword)
        throw new Error('Incorrect Password')

    return normalizeId(user)
}