import { normalize, schema } from 'normalizr';

export const normalizarMensajes = (mensajes) => {
    console.log(mensajes);
    const message = new schema.Entity('messages', {}, { idAttribute: '_id' });
    const messageSchema = message;
    const author = new schema.Entity('author', { mensajes: [messageSchema] }, { idAttribute: 'author' });
    const authorSchema = [author];
    return normalize(mensajes, authorSchema);
}