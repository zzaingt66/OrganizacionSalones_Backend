const mongoose= require ('mongoose');

const connectDB=async()=> {
    try{
        await mongooose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado');
    } catch (error){
        console.error(error);
        process.exit(1);
    }
};

module.exports=connectDB;
