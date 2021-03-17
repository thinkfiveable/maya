import mongoose, { Schema, Document } from "mongoose";

export interface ISuggestion extends Document {
  guildID: string;
  channelID: string;
  messageID: string;
  authorID: string;
  content: string;
  status: "waiting" | "approved" | "denied" | "duplicate" | "blocked";
  note?: string;
  handlerID?: string;
}

const SuggestionSchema: Schema = new Schema(
  {
    guildID: { type: String, required: true },
    channelID: { type: String, required: true },
    messageID: { type: String, required: true },
    authorID: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, required: true, default: "waiting" },
    note: { type: String },
    handlerID: { type: String },
  },
  { minimize: false }
);

export default mongoose.model<ISuggestion>("suggestion", SuggestionSchema);
