import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { orderSchema } from "@/lib/validations/order";

export async function POST(req: Request) {
  try {
    // Ensure user is authentication and has access to this user.
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse(null, { status: 403 });
    }

    // Get the request body and validate it.
    const body = await req.json();
    const payload = orderSchema.parse(body);

    // create the Product.
    const { subtotal, productId, shipping, tax, total, quantity } = payload;

    const product = await db.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "no product found" }, { status: 404 });
    }

    const dbOrder = await db.order.create({
      data: {
        shipping: Number(shipping),
        subtotal: Number(subtotal),
        tax: Number(tax),
        total: Number(total),
        quantity: Number(quantity),
        organizationId: session.user.id,
        productId: product.id,
        supplierId: product.userId,
      },
    });

    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        quantity: product.quantity - Number(quantity),
      },
    });

    return NextResponse.json(dbOrder, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 });
    }

    return NextResponse.json({ error }, { status: 500 });
  }
}
