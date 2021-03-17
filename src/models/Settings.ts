import mongoose, { Schema, Document } from "mongoose";

export interface ISettings extends Document {
  id: string;
  settings: Record<string, any>;
}

const SettingsSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    settings: {
      prefix: { type: String, required: true, default: "!" },

      // Logging
      modlogChannel: { type: String, default: "" },
      userlogChannel: { type: String, default: "" },

      // Suggestions
      suggestionsEnabled: { type: Boolean, required: true, default: false },
      suggestionsAutoCollect: { type: Boolean, required: true, default: false },
      suggestionsChannel: { type: String, default: "" },
    },
  },
  { minimize: false }
);

export default mongoose.model<ISettings>("settings", SettingsSchema);
