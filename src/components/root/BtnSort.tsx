import { motion } from "motion/react";
import { ReactNode } from "react";

export function BtnSort({ log }: { log(): void }): ReactNode {
  return (
    <motion.div
      whileHover={{
        backgroundColor: "var(--color-black-3)",
      }}
      className="bg-black-2 border-black-4 fixed ml-4 rounded-lg border p-1 px-4 shadow-lg"
    >
      <div className="flex w-full cursor-pointer items-center justify-end gap-1">
        <p className="text-white-3 text-lg" onClick={() => log()}>
          SORT BY
        </p>
        <p className="text-white-3 text-[1.3rem]">⇌</p>
      </div>
    </motion.div>
  );
}
