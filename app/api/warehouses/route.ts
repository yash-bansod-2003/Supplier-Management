import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { warehouseSchema } from "@/lib/validations/warehouse";

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = warehouseSchema.parse(body);

    // create the Warehouse.

    const dbWarehouse = await db.warehouse.create({
      data: {
        name: payload.name,
        userId: session.user.id,
        capacity: Number(payload.capacity),
        location: payload.location,
      },
    });

    return NextResponse.json(dbWarehouse, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return new NextResponse(null, { status: 500 });
  }
}
