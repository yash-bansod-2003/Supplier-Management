import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { productSchema } from "@/lib/validations/product";
import { authOptions } from "@/lib/auth";

const routeContextSchema = z.object({
  params: z.object({
    productId: z.string(),
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

    // fetch the unique product.
    const dbproduct = await db.product.findUnique({
      where: {
        id: params.productId,
        userId: session.user.id,
      },
    });

    return NextResponse.json(dbproduct, { status: 200 });
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
    const payload = productSchema.parse(body);

    // Update the product.
    const {
      name,
      description,
      color,
      weight,
      unit,
      cost,
      category,
      quantity,
      inventoryId,
    } = payload;

    const dbUpdatedproduct = await db.product.update({
      where: {
        id: params.productId,
        userId: session.user.id,
      },
      data: {
        name,
        description,
        color,
        weight: Number(weight),
        unit,
        cost: Number(cost),
        category,
        quantity: Number(quantity),
        inventoryId,
      },
    });

    return NextResponse.json(dbUpdatedproduct, { status: 200 });
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

    // delete the product.
    await db.product.delete({
      where: {
        id: params.productId,
        userId: session.user.id,
      },
    });

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 500 });
  }
}
