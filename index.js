import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const { AWS_REGION, DYNAMODB_TABLE_NAME, JWT_SECRET_KEY } = process.env;

AWS.config.update({
    region: AWS_REGION,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function register(username, password) {
    const params = {
        TableName: DYNAMODB_TABLE_NAME,
        Key: { username }
    };

    const existingUser = await dynamoDb.get(params).promise();

    if (existingUser.Item) {
        throw new Error('User already exists');
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = {
        TableName: DYNAMODB_TABLE_NAME,
        Item: {
            username,
            password: hash,
        }
    };

    await dynamoDb.put(newUser).promise();
}

export async function login(username, password) {
    const params = {
        TableName: DYNAMODB_TABLE_NAME,
        Key: { username }
    };

    const result = await dynamoDb.get(params).promise();
    const user = result.Item;

    if (!user) {
        throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET_KEY, { expiresIn: '1h' });

    return token;
}

export function authenticate(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}
