import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Order } from "@/utils/order.type";
import { useState } from "react";
import OrderEditQuantityForm from "./OrderEditQuantityForm";

type Props = {
  quantity: number;
  index: number;
  idx: number;
  order: Order;
};

export default function OrderEditQuantityModal({
  quantity,
  index,
  idx,
  order,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleCloseClick = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={() => handleCloseClick()}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          {quantity}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[200px]">
        <DialogHeader>
          <DialogTitle>編集</DialogTitle>
        </DialogHeader>
        <OrderEditQuantityForm
          defaultValues={{ quantity }}
          index={index}
          idx={idx}
          setOpen={setOpen}
          order={order}
        />
      </DialogContent>
    </Dialog>
  );
}
