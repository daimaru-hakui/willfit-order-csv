import z from "zod";

export type Customer = {
  id: string;
  customerName: string;
  customerCode: string;
  excludedDays: number[];
  closingDate: string;
  products: {
    productCode: string;
    productName: string;
    size: string;
    salePrice: number;
    costPrice: number;
    quantity: number;
  }[];
  createdAt: any;
};

export const CustomerCreateSchema = z.object({
  customerName: z.string().min(1, { message: "入力してください" }),
  customerCode: z.string(),
  excludedDays: z.number().array(),
  closingDate: z.string().min(0, { message: "選択してください" }),
  products: z
    .object({
      productCode: z.string(),
      productName: z.string(),
      size: z.string().optional(),
      salePrice: z.coerce.number(),
      costPrice: z.coerce.number(),
      quantity: z.number(),
    })
    .array(),
});
export type CustomerCreate = z.infer<typeof CustomerCreateSchema>;

export const CustomerEditSchema = z.object({
  customerName: z.string().min(1, { message: "入力してください" }),
  customerCode: z.string(),
  excludedDays: z.number().array(),
  closingDate: z.string().min(0, { message: "選択してください" }),
  products: z
    .object({
      productCode: z.string(),
      productName: z.string(),
      size: z.string().optional(),
      salePrice: z.coerce.number(),
      costPrice: z.coerce.number(),
      quantity: z.number(),
    })
    .array(),
});
export type CustomerEdit = z.infer<typeof CustomerEditSchema>;
