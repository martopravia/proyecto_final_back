import { ModelsInfo } from "../models/index.js";
import pluralize from "pluralize";

export function requireEntity({ route, lookupField = "id", key, customInclude } = {}) {
  return async function (req, res, next) {
    const resolvedRoute = route || req.baseUrl.split("/")[1].toLowerCase();
    const entityName = pluralize.singular(resolvedRoute);
    const requestKey = key || entityName;

    const modelInfo = ModelsInfo[resolvedRoute];

    if (!modelInfo) {
      return res.status(404).json({
        success: false,
        message: `No model found for route "${resolvedRoute}"`,
      });
    }

    const { model: Model, include } = modelInfo;

    try {
      const where = {};
      where[lookupField] = req.params[lookupField];

      const entity = await Model.findOne({ where, include: customInclude || include });

      if (!entity) {
        return res.status(404).json({
          success: false,
          message: `The ${entityName} with ${lookupField} "${req.params[lookupField]}" doesn't exist`,
        });
      }

      req[requestKey] = entity;
      return next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
}
