import { GoogleGenAI, Type } from '@google/genai';
import { AI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: 'The full name of the establishment.',
      },
      category: {
        type: Type.STRING,
        description: 'The category of the establishment (e.g., School, Hospital, Shop). Must be one of the requested categories.',
      },
      description: {
        type: Type.STRING,
        description: 'A brief, engaging, one-sentence description of the establishment.',
      },
      latitude: {
        type: Type.NUMBER,
        description: 'The latitude coordinate of the establishment.'
      },
      longitude: {
        type: Type.NUMBER,
        description: 'The longitude coordinate of the establishment.'
      }
    },
    required: ["name", "category", "description", "latitude", "longitude"],
  },
};

export async function fetchEstablishments(area, categories) {
  try {
    const areaString = area.map(p => `(${p.lat.toFixed(6)}, ${p.lng.toFixed(6)})`).join(', ');
    const prompt = `Generate a fictional but plausible list of up to 40 establishments located within the geographical polygon defined by these latitude and longitude coordinates: ${areaString}. 
The establishments should only belong to the following categories: ${categories.join(', ')}. 
For each establishment, provide its name, category, a brief one-sentence description, and precise latitude and longitude coordinates that fall strictly inside the defined polygon.
Ensure the "category" field for each item exactly matches one of the provided category names. Distribute the establishments realistically within the polygon.`;

    const response = await ai.models.generateContent({
      model: AI_MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonString = response.text;
    if (!jsonString) {
      throw new Error("Received an empty response from the AI.");
    }
    
    const parsedData = JSON.parse(jsonString);

    if (!Array.isArray(parsedData)) {
      throw new Error("AI response is not in the expected array format.");
    }
    
    const validatedData = parsedData.filter(item => 
      item && 
      typeof item.name === 'string' && 
      typeof item.category === 'string' && 
      typeof item.description === 'string' &&
      typeof item.latitude === 'number' &&
      typeof item.longitude === 'number'
    );
    
    return validatedData;

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Failed to generate establishment data. The AI may be unavailable or the request was invalid.");
  }
}
