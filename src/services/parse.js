import Parse from 'parse'

const applicationId = 'XehXZzSXcDNVpRbHkJOEoIlOPCcpRYNSDRPrVPSo'
const javaScriptKey = '8vYxv7Qkjgp3yQjQBM0dsQbP7RcCDRrOcK5EFNPP'
const masterKey = 'YC5PHk4OJrgOoE75Ru9X4BbCPYCrcOPNIRPDPYRq'

Parse.initialize(applicationId, javaScriptKey, masterKey)
Parse.serverURL = 'https://pg-app-58svq156ihsy3ccq2ul02i9ypygjx3.scalabl.cloud/1/'

export default Parse
