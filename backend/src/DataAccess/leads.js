import { ObjectId } from "mongodb";
import { Mongo } from "../database/mongo.js";

const collectionName = 'leads';

export default class LeadsDataAccess {
    async createLead(leadData) {
        try {
            // Classificação do lead baseado no estado
            const leadType = leadData.state === 'RS' ? 'hot-lead' : 'cold-lead';
            
            const result = await Mongo.db
                .collection(collectionName)
                .insertOne({
                    ...leadData,
                    leadType,
                    createdAt: new Date(),
                    status: 'new'
                });
            return { success: true, statusCode: 201, body: { data: result } };
        } catch (error) {
            return { success: false, statusCode: 500, body: { error: error.message } };
        }
    }

    async getLeads() {
        try {
            const result = await Mongo.db
                .collection(collectionName)
                .find({})
                .toArray();
            return { success: true, statusCode: 200, body: { data: result } };
        } catch (error) {
            return { success: false, statusCode: 500, body: { error: error.message } };
        }
    }

    async updateLeadStatus(leadId, status) {
        try {
            const result = await Mongo.db
                .collection(collectionName)
                .findOneAndUpdate(
                    { _id: new ObjectId(leadId) },
                    { $set: { status, updatedAt: new Date() } },
                    { returnDocument: 'after' }
                );
            return { success: true, statusCode: 200, body: { data: result.value } };
        } catch (error) {
            return { success: false, statusCode: 500, body: { error: error.message } };
        }
    }

    async deleteColdLeads() {
        try {
            const result = await Mongo.db
                .collection(collectionName)
                .deleteMany({ leadType: 'cold-lead' });
            return { success: true, statusCode: 200, body: { data: result } };
        } catch (error) {
            return { success: false, statusCode: 500, body: { error: error.message } };
        }
    }
}
