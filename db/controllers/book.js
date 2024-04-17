
import User from '../models/user'
import * as databaseActions from './util'

export async function getAll(userId) {
  await databaseActions.dbConnect()
  const user = await User.findById(userId).lean()
  if (!user) return null
  return user.readBooks.map(book => databaseActions.normalizeId(book))
}

export async function getByGoogleId(userId, bookId) {
  await databaseActions.dbConnect()
  const user = await User.findById(userId).lean()
  if (!user) return null
  const book = user.readBooks.find(book => book.googleId === bookId)
  if (book) return databaseActions.normalizeId(book)
  return null
}

export async function add(userId, book) {
  await databaseActions.dbConnect()
  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { readBooks: book } },
    { new: true }
  )
  if (!user) return null
  const listedBook = user.readBooks.find(bk => bk.googleId === book.googleId)
  return databaseActions.normalizeId(listedBook)
}
