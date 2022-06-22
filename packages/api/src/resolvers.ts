import seed from './seed';
import neo4j from "neo4j-driver";
import * as dotenv from 'dotenv';

dotenv.config();

const driver: typeof neo4j.Driver = neo4j.driver(process.env.NEO4J_URI as string, neo4j.auth.basic(process.env.NEO4J_USER as string, process.env.NEO4J_PASSWORD as string));

const resolvers = {
    Mutation: {
        performSeed: async () => { 
            await seed(driver);
            return true;
        },
    }
}

export default resolvers;