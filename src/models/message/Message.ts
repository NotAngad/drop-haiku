import mongoose, { Document, HydratedDocument, Schema } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  liked: boolean;
  disliked: boolean;
  hasBeenUsed: boolean;
}

const MessagesSchema = new Schema<IMessage>({
  content: { type: String, required: true },
  liked: { type: Boolean, required: false },
  disliked: { type: Boolean, required: false },
  hasBeenUsed: { type: Boolean, default: false },
});

export type IMessageDocument = HydratedDocument<IMessage>;
export const Messages = mongoose.model<IMessage>('Messages', MessagesSchema);
