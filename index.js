"use strict"

function PeerRequest(name, inputDefinition, outputDefinition, validate) {
  const self = this
  self.sendRequest = (send, data, cb) => {
    try {
      validate(inputDefinition, data)
    } catch (e) {
      cb(e)
    }

    if (typeof cb != "function") throw new Error("CB must be a function")

    send(data, (err, data) => {
      if (err) return cb(err)
      try {
        validate(outputDefinition, data)
      } catch (e) {
        cb(e)
      }
      return cb(null, data)
    })
  }

  self.handleRequest = (respond, data, handler) => {
    try {
      validate(inputDefinition, data)
    } catch (e) {
      return respond(e)
    }
    handler(data, (err, res) => {
      if (err) return respond(err)
      try {
        validate(outputDefinition, data)
      } catch (e) {
        return respond(e)
      }
      return respond(null, res)
    })
  }

  self.defIn = outputDefinition
  self.defOut = inputDefinition
  self.name = name
}
module.exports = PeerRequest
