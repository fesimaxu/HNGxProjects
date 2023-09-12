describe('create a new Person', ()=> {

pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});


pm.test("Status field is not empty", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.status).to.exist.and.to.not.be.empty;
});


pm.test("Method field is not empty", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.method).to.exist.and.to.not.be.empty;
});


pm.test("Message field is not empty", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.message).to.exist.and.to.not.be.empty;
});


pm.test("Data field is not empty", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.data).to.exist.and.to.not.be.empty;
});


})

describe("get by Id", ()=> {

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});


pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});


pm.test("Validate the data object", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.data).to.exist.and.to.be.an('object');
});


pm.test("Email is in a valid format", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.data.email).to.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
});


})

describe("get user all users", ()=>{

pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});


pm.test("Validate data array is present and contains expected number of elements", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.data).to.exist;
    pm.expect(responseData.data).to.be.an('array');
    pm.expect(responseData.data).to.have.lengthOf(1);
});


pm.test("The 'id' field in the 'data' array is a positive integer", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.data).to.be.an('array').that.is.not.empty;

    responseData.data.forEach(function (item) {
        pm.expect(item.dataValues.id).to.be.a('number').that.is.greaterThan(0);
    });
});


pm.test("Date of birth field exists and is a string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.data).to.be.an('array').that.is.not.empty;

    responseData.data.forEach(function (user) {
        pm.expect(user.dataValues.dateOfBirth).to.exist;
        pm.expect(user.dataValues.dateOfBirth).to.be.a('string');
    });
});


})

describe("update user details", ()=>{

pm.test("Response status code is 200", function () {
    pm.expect(pm.response.code).to.equal(200);
});


pm.test("Validate the response body has the required fields", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.status).to.exist.and.to.be.a('string');
    pm.expect(responseData.method).to.exist.and.to.be.a('string');
    pm.expect(responseData.message).to.exist.and.to.be.a('string');
    pm.expect(responseData.data).to.exist.and.to.be.an('array');
});


pm.test("Status is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.status).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
});


pm.test("Method is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.method).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
});


pm.test("Message is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.message).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
});


})

describe("update a single user detail", ()=>{

pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});


pm.test("The status field should not be empty", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.status).to.exist.and.to.not.be.empty;
});


pm.test("Validate that 'method' field is not empty", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.method).to.exist.and.to.not.be.empty;
});


pm.test("Validate that 'message' field is not empty", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.message).to.exist.and.to.not.be.empty;
});


pm.test("The data field should be an array with at least one element", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.data).to.be.an('array').and.to.have.lengthOf.at.least(1);
});


})

describe("delete a user detail", ()=>{

pm.test("Response status code is 200", function () {
    pm.response.to.have.status(200);
});


pm.test("Validate the response body structure", function () {
    const responseData = pm.response.json();

    pm.expect(responseData).to.be.an('object');
    pm.expect(responseData.status).to.exist.and.to.be.a('string');
    pm.expect(responseData.method).to.exist.and.to.be.a('string');
    pm.expect(responseData.message).to.exist.and.to.be.a('string');
});


pm.test("Status is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.status).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
});


pm.test("Method is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.method).to.be.a('string').and.to.have.lengthOf.at.least(1, "Method should not be empty");
});


pm.test("Message is a non-empty string", function () {
    const responseData = pm.response.json();

    pm.expect(responseData.message).to.be.a('string').and.to.have.lengthOf.at.least(1, "Value should not be empty");
});


})