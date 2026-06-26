import { motion } from "motion/react";
import { ReactNode } from "react";

export function SidebarContainer({
  header,
  component,
}: {
  header: string;
  component: ReactNode;
}): ReactNode {
  return (
    <motion.div
      layout="position"
      className="bg-black-2 border-black-5 flex flex-col gap-3 rounded-lg border px-4 py-4"
    >
      <motion.div layout="position">
        <p className="text-white-3 text-sm font-semibold">{header}</p>
      </motion.div>
      <div className="flex flex-col gap-4">{component}</div>
    </motion.div>
  );
}
