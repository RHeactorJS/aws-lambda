# aws-lambda

[![npm version](https://img.shields.io/npm/v/@rheactorjs/aws-lambda.svg)](https://www.npmjs.com/package/@rheactorjs/aws-lambda)
[![Build Status](https://travis-ci.org/RHeactorJS/aws-lambda.svg?branch=master)](https://travis-ci.org/RHeactorJS/aws-lambda)
[![Greenkeeper badge](https://badges.greenkeeper.io/RHeactorJS/aws-lambda.svg)](https://greenkeeper.io/) 
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![semantic-release](https://img.shields.io/badge/semver-semantic%20release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Test Coverage](https://codeclimate.com/github/RHeactorJS/aws-lambda/badges/coverage.svg)](https://codeclimate.com/github/RHeactorJS/aws-lambda/coverage)
[![Code Climate](https://codeclimate.com/github/RHeactorJS/aws-lambda/badges/gpa.svg)](https://codeclimate.com/github/RHeactorJS/aws-lambda)

Core components for RESTful AWS lambda endpoints.

See [`image-service`](https://github.com/RHeactorJS/image-service/blob/master/package.json) for a concrete usage example.

## API Gateway

APIs built with `aws-lambda` require additional setup on API Gateway.

After creating an API Gateway API for the lambda by configure it as [proxy resource](https://docs.aws.amazon.com/console/apigateway/proxy-resource)
the CORS configuration needs to be customized:

Select the `/{proxy+}` resource and from the *Actions* drop-down select *Enable CORS*.  
Add `Content-Length` to the `Access-Control-Allow-Headers` list.
Put `'Content-Type'` in the `Access-Control-Expose-Headers` list under *Advanced*.  
Click *Enable CORS and replace existing CORS headers*.

Don't forget to deploy the API afterwards.
