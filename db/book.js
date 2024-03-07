
import User from 'db/models/user.js'
import { normalizeId, dbConnect } from './util'

export async function getAll(userId) {
  await dbConnect()
  const user = await User.findById(userId).lean()
  if (!user) return null
  return user.readBooks.map(book => normalizeId(book))
}

export async function getByGoogleId(userId, bookId) {
  await dbConnect()
  const user = await User.findById(userId).lean()
  if (!user) return null
  const book = user.readBooks.find(book => book.googleId === bookId)
  if (book) return normalizeId(book)
  return null
}

export async function add(userId, book) {
  await dbConnect()
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { readBooks: book } },
    { new: true }
  )
  if (!user) return null
  const listedBook = user.readBooks.find(bk => bk.googleId === book.googleId)
  return normalizeId(listedBook)
}
