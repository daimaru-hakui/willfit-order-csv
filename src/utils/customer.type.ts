import z from "zod";

export type Customer = {
  id: string;
  customerName: string;
  customerCode: string;
  excludedDays: number[];
  products: {
    productCode: string;
    productName: string;
    size: string;
    price: number;
  }[];
  createdAt: any;
};

export type CustomerWithQuantity = {
  id: string;
  customerName: string;
  customerCode: string;
  excludedDays: number[];
  products: {
    productCode: string;
    productName: string;
    size: string;
    price: number;
    quantity: number;
  }[];
};

export const CustomerCreateSchema = z.object({
  customerName: z.string().min(1, { message: "入力してください" }),
  customerCode: z.string(),
  excludedDays: z.number().array(),
  products: z
    .object({
      productCode: z.string(),
      productName: z.string(),
      size: z.string().optional(),
      price: z.coerce.number(),
    })
    .array(),
});
export type CustomerCreate = z.infer<typeof CustomerCreateSchema>;

export const CustomerEditSchema = z.object({
  customerName: z.string().min(1, { message: "入力してください" }),
  customerCode: z.string(),
  excludedDays: z.number().array(),
  products: z
    .object({
      productCode: z.string(),
      productName: z.string(),
      size: z.string().optional(),
      price: z.coerce.number(),
    })
    .array(),
});
export type CustomerEdit = z.infer<typeof CustomerEditSchema>;
