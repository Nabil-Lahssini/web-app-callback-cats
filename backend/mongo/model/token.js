import mongoose from 'mongoose';
var modelName = 'token',
	schemaDefinition = import('../schema/' + modelName + '.js'),
	schemaInstance = mongoose.Schema(schemaDefinition);

schemaInstance.index({ "refreshTokenExpiresAt": 1 }, { expireAfterSeconds: 0 });
export const tokenModel = mongoose.model(modelName, schemaInstance);