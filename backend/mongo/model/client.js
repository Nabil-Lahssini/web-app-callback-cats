import mongoose from 'mongoose';
var modelName = 'client',
	schemaDefinition = import('../schema/' + modelName + '.js'),
	schemaInstance = mongoose.Schema(schemaDefinition),
	modelInstance = mongoose.model(modelName, schemaInstance);

export const clientModel = mongoose.model(modelName, schemaInstance);