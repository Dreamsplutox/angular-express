// var http = require('http')
//   , vm = require('vm')
//   , concat = require('concat-stream'); // this is just a helper to receive the
//                                        // http payload in a single callback
//                                        // see https://www.npmjs.com/package/concat-stream

// http.get({
//     host: 'localhost', 
//     port: 8080, 
//     path: '/jasperserver-pro/client/visualize.js'
//   }, 
//   function(res) {
//     res.setEncoding('utf8');
//     res.pipe(concat({ encoding: 'string' }, function(remoteSrc) {
//       vm.runInThisContext(remoteSrc, 'remote_modules/visualize.js');
//     }));
// });

// var requireFromUrl = require('require-from-url/sync');
// requireFromUrl("https://localhost:8443/jasperserver-pro/client/visualize.js");

// setTimeout(() => {
// 	console.log("end of timeout");
// }, 5000);

/*
require("./visualize.js");

declare var visualize: any;

// Import every element used in our test 
import { AuthService } from './auth.services';

// Describe our test with a simple sentence
describe("Test authentification jasper", () => {
	// Init vars
	let auth_service: AuthService;
	let visualize: any;

	// Instanciate the auth service for each new "it()"
	beforeEach(() => {
		auth_service = new AuthService();
		console.log("Auth service created");
	});

	// First test (it to describe what is going on, expect to check if the test passed)
	it("get username, if it is empty, the test passed", () => {
		var username = auth_service.getUsername();

		expect(username).toEqual("");

	});

	// Second test, check if the authentication promise worked well
	it("should login to Jasper (and send resolve message)", () => {
		var dummy = true;
		// var login_result = auth_service.signIn("jasperadmin", "jasperadmin")  
		return auth_service.signIn("jasperadmin", "jasperadmin")
			.then(
				(result) => {
					expect(result).toEqual("success signIn");
				} 
			);
	});
});
*/