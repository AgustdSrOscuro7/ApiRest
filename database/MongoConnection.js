const mongoose = require('mongoose');

const bdmongo = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            serverSelectionTimeoutMS: 30000 // 30 segundos
        });
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error; 
    }
}

module.exports = {
    bdmongo,
}