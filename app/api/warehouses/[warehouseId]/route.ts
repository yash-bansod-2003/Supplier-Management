import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { warehouseSchema } from "@/lib/validations/warehouse";
import { authOptions } from "@/lib/auth";

const routeContextSchema = z.object({
  params: z.object({
    warehouseId: z.string(),
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

    // fetch the unique warehouse.
    const dbwarehouse = await db.warehouse.findUnique({
      where: {
        id: params.warehouseId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(dbwarehouse, { status: 200 });
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
    const payload = warehouseSchema.parse(body);

    // Update the warehouse.
    const dbUpdatedwarehouse = await db.warehouse.update({
      where: {
        id: params.warehouseId,
        userId: session.user.id,
      },
      data: {
        name: payload.name,
        userId: session.user.id,
        capacity: Number(payload.capacity),
        location: payload.location,
      },
    });

    return NextResponse.json(dbUpdatedwarehouse, { status: 200 });
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

    // delete the warehouse.
    await db.warehouse.delete({
      where: {
        id: params.warehouseId,
        userId: session.user.id,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
