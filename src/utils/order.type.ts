import { z } from "zod";

export const CreateOrderSchema = z.object({
  id: z.string(),
  customerCode: z.string(),
  customerName: z.string(),
  cart: z
    .object({
      orderDate: z.string(),
      details: z
        .object({
          productCode: z.string(),
          productName: z.string(),
          size: z.string(),
          price: z.number(),
          quantity: z.number(),
        })
        .array(),
    })
    .array(),
});

export type CreateOrder = z.infer<typeof CreateOrderSchema>;
