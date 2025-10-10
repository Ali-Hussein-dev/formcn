import { Button } from "@/components/ui/button";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { MdAdd, MdDelete } from "react-icons/md";
import { LuGripVertical } from "react-icons/lu";
import { FormElementsStepDropdown } from "@/form-builder/components/edit/form-elements-dropdown";
import { motion, useDragControls, Reorder } from "motion/react";
import type { FormStep } from "@/form-builder/form-types";

//======================================
export function StepItem({
  children,
  stepIndex,
  step,
  transitionProps,
}: {
  children: React.ReactNode;
  stepIndex: number;
  step: FormStep;
  transitionProps: Record<string, any>;
}) {
  const { addFormStep, removeFormStep, formElements } = useFormBuilderStore();
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={step}
      key={step.id}
      layout
      dragControls={dragControls}
      dragListener={false}
      {...transitionProps}
    >
      <div className="rounded-lg px-3 md:px-4 lg:px-5 md:py-5 py-4 border border-dashed bg-muted">
        <motion.div
          layout
          className="flex items-center justify-between pb-4"
          key={stepIndex}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 hover:cursor-grab active:cursor-grabbing grid place-items-center"
              onPointerDown={(e) => {
                e.stopPropagation();
                dragControls.start(e);
              }}
            >
              <LuGripVertical className="dark:text-muted-foreground text-muted-foreground" />
            </div>
            <FormElementsStepDropdown stepIndex={stepIndex} />
          </div>
          <div className="text-muted-foreground center font-medium pr-2">
            Step {stepIndex + 1}
          </div>
        </motion.div>
        <div className="space-y-3">{children}</div>
        <motion.div layout className="flex items-center justify-end px-2 pt-4">
          <div className="flex items-center justify-end gap-3">
            {formElements.length > 1 && (
              <Button
                onClick={() => removeFormStep(stepIndex)}
                variant="outline"
                className="rounded-lg"
                type="button"
              >
                <MdDelete />
                <span>Remove Step</span>
              </Button>
            )}
            <Button
              type="button"
              className="rounded-lg"
              onClick={() => addFormStep(stepIndex)}
            >
              <MdAdd />
              <span>Add Step</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </Reorder.Item>
  );
}
