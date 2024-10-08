import axios from 'axios';
import { IFallacyPredProps } from '../types/IFallacyPredProps';
import { IEmoPredProps } from '../types/IEmoPredProps';

const baseUrl = "http://127.0.0.1:5000"

export async function predictEmotion(data: string): 
Promise<any> {
    let error = false;
    try {
        const response = await axios.post(baseUrl + '/predictemotion', { data },
            {
                headers: {
                    'Content-Type': 'application/json'  // Ensure JSON content type
                }
            }
        );
        // response.data.result.forEach((element: IEmoPredProps) => {
        //     element.emotion = element.emotion.replace(" ", "_")
        // });
        console.log(response.data.result)
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
        console.log(response.data.result)
        // response.data.result.map((element: IFallacyPredProps) => {
        //     console.log(element)
        //     element.fallacy = element.fallacy.replace(" ", "_")
        // });
        
        // console.log(response.data.result)
        return [response.data.result, error]
    } catch (err: any) {
        error = true
        return [[], err]
    }
}