const base = {
  dateFormat: 'YYYY-MM-DD',
  datetimeFormat: 'YYYY-MM-DD HH:mm:ss'
}

const env = {
  development: {
    apiBaseURL: 'https://dropist.io/api'
  },
  test: {

  },
  production: {
    apiBaseURL: 'https://dropist.io/api'
  }
}

module.exports = {
  ...base,
  ...env[process.env.NODE_ENV]
}
