export default function createApiPage(_, res) {
    res.setHeader('WWW-Authenticate', `Basic realm="sb233"`)
    res.statusCode = 401
    res.end("Unauthorized")
  }
