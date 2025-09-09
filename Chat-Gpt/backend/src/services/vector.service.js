const { Pinecone } = require('@pinecone-database/pinecone');

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

const index = pc.Index('chatgpt');

async function createMemory({ id, vector, metadata }) {
    await index.upsert([{
        id,
        values:vector,
        metadata
    }])
}

async function queryMemory({ queryVector, limit = 5,metadata }) {
    const data = await index.query({
        vector: queryVector,
        topK: limit,
        filter : metadata? {metadata}: undefined,
        includeMetadata: true   
    })

    return data.matches;
}

module.exports = {
    createMemory,
    queryMemory
}