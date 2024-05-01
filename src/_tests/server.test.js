'use strict';

const e = require('express');
const { app } = require('../server.js');
const supertest = require('supertest');

const mockRequest = supertest(app);

describe('API Server', () => {

  it('should append a timestamp to the request object', async () => {
    let response = await mockRequest.get('/');
    expect(response.headers.rt).toBeDefined();
  });

  it('should respond with a 404 on an invalid route', async () => {
    let response = await mockRequest.get('/foo');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });

  it('should respond with a 500 when the server has an error', async () => {
    let response = await mockRequest.get('/broken');
    expect(response.status).toBe(500);
  });

  it('should respond with a 200 for the / route', async () => {
    let response = await mockRequest.get('/');
    expect(response.status).toBe(200);
  });

  it('should respond with a "Hello World" for the / route', async () => {
    let response = await mockRequest.get('/');
    expect(response.text).toBe("Hello World");
  });


  it('should respond with 200 status for the /person route', async () => {
    let response = await mockRequest.get('/person');
    expect(response.status).toBe(200);
  });

  it('should respond with a 200 status for a single person record route with valid id', async () => {
    let response = await mockRequest.get('/person/abc111?name=John');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
  });

  it('should respond with a 500 status for a invalid single person record route without name query', async () => {
    let response = await mockRequest.get('/person/abc111');
    expect(response.status).toBe(500);
  });

  // This tests the integrity of an ID that doesn't exist
  it('should respond with "Record Not Found" for an invalid ID in the /person route', async () => {
    let response = await mockRequest.get('/person/zzz888');
    expect(response.status).toBe(500); // Assuming next("Record Not Found") results in a 500 error as coded.
  });

  it('should respond with a 404 for using a bad method', async () => {
    let response = await mockRequest.post('/person');
    expect(response.status).toBe(404);
  });

});