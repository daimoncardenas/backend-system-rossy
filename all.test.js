//import request from "supertest";
require("dotenv").config({ path: "variables.env" });
const testing = require("./db/resolvers");
const mongoose = require("mongoose");

describe("Usuario", () => {
  let connection;
  let db;

  beforeAll(async () => {
    try {
      connection = mongoose.connect(process.env.DB_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        poolSize: 15,
      });
      //db = await mongoose.connection.db(process.env.DB_MONGO);
      return connection && db;
    } catch (error) {
      console.log("Hubo un error");
      console.log(error);
      process.exit(1); // detener la app
    }
  });

  it("Crear Usuario", async () => {
    expect(
      await testing.Mutation.nuevoUsuario(1, {
        input: {
          nombre: "Test",
          apellido: "Test",
          email: "daimoncj@hotmail.com",
          password: "1234567",
        },
      })
    ).toBe("Usuario creado correctamente");
  });

  it("Crear Usuario", async () => {
    expect(
      await testing.Mutation.nuevoUsuario(1, {
        input: {
          nombre: "Test2",
          apellido: "Test2",
          email: "daimoncardenas@gmail.com",
          password: "1234567",
        },
      })
    ).toBe("Usuario creado correctamente");
  });

  it("Autenticar Usuario", async () => {
    expect(
      await testing.Mutation.autenticarUsuario(1, {
        input: {
          email: "daimoncj@hotmail.com",
          password: "1234567",
        },
      })
    ).toHaveProperty("token");
    const saveId = await testing.Mutation.autenticarUsuario(1, {
      input: {
        email: "daimoncj@hotmail.com",
        password: "1234567",
      },
    });
    usuario = { usuario: { id: saveId.id } };
  });

  it("Crear Cliente", async () => {
    expect(
      await testing.Mutation.nuevoCliente(
        1,
        {
          input: {
            nombre: "TestClient",
            apellido: "TestClient",
            empresa: "TestClient",
            email: "client@client.com",
            telefono: "1234567",
          },
        },
        usuario
      )
    ).toHaveProperty("id");
    const saveId = await testing.Mutation.nuevoCliente(
      1,
      {
        input: {
          nombre: "TestClient2",
          apellido: "TestClient2",
          empresa: "TestClient2",
          email: "samba2@samba2.com",
          telefono: "1234567",
        },
      },
      usuario
    );
    cliente = saveId.id;
  });

  it("Editar Cliente", async () => {
    expect(
      await testing.Mutation.actualizarCliente(
        1,
        {
          id: cliente,
          input: {
            nombre: "TestClient3",
            apellido: "TestClient3",
            empresa: "TestClient3",
            email: "samba3@samba3.com",
            telefono: "12345678",
          },
        },
        usuario
      )
    ).toHaveProperty("id");
  })
});

/* afterAll(async () => {
  try{
  await mongoose.connection.close();
  }catch(error){
    console.log("Hubo un error");
    console.log(error);
    process.exit(1); // detener la app
  }
}); */
