import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ messageId: string }> }
) {
  try {
    const { messageId } = await params;
    if (!messageId) {
      return new NextResponse("Message id is required", { status: 400 });
    }

    const size = await prismadb.message.findUnique({
      where: {
        id: messageId,
      },
    });

    return NextResponse.json(size);
  } catch (err) {
    console.log("[MESSAGE_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ storeId: string; messageId: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { storeId, messageId } = await params;

    console.log("[PATCH]", body);

    const { name, subject, email, content, isRead } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }
    if (!subject) {
      return new NextResponse("Subject is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const message = await prismadb.message.updateMany({
      where: {
        id: messageId,
      },
      data: {
        name,
        subject,
        email,
        content,
        isRead,
      },
    });

    return NextResponse.json(message);
  } catch (err) {
    console.log("MESSAGE_PATCH]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

//// Delete Method

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ storeId: string; messageId: string }> }
) {
  try {
    const { userId } = await auth();
    const { storeId, messageId } = await params;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!messageId) {
      return new NextResponse("Message id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await prismadb.message.deleteMany({
      where: {
        id: messageId,
      },
    });

    return NextResponse.json(size);
  } catch (err) {
    console.log("[MESSAGE_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
