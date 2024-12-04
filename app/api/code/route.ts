// import OpenAI from "openai";
// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import Configuration from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAI();

// // You are a code generator, You must answer only in markdown code snippets. Use code comments for explanations.
// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages } = body;
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     if (!configuration.apiKey) {
//       return new NextResponse("OpenAI API Key not configured", { status: 500 });
//     }
//     if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }

//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           "role": "system",
//           "content":
//             "You are a code generator, You must answer only in markdown code snippets. Use code comments for explanations.",
//         }, ...messages
//       ],
//     });
//     return NextResponse.json(response.choices[0].message);
//     // Use <link>ClientOptions</link> type instead of <link>OpenAIApi</link> class
//   } catch (error) {
//     console.log("[CODE_ERROR]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }


import OpenAI from "openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Pass the API key directly here
});

export async function POST(req: Request) {
  try {
    // Extract user information using Clerk auth
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    // Check if the user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the OpenAI API key is configured
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    // Validate the input messages
    if (!messages || !Array.isArray(messages)) {
      return new NextResponse("Messages are required and must be an array", { status: 400 });
    }

    // Call the OpenAI Chat Completion API
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use the appropriate model
      messages: [
        {
          role: "system",
          content:
            "You are a code generator, You must answer only in markdown code snippets. Use code comments for explanations.",
        },
        ...messages,
      ],
    });

    // Return the generated message in the response
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
