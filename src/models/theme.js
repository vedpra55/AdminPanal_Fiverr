import { Schema, models, model } from "mongoose";

const ThemeSchema = new Schema(
  {
    buttonValue: {
      type: String,
    },
    buttonName: {
      type: String,
    },
    logo: {
      type: String,
    },
    loginIcon: {
      type: String,
    },
    helpIcon: {
      type: String,
    },
    aboutIcon: {
      type: String,
    },
    userIcon: {
      type: String,
    },
    logoutIcon: {
      type: String,
    },
    homeIcon: {
      type: String,
    },
    dataIcon: {
      type: String,
    },
    adminIcon: {
      type: String,
    },
    addDataIcon: {
      type: String,
    },
    editDataIcon: {
      type: String,
    },
    deleteDataIcon: {
      type: String,
    },
    makeAdminIcon: {
      type: String,
    },
    saveIcon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Theme = models?.Themess || model("Themess", ThemeSchema);

export default Theme;
