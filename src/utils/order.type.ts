import { z } from "zod";

export type Order = {
  id: string;
  customerCode: string;
  customerName: string;
  terms: {
    orderDate: string;
    details: {
      productCode: string;
      productName: string;
      size: string;
      salePrice: number;
      costPrice: number;
      quantity: number;
    }[];
  }[];
  isCompleted: boolean;
  createdAt: Date | any;
  updatedAt: Date | any;
};

export const CreateOrderSchema = z.object({
  customerCode: z.string(),
  customerName: z.string(),
  terms: z
    .object({
      orderDate: z.string(),
      details: z
        .object({
          productCode: z.string(),
          productName: z.string(),
          size: z.string(),
          salePrice: z.number(),
          costPrice: z.number(),
          quantity: z.number(),
        })
        .array(),
    })
    .array(),
});

export type CreateOrder = z.infer<typeof CreateOrderSchema>;
