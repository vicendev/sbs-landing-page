import { type HTMLAttributes } from "react";

import clsx from "clsx"; // Opcional, para manejar clases condicionales

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}

export function Button({ disabled, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={clsx(
        "font-semibold py-3 px-8 rounded-lg transition duration-300",
        {
          "bg-[#5C469C] hover:bg-[#D4ADFC] hover:text-gray-900 text-white": !disabled,
          "bg-gray-300 text-gray-500 cursor-not-allowed": disabled,
        },
        className
      )}
    />
  );
}

