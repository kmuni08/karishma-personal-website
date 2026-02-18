import { GoogleGenerativeAI } from "@google/generative-ai";
import bio from "../../../data/bio.json";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log('Received messages:', messages);

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: `You are the AI version of Karishma. Use these facts: ${JSON.stringify(bio)}. 
         Experience: 5yr Frontend, 4yr Python, 2yr Java. 
         Transitioned from Physical Therapy at Hunter College to Computer Science at Queens College recieving a Bachelors of Science Degree. 
         If info is missing, say: "I'm not sure, please email me! You can find my email in the "Contact section of this webpage."`
    });

    const conversationMessages = messages.slice(0, -1);
    
    const filteredMessages = conversationMessages.filter((msg: any, index: number) => {
      if (index === 0 && msg.role === 'assistant') return false;
      return true;
    });

    const history = filteredMessages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });

    const result = await chat.sendMessageStream(lastMessage.content);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}