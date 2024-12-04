import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution as "256x256" | "512x512" | "1024x1024",
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

// const HUGGING_FACE_API_URL =
//   "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-medium";
// const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY;

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { prompt, amount, resolution } = body;

//     console.log("API Key:", HUGGING_FACE_API_KEY ? "Present" : "Missing");

//     // Validate user authentication
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Validate Hugging Face API Key
//     if (!HUGGING_FACE_API_KEY) {
//       return NextResponse.json(
//         { error: "Hugging Face API key not configured." },
//         { status: 500 }
//       );
//     }

//     // Validate prompt
//     if (!prompt || typeof prompt !== "string") {
//       return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
//     }

//     // Parse resolution
//     const [width, height] = resolution.split('x').map(Number);

//     // Make a request to Hugging Face API
//     const response = await fetch(HUGGING_FACE_API_URL, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${HUGGING_FACE_API_KEY.trim()}`, // Trim to remove any whitespace
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ 
//         inputs: prompt,
//         parameters: {
//           num_inference_steps: 50,
//           width: width,
//           height: height
//         }
//       }),
//     });

//     // Log the raw response for debugging
//     const responseText = await response.text();
//     console.log("Raw API Response Status:", response.status);
//     console.log("Raw API Response Text:", responseText);

//     // Check if the response is not OK
//     if (!response.ok) {
//       throw new Error(`Hugging Face API Error: ${response.status} - ${responseText}`);
//     }

//     // Process the image
//     const imageBuffer = await fetch(responseText).then(r => r.arrayBuffer());
//     const base64Image = Buffer.from(imageBuffer).toString('base64');
//     const dataUrl = `data:image/png;base64,${base64Image}`;

//     // Generate multiple images if amount > 1
//     const images = Array(parseInt(amount)).fill(dataUrl);

//     return NextResponse.json(images);
//   } catch (error) {
//     console.error("[IMAGE_GENERATION_ERROR]", error);
//     return NextResponse.json(
//       { 
//         error: error instanceof Error ? error.message : "Internal Server Error", 
//         details: error 
//       }, 
//       { status: 500 }
//     );
//   }
// }