"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton({
  className = "",
  text = "sumit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className={`capitalize ${className}`}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type SubmitRhkButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
  isPending?: boolean;
  isValid?: boolean;
};

export function SubmitRhkButton({
  className = "",
  text = "sumit",
  size = "default",
  isPending,
  isValid = false,
}: SubmitRhkButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isValid || isPending}
      className={`capitalize ${className}`}
      size={size}
    >
      {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  );
}
