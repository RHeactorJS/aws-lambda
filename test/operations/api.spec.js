/* global describe it expect */

import {handler, apiIndexOperation, statusOperation} from '../../src'
import {Status, Index, Link} from '@rheactorjs/models'
import {URIValue} from '@rheactorjs/value-objects'
import Promise from 'bluebird'

const contentType = 'application/vnd.rheactorjs.aws-lambda.v1+json'
const environment = 'testing'
const headers = {'Content-type': contentType}
const mountURL = new URIValue('https://api.example.com/')
const operations = {
  index: apiIndexOperation(new Index([
    new Link(mountURL.append('status'), Status.$context),
    new Link(mountURL.append('foo'), Status.$context)
  ])),
  status: statusOperation('0.0.0', environment, Date.now())
}

describe('API', () => {
  describe('/index', () => {
    it('should return the API index', () => {
      const path = '/index'
      const httpMethod = 'GET'
      return new Promise(
        (resolve, reject) => {
          handler(
            contentType,
            environment,
            'foo',
            operations,
            {
              headers,
              httpMethod,
              path
            }, null, (err, res) => {
              if (err) return reject(err)
              return resolve(res)
            })
        })
        .then(res => {
          expect(res.statusCode).toEqual(200)
          expect(res.headers).toEqual({
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': 'Content-Length'
          })
          const body = JSON.parse(res.body)
          expect(body.$links).toHaveLength(2)
          const statusLink = body.$links.filter(link => link.subject === Status.$context.toString())[0]
          expect(statusLink.subject).toEqual(Status.$context.toString())
        })
    })
  })
  describe('/status', () => {
    it('should return status', () => {
      const path = '/status'
      const httpMethod = 'POST'
      return new Promise(
        (resolve, reject) => {
          handler(
            contentType,
            environment,
            'foo',
            operations,
            {
              headers,
              httpMethod,
              path
            }, null, (err, res) => {
              if (err) return reject(err)
              return resolve(res)
            })
        })
        .then(res => {
          expect(res.statusCode).toEqual(200)
          expect(res.headers).toEqual({
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Expose-Headers': 'Content-Length'
          })
          const body = JSON.parse(res.body)
          expect(body.status).toEqual('ok')
          expect(body.version).toMatch(/^0\.0\.0\+testing\.[0-9]+/)
          expect(new Date(body.time).getTime()).toBeLessThanOrEqual(Date.now())
        })
    })
  })
})
