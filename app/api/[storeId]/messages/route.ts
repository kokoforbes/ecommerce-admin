import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

const origin = process.env.FRONTEND_STORE_URL || "http://localhost:3001";

// Handle POST requests
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
): Promise<NextResponse> {
  try {
    const { storeId } = await params;

    const body = await req.json();

    const { name, subject, email, content } = body;

    // Validate request body
    if (!name || !subject || !email || !content) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    console.log("data:", body, storeId);

    // Save message to the database
    const message = await prismadb.message.create({
      data: {
        name,
        subject,
        content,
        email,
        storeId,
      },
    });

    const response = NextResponse.json(
      { success: true, message },
      { status: 200 }
    );

    // Set CORS headers
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests (CORS preflight)
export async function OPTIONS(): Promise<NextResponse> {
  // Create a response with no body and only CORS headers
  const response = new NextResponse(null, { status: 204 });

  // Set CORS headers for preflight
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  try {
    const { storeId } = await params;
    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const messages = await prismadb.message.findMany({
      where: {
        storeId: storeId,
      },
    });

    return NextResponse.json(messages);
  } catch (err) {
    console.log(`[MESSAGES_GET] ${err}`);
    return new NextResponse(`Internal error`, { status: 500 });
  }
}
