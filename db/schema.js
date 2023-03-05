const {  gql } = require('apollo-server');

// Schema
const typeDefs = gql`

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        password: String
        creado: String
    }
    
    type Token {
        token: String
    }

    
    type Cliente {
        id: ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
        vendedor: ID
    }
    
    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password: String!
    }

    input AutenticarInput{
        email: String!
        password: String!
    }


    input ClienteInput {
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    }

    type Query {
        #Usuarios
        obtenerUsuario: Usuario

        #Clientes
        obtenerClientes: [Cliente]
        obtenerClientesVendedor: [Cliente]
        obtenerCliente(id: ID!): Cliente

    }

    type Mutation {
        # Usuarios
        nuevoUsuario(input: UsuarioInput) : Usuario
        autenticarUsuario(input: AutenticarInput) : Token

        # Clientes
        nuevoCliente(input: ClienteInput) : Cliente
        actualizarCliente(id: ID!, input: ClienteInput): Cliente
        eliminarCliente(id: ID!) : String

    }
`;

module.exports = typeDefs;