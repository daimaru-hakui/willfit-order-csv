"use client";
import { SubmitRhkButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import { FormInput } from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase/client";
import { CustomerCreate, CustomerCreateSchema } from "@/utils/customer.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

export function CustomerCreateModal() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<CustomerCreate>({
    resolver: zodResolver(CustomerCreateSchema),
    defaultValues: {
      customerCode: "",
      customerName: "",
      excludedDays: [],
      products: [
        {
          productCode: "",
          productName: "",
          size: "",
          salePrice: 0,
          costPrice: 0,
          quantity: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const addProduct = () => {
    append({
      productCode: "",
      productName: "",
      size: "",
      salePrice: 0,
      costPrice: 0,
      quantity: 0,
    });
  };

  const deleteProduct = (idx: number) => {
    remove(idx);
  };

  const onSubmit = async (data: CustomerCreate) => {
    await createCustomer(data);
  };

  const createCustomer = async (data: CustomerCreate) => {
    setLoading(true);
    const customerCol = collection(db, "customers");
    try {
      await addDoc(customerCol, {
        ...data,
        createdAt: serverTimestamp(),
      });
      console.log("成功");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoading(false);
      setOpen(!open)
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button variant="outline">追加</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] overflow-auto max-h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>顧客追加</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormInput
                  form={form}
                  name="customerCode"
                  type="text"
                  label="顧客コード"
                />
                <FormInput
                  form={form}
                  name="customerName"
                  type="text"
                  label="顧客名"
                />
              </div>
              <FormSelect form={form} name="closingDate" label="締め日" />
              <CheckboxInput form={form} />
              <div className="flex flex-col gap-3 mt-2">
                {fields.map((item, idx) => (
                  <div key={item.id} className="flex gap-3 items-end">
                    <div>
                      <Input
                        type="hidden"
                        defaultValue={0}
                        {...form.register(`products.${idx}.quantity`, {
                          valueAsNumber: true,
                        })}
                      />
                      {idx === 0 && <Label className="pb-3 block">品番</Label>}
                      <Input
                        type="text"
                        maxLength={8}
                        autoComplete="off"
                        {...form.register(`products.${idx}.productCode`)}
                      />
                    </div>
                    <div>
                      {idx === 0 && (
                        <Label className="pb-3 block">商品名</Label>
                      )}
                      <Input
                        type="text"
                        autoComplete="off"
                        {...form.register(`products.${idx}.productName`)}
                      />
                    </div>
                    <div className="hidden">
                      {idx === 0 && (
                        <Label className="pb-3 block">サイズ</Label>
                      )}
                      <Input
                        type="hidden"
                        defaultValue=""
                        {...form.register(`products.${idx}.size`)}
                      />
                    </div>
                    <div>
                      {idx === 0 && <Label className="pb-3 block">売価</Label>}
                      <Input
                        type="number"
                        {...form.register(`products.${idx}.salePrice`)}
                      />
                    </div>
                    <div>
                      {idx === 0 && <Label className="pb-3 block">原価</Label>}
                      <Input
                        type="number"
                        {...form.register(`products.${idx}.costPrice`)}
                      />
                    </div>
                    <RiDeleteBinLine
                      size={32}
                      className="mb-1 cursor-pointer"
                      onClick={() => deleteProduct(idx)}
                    />
                  </div>
                ))}
              </div>
              <Button type="button" size="default" onClick={() => addProduct()}>
                <FiPlus />
                <div>商品追加</div>
              </Button>
            </div>
            <DialogFooter>
              <SubmitRhkButton text="登録" isPending={loading} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
