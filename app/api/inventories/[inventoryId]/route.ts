import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { inventorySchema } from "@/lib/validations/inventory";
import { authOptions } from "@/lib/auth";

const routeContextSchema = z.object({
  params: z.object({
    inventoryId: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    // Validate the route context.
    const { params } = routeContextSchema.parse(context);

    // fetch the unique inventory.
    const dbInventory = await db.inventory.findUnique({
      where: {
        id: params.inventoryId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(dbInventory, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context);

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = inventorySchema.parse(body);

    // Update the inventory.
    const dbUpdatedInventory = await db.inventory.update({
      where: {
        id: params.inventoryId,
        userId: session.user.id,
      },
      data: {
        quantity: Number(payload.quantity),
        userId: session.user.id,
        location: payload.location,
        reorderPoint: Number(payload.reorderPoint),
        warehouseId: payload.warehouseId,
      },
    });

    return NextResponse.json(dbUpdatedInventory, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), {
        status: 422,
      });
    }

    return new NextResponse(null, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: z.infer<typeof routeContextSchema>,
) {
  try {
    // Validate the route context.
    const { params } = routeContextSchema.parse(context);

    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    // delete the inventory.
    await db.inventory.delete({
      where: {
        id: params.inventoryId,
        userId: session.user.id,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
