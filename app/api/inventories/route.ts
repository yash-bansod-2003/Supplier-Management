import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { inventorySchema } from "@/lib/validations/inventory";

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = inventorySchema.parse(body);

    // create the Inventory.
    const dbInventory = await db.inventory.create({
      data: {
        quantity: Number(payload.quantity),
        userId: session.user.id,
        location: payload.location,
        reorderPoint: Number(payload.reorderPoint),
        warehouseId: payload.warehouseId,
      },
    });

    return NextResponse.json(dbInventory, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}
