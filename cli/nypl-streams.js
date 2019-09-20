#!/usr/bin/env node

const dotenv = require('dotenv')
const aws = require('aws-sdk')

const Client = require('../index')
const argv = require('minimist')(process.argv.slice(2))

if (!argv.envfile) throw new Error('Must specify --envfile; See config/sample.env')

if (!argv.profile) throw new Error('Must specify --profile')

function setProfile (profile) {
  // Set aws creds:
  aws.config.credentials = new aws.SharedIniFileCredentials({
    profile
  })

  // Set aws region:
  let awsSecurity = { region: 'us-east-1' }
  aws.config.update(awsSecurity)
}

function writeToStream(streamName, data) {
  // Schema name is the stream name minus the env suffix:
  schemaName = argv.schemaName || streamName.replace(/-.*/, '')

  data = JSON.parse(data)

  client.write (streamName, data, { avroSchemaName: schemaName })
}

dotenv.config({ path: argv.envfile })

setProfile(argv.profile)

const client = new Client({ nyplDataApiClientBase: process.env.NYPL_API_BASE_URL })

switch (argv._[0]) {
  case 'write': writeToStream(argv._[1], argv._[2])
}
