import bcrypt from "bcryptjs"

const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS ?? 10)

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds)
}

export const comparePassword = (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return bcrypt.compare(password, passwordHash)
}
