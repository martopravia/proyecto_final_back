import { ModelsInfo } from "../models/index.js";

export async function sanitizeData(req, res, next) {
  const route = req.baseUrl.split("/")[1].toLowerCase();
  const modelInfo = ModelsInfo[route];

  if (!modelInfo) {
    return res.status(404).json({
      success: false,
      message: `No model found for route "${route}"`,
    });
  }

  const { model: Model } = modelInfo;
  try {
    req.sanitizedData = Model.sanitizeData(req.body);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Request body contain invalid field data.`,
      error: error.message,
    });
  }

  if (Object.keys(req.sanitizedData).length === 0) {
    return res.status(400).json({
      success: false,
      message: `Request body does not contain any valid or editable fields.`,
    });
  }
  next();
}
