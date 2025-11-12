// Configuración de MongoDB Atlas
// INSTRUCCIONES:
// 1. Instala el paquete: npm install mongodb
// 2. Agrega tu connection string en las variables de entorno: MONGODB_URI
// 3. Descomenta el código a continuación


import { MongoClient } from 'mongodb';

if (!process.env.MONGO_URI) {
  throw new Error('Por favor agrega MONGO_URI a las variables de entorno');
}

const uri = process.env.MONGO_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;


// COLECCIONES EN MONGODB:
// 1. "carreras" - Almacena información de las carreras
//    Campos: titulo, modalidad, descripcion, imagen, duracion, facultad
//
// 2. "usuarios" - Almacena usuarios registrados
//    Campos: nombreCompleto, correoElectronico, telefono, fechaRegistro

export const COLLECTIONS = {
  CARRERAS: "carreras",
  USUARIOS: "usuarios",
} as const
