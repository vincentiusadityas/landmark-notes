// src/server.js
import { createServer, Model } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
        note: Model,
    },

    seeds(server) {
        server.create("note", { id:0, user: "Bob", coords: {lat:-27.491629500000002, lng:153.00299619999998}, notes: "It's a great place" })
        server.create("note", { id:1, user: "Alice", coords: {lat:-34.397, lng:150.644}, notes: "I like this place!" })
        server.create("note", { id:2, user: "John", coords: {lat:-69.02297, lng:74.23768}, notes: "Brrrrrr.. Really cold here.." })
        server.create("note", { id:3, user: "Robert", coords: {lat:-37.63893143867902, lng:144.88835026943684}, notes: "I wanna visit Melbourne again!" })
        server.create("note", { id:4, user: "James", coords: {lat:35.72028634773537, lng:139.77534090889898}, notes: "Japan is such a cool country! Especially Tokyo!" })
        server.create("note", { id:5, user: "Mary", coords: {lat:37.55572531703634, lng:126.98968469145777}, notes: "Seoulllllll! Woohoooo" })
        server.create("note", { id:6, user: "Jessica", coords: {lat:-27.469895552795226, lng:153.02340426687286}, notes: "Brisbane City!!!" })
        server.create("note", { id:7, user: "David", coords: {lat:-26.648585573840624, lng:153.06698588396966}, notes: "I like Sunshine Coast better than Gold Coast :D" })
    },

    routes() {
      this.namespace = "/api"

      this.get("/notes", (schema) => {
        return schema.notes.all()
      })

      this.post("/notes", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return schema.notes.create(attrs)
      })
    },
  })

  return server
}