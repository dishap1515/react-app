import { v4 as uuidv4 } from 'uuid';

export const generateRandomTime = (min, max) =>
    Math.round(Math.random() * (max - min) + min);

export const generateRandomIndex = collection =>
    Math.floor(Math.random() * collection.length);

export const generateHoles = ({amount = 1, isActive = false} = {}) =>
    Array.from({length: amount}, (_, i) => ({id: uuidv4(), isActive})); 
    