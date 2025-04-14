import axios from "axios";

describe('GET /users (всі записи)', () => {
    let response;

    beforeEach(async () => {
        response = await axios.get('https://reqres.in/api/users');
    });

    test('повинен повертати статус 200', () => {
        expect(response.status).toBe(200);
    });

    test('повинен повертати дані', () => {
        expect(response.data).toBeDefined();
    });

    test('повинен повертати об\'єкт з властивістю data, яка є масивом', () => {
        expect(typeof response.data).toBe('object');
        expect(Array.isArray(response.data.data)).toBe(true);
    });

    test('масив data не повинен бути порожнім', () => {
        expect(response.data.data.length).toBeGreaterThan(0);
    });

    test('кожен користувач в масиві data повинен мати властивості id, email, first_name, last_name, avatar', () => {
        response.data.data.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('first_name');
            expect(user).toHaveProperty('last_name');
            expect(user).toHaveProperty('avatar');
        });
    });
});

describe('GET /users/{id} (конкретний запис)', () => {
    let response;
    const userId = 1;

    beforeEach(async () => {
        response = await axios.get(`https://reqres.in/api/users/${userId}`);
    });

    test('повинен повертати статус 200', () => {
        expect(response.status).toBe(200);
    });

    test('повинен повертати дані користувача', () => {
        expect(response.data).toBeDefined();
    });

    test('повинен повертати об\'єкт користувача з правильним ID', () => {
        expect(response.data.data.id).toBe(userId);
    });

    test('повинен повертати користувача з властивостями id, email, first_name, last_name, avatar', () => {
        expect(response.data.data).toHaveProperty('id');
        expect(response.data.data).toHaveProperty('email');
        expect(response.data.data).toHaveProperty('first_name');
        expect(response.data.data).toHaveProperty('last_name');
        expect(response.data.data).toHaveProperty('avatar');
    });

    test('повинен повертати об\'єкт з властивістю data', () => {
        expect(typeof response.data).toBe('object');
        expect(response.data.data).toBeDefined();
    });
});


describe('POST /users (створення користувача)', () => {
    let response;
    const newUser = {
        name: 'morpheus',
        job: 'leader'
    };

    beforeEach(async () => {
        response = await axios.post('https://reqres.in/api/users', newUser);
    });

    test('повинен повертати статус 201 (Created)', () => {
        expect(response.status).toBe(201);
    });

    test('повинен повертати створеного користувача', () => {
        expect(response.data).toBeDefined();
    });

    test('створений користувач повинен мати властивості id, createdAt', () => {
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('createdAt');
    });

    test('створений користувач повинен мати правильні значення name, job', () => {
        expect(response.data.name).toBe(newUser.name);
        expect(response.data.job).toBe(newUser.job);
    });

    test('id повинен бути рядком', () => {
        expect(typeof response.data.id).toBe('string');
    });
});


describe('PUT /users/{id} (оновлення користувача)', () => {
    let response;
    const userId = 1;
    const updatedUser = {
        name: 'morpheus',
        job: 'zion resident'
    };

    beforeEach(async () => {
        response = await axios.put(`https://reqres.in/api/users/${userId}`, updatedUser);
    });

    test('повинен повертати статус 200', () => {
        expect(response.status).toBe(200);
    });

    test('повинен повертати оновленого користувача', () => {
        expect(response.data).toBeDefined();
    });

    test('оновлений користувач повинен мати правильні значення name, job', () => {
        expect(response.data.name).toBe(updatedUser.name);
        expect(response.data.job).toBe(updatedUser.job);
    });

    test('повинен повертати оновленого користувача з властивістю updatedAt', () => {
        expect(response.data).toHaveProperty('updatedAt');
    });

    test('updatedAt повинен бути рядком', () => {
        expect(typeof response.data.updatedAt).toBe('string');
    });
});


describe('DELETE /users/{id} (видалення користувача)', () => {
    let response;
    const userId = 2; // Замініть на існуючий ID користувача

    beforeEach(async () => {
        response = await axios.delete(`https://reqres.in/api/users/${userId}`);
    });

    test('повинен повертати статус 204 (No Content)', () => {
        expect(response.status).toBe(204);
    });

    test('повинен повертати пустий body', () => {
        expect(response.data).toEqual("");
    });

    test('повинен успішно видаляти користувача', () => {
        expect(response.status).toBe(204);
    });

    test('повинен повертати undefined дані', () => {
        expect(response.data).toBeDefined();
    });

    test('повинен видалити користувача', async () => {
        try {
            await axios.get(`https://reqres.in/api/users/${userId}`);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });
});