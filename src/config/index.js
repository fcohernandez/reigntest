import { create } from 'apisauce';

const baseURL = 'https://hn.algolia.com/';

const baseApiConfig = {
    timeout: 20000,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: { 'Content-Type': 'application/json' }
};

const api = create({
    baseURL,
    ...baseApiConfig
});

export default api;