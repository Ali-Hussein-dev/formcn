import { Button } from "@/components/ui/button";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { motion } from "motion/react";
import { MdAdd, MdDelete } from "react-icons/md";
import { FormElementsStepDropdown } from "@/form-builder/components/edit/form-elements-dropdown";

//======================================
export function StepContainer({
  children,
  stepIndex,
  stepId,
}: // fieldIndex,
{
  children: React.ReactNode;
  stepIndex: number;
  stepId: string;
  // fieldIndex?: number;
}) {
  const { addFormStep, removeFormStep } = useFormBuilderStore();
  return (
    <motion.div
      key={stepId}
      layout
      className="rounded-lg px-3 md:px-4 md:py-5 py-4 border-dashed border bg-muted"
      initial={{ opacity: 0, y: -15, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.2, delay: 0.05 },
      }}
      exit={{
        opacity: 0,
        scale: 0.85,
        y: -10,
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <FormElementsStepDropdown stepIndex={stepIndex} />
        <div className="text-muted-foreground center font-medium pr-2">
          Step {stepIndex + 1}
        </div>
      </div>
      <div className="space-y-3">{children}</div>
      <div className="flex items-center justify-end px-2 pt-4">
        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={() => removeFormStep(stepIndex)}
            variant="outline"
            className="rounded-lg"
            type="button"
          >
            <MdDelete />
            <span>Remove Step</span>
          </Button>
          <Button
            type="button"
            className="rounded-lg"
            onClick={() => addFormStep(stepIndex)}
          >
            <MdAdd />
            <span>Add Step</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
