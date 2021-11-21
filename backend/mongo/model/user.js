import mongoose from 'mongoose';
var modelName = 'user',
	schemaDefinition = import('../schema/' + modelName + '.js'),
	schemaInstance = mongoose.Schema(schemaDefinition),
	modelInstance = mongoose.model(modelName, schemaInstance);

export const userModel = mongoose.model(modelName, schemaInstance);