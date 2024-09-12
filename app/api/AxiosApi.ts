import axios from 'axios';

const baseUrl = "http://127.0.0.1:5000"

export async function predictEmotion(data: string): 
Promise<any> {
    let error = false;
    try {
        const response = await axios.post(baseUrl + '/predictemotion', { data });
        return [response.data.result, error]
    } catch (err: any) {
        error = true
        return [[], err]
    }
}

export async function predictFallacy(data: string): Promise<any> {
    let error = false;
    try {
        const response = await axios.post(baseUrl + '/predictfallacy', { data });
        return [response.data.result, error]
    } catch (err: any) {
        error = true
        return [[], err]
    }
}