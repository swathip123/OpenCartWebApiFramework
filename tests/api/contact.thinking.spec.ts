import { test, expect } from '../../src/fixtures/apifixtures.js';

let userData = {
            firstName: 'Venkatesh',
            lastName: 'Podugu',
            email: `venkatesh123@example.com`,
            password: 'Password123!'
        };
    test('POST - create contact list user', async ({ contactApiHelper }) => {
        const response = await contactApiHelper.post('/users', userData);

        expect(response.status).toBe(201);
        expect(response.body.user.email).toBe(userData.email);

       let token = response.body.token;
        expect(token).toBeTruthy();
    });

    test('POST - login to the user', async ({ contactApiHelper }) => {
        const loginData = {
            email: userData.email,
            password: userData.password
        };

        const response = await contactApiHelper.post('/users/login', loginData);

        expect(response.status).toBe(200);
        expect(response.body.user.email).toBe(userData.email);
        expect(response.body.token).toBeTruthy();
        console.log(response.body.token)
    });

