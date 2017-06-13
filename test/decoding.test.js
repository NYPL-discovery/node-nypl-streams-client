/* global describe it */
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const Client = require('../index');
chai.use(chaiAsPromised);

describe('Client', function() {
  this.timeout(30000);

  describe('Stream Client Decoding from Schema', () => {
    const client = new Client({ nyplDataApiClientBase: 'https://api.nypltech.org/api/v0.1/' });
    const singleRecord = {
      "Records": [
        {
          "kinesis": {
            "kinesisSchemaVersion": "1.0",
            "partitionKey": "s1",
            "sequenceNumber": "00000000000000000000000000000000000000000000000000000001",
            "data": "EmIxODUwMTQ3OAZiaWI=",
            "approximateArrivalTimestamp": 1428537600
          },
          "eventSource": "aws:kinesis",
          "eventVersion": "1.0",
          "eventID": "shardId-000000000000:00000000000000000000000000000000000000000000000000000001",
          "eventName": "aws:kinesis:record",
          "invokeIdentityArn": "arn:aws:iam::EXAMPLE",
          "awsRegion": "us-east-1",
          "eventSourceARN": "arn:aws:kinesis:us-east-1:224280085904:stream/IndexDocument"
        }
      ]
    };

    const multipleRecords = {
      "Records": [
        {
          "kinesis": {
            "kinesisSchemaVersion": "1.0",
            "partitionKey": "s1",
            "sequenceNumber": "00000000000000000000000000000000000000000000000000000001",
            "data": "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",
            "approximateArrivalTimestamp": 1428537600
          },
          "eventSource": "aws:kinesis",
          "eventVersion": "1.0",
          "eventID": "shardId-000000000000:00000000000000000000000000000000000000000000000000000001",
          "eventName": "aws:kinesis:record",
          "invokeIdentityArn": "arn:aws:iam::EXAMPLE",
          "awsRegion": "us-east-1",
          "eventSourceARN": "arn:aws:kinesis:us-east-1:224280085904:stream/Bib"
        },
        {
          "kinesis": {
            "kinesisSchemaVersion": "1.0",
            "partitionKey": "s1",
            "sequenceNumber": "00000000000000000000000000000000000000000000000000000001",
            "data": "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",
            "approximateArrivalTimestamp": 1428537600
          },
          "eventSource": "aws:kinesis",
          "eventVersion": "1.0",
          "eventID": "shardId-000000000000:00000000000000000000000000000000000000000000000000000001",
          "eventName": "aws:kinesis:record",
          "invokeIdentityArn": "arn:aws:iam::EXAMPLE",
          "awsRegion": "us-east-1",
          "eventSourceARN": "arn:aws:kinesis:us-east-1:224280085904:stream/Bib"
        }
      ]
    };

    it('should fail if the schemaName parameter is not defined', () => {
      const decodedData = client.decodeData('', singleRecord.Records[0].kinesis.data);
      expect(decodedData).to.equal(null);
    });

    it('should fail if the schemaName parameter is an empty string', () => {
      const decodedData = client.decodeData(" ", singleRecord.Records[0].kinesis.data);
      expect(decodedData).to.equal(null);
    });

    it('should fail if the schemaName parameter is not of type string', () => {
      const decodedData = client.decodeData(['IndexDocument'], singleRecord.Records[0].kinesis.data);
      expect(decodedData).to.equal(null);
    });

    it('should fail if the data object parameter is not defined', () => {
      const decodedData = client.decodeData('IndexDocument', undefined);
      expect(decodedData).to.equal(null);
    });

    it('should fail if the schema is not valid', () => {
      const incorrectSchema = 'Index';
      const decodedData = client.decodeData(incorrectSchema, singleRecord.Records[0].kinesis.data);
      return assert.isRejected(
        decodedData,
        `Invalid response: for https://api.nypltech.org/api/v0.1/current-schemas/${incorrectSchema}`
      );
    });

    it('should fail if the encoded string does NOT match the Schema', () => {
      const incorrectEncodedString = 'EmIxODUwMTQ3OAZiaWXX8282=';
      const decodedData = client.decodeData('IndexDocument', incorrectEncodedString);
      return assert.isRejected(decodedData, Error);
    });

    it('should resolve into a promise for a single record', () => {
      const decodedData = client.decodeData('IndexDocument', singleRecord.Records[0].kinesis.data);
      expect(decodedData).to.be.a('promise');
    });

    it('should pass for a single record given a correct schemaName and data parameters', () => {
      const decodedData = client.decodeData('IndexDocument', singleRecord.Records[0].kinesis.data);

      return decodedData.then((result) => {
        expect(result).to.be.an('object');
        expect(result).to.have.property('uri');
        expect(result).to.have.property('type');
      });
    });

    it('should resolve into a promise for a multiple records', () => {
      const decodedData = client.decodeData('Bib', multipleRecords.Records.map(i => i.kinesis.data));
      expect(decodedData).to.be.a('promise');
    });

    it('should pass for a multiple records given a correct schemaName and data parameters', () => {
      const decodedData = client.decodeData('Bib', multipleRecords.Records.map(i => i.kinesis.data));

      return decodedData.then((result) => {
        const firstResult = result[0];
        expect(result).to.be.an('array');
        expect(firstResult).to.have.any.keys('nyplSource', 'id', 'nyplType');
        expect(firstResult.nyplType).to.equal('bib');
      });
    });
  })
})
