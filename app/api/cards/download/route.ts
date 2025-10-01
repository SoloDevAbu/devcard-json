import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { cardId } = body;

    if (!cardId) {
      return NextResponse.json(
        { error: "Card ID is required" },
        { status: 400 }
      );
    }

    // Update download count
    const card = await prisma.card.update({
      where: { id: cardId },
      data: {
        downloads: {
          increment: 1,
        },
      },
    });

    // Check if user is authenticated
    const isAuthenticated = !!session?.user?.id;

    // Get total downloads for this card
    const totalDownloads = card.downloads;

    // Allow first download without auth, require auth for subsequent downloads
    const canDownload = isAuthenticated || totalDownloads <= 1;

    return NextResponse.json({
      canDownload,
      isAuthenticated,
      totalDownloads,
      requiresAuth: !canDownload,
    });
  } catch (error) {
    console.error("Error recording download:", error);
    return NextResponse.json(
      { error: "Failed to record download" },
      { status: 500 }
    );
  }
}
