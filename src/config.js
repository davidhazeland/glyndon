const base = {
  dateFormat: 'YYYY-MM-DD',
  datetimeFormat: 'YYYY-MM-DD HH:mm:ss'
}

const env = {
  development: {
    apiBaseURL: 'http://localhost:4000'
  },
  test: {

  },
  production: {
    apiBaseURL: ''
  }
}

module.exports = {
  ...base,
  ...env[process.env.NODE_ENV]
}
