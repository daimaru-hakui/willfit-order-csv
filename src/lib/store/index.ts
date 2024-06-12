import { Customer } from "@/utils/customer.type";
import { addDays, endOfMonth, startOfMonth } from "date-fns";
import { create } from "zustand";

type State = {
  customerId: string;
  setCustomerId: (value: string) => void;
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  startDate: Date;
  setStartDate: (date: Date) => void;
  endDate: Date;
  setEndDate: (date: Date) => void;
  resetDate: () => void;
};

export const useStore = create<State>((set) => ({
  customerId: "",
  setCustomerId: (value) => set((state) => ({ customerId: value })),
  customer: null,
  setCustomer: (customer) => set((state) => ({ customer: customer })),
  startDate: startOfMonth(new Date()),
  setStartDate: (date) => set((state) => ({ startDate: date })),
  endDate: endOfMonth(new Date()),
  setEndDate: (date) => set((state) => ({ endDate: date })),
  resetDate: () =>
    set(() => ({
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
    })),
}));
