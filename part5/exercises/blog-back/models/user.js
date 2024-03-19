import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true },
  name: String,
  passwordHash: { type: String, required: true }
})

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  }
})

export default model('User', userSchema)
