"use strict"

function PeerRequest(name, inputDefinition, outputDefinition, validate) {
  const self = this
  self.sendRequest = (send, data, cb) => {
    validate(inputDefinition, data)

    if (typeof cb != "function") throw new Error("CB must be a function")

    send(data, (err, data) => {
      if (err) return cb(err)
      validate(outputDefinition, data)
      return cb(null, data)
    })
  }

  self.handleRequest = (respond, data, handler) => {
    validate(inputDefinition, data)
    handler(data, (err, res) => {
      if (err) return respond(err)
      validate(outputDefinition, res)
      return respond(null, res)
    })
  }

  self.defIn = outputDefinition
  self.defOut = inputDefinition
  self.name = name
}
module.exports = PeerRequest
