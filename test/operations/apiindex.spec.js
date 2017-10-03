/* global describe it expect */

import {apiIndexOperation} from '../../src'
import {Status, Index, Link} from '@rheactorjs/models'
import {URIValue} from '@rheactorjs/value-objects'

describe('apiindex', () => {
  it('should create a list of links', () => {
    return apiIndexOperation(new Index([
      new Link(new URIValue('https://api.example.com/status'), Status.$context)
    ])).get()
      .then(response => {
        expect(response.$context.toString()).toEqual(Index.$context.toString())
        expect(response.$links.length).toEqual(1)
        expect(response.$links[0].href.equals(new URIValue('https://api.example.com/status'))).toEqual(true)
        expect(response.$links[0].subject.equals(Status.$context)).toEqual(true)
      })
  })
})
