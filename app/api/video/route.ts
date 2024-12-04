
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";
// import Replicate from "replicate"

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN
// })

// export async function POST(
//   req: Request
// ) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { prompt } = body;

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (!prompt) {
//       return new NextResponse("Prompt is required", { status: 400 });
//     }


//     const response = await replicate.run(
//       "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
//       {
//         input: {
//           prompt
//         }
//       }

//     )


//     return NextResponse.json(response);
//   } catch (error) {
//     console.log('[VIDEO_ERROR]', error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    // Validate user authentication
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Validate Replicate API token
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Replicate API token is not configured." },
        { status: 500 }
      );
    }

    // Validate input prompt
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    // Generate video using Replicate
    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: { prompt },
      }
    );

    // Return the generated video response
    return NextResponse.json({ data: response });
  } catch (error) {
    console.error("[VIDEO_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
