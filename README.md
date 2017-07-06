# peer-request
A meta-class for peer-to-peer-requests using symetric protocols.

# Usage
`new PeerRequest(name, inputDefinition, outputDefinition, validationFunction)`

The validation function will be called with the incoming/outgoing data and it's definition.

`sendRequest(send, data, cb)`
  - `send`: The function that will handle sending the request
  - `data`: The data to send in the request
  - `cb`: The callback that will be called with an error or result

`handleRequest(respond, data, handler)`
  - `respond`: The function that will handle sending the results
  - `date`: The data the other peer sent
  - `handler`: The function that will be passed the data and a callback
