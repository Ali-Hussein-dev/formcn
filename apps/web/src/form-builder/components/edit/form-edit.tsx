import type {
  FormElement,
  FormElementOrList,
  FormStep,
} from "@/form-builder/form-types";
import * as React from "react";
import { Reorder } from "motion/react";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { LuGripVertical } from "react-icons/lu";
import { FieldCustomizationView } from "@/form-builder/components/edit/field-edit";
import { FormElementsDropdown } from "@/form-builder/components/edit/form-elements-dropdown";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { StepContainer } from "@/form-builder/components/edit/step-container";

type EditFormItemProps = {
  element: FormElement;
  /**
   * Index of the main array
   */
  fieldIndex: number;
  /**
   * Index of the nested array element
   */
  j?: number;
  stepIndex?: number;
};

const EditFormItem = (props: EditFormItemProps) => {
  const { element, fieldIndex } = props;
  const dropElement = useFormBuilderStore((s) => s.dropElement);
  const isNested = typeof props?.j === "number";
  let DisplayName =
    "label" in element
      ? element?.label
      : "content" in element
      ? element.content
      : element.name;

  return (
    <div className="w-full group">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center justify-start gap-2 size-full">
          {isNested ? (
            <span className="w-1" />
          ) : (
            <LuGripVertical className="dark:text-muted-foreground text-muted-foreground" />
          )}
          <span className="truncate max-w-xs md:max-w-sm">{DisplayName}</span>
        </div>
        <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 duration-100">
          {element.fieldType !== "Separator" && (
            <FieldCustomizationView
              formElement={element as FormElement}
              fieldIndex={fieldIndex}
              j={props?.j}
              stepIndex={props?.stepIndex}
            />
          )}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              dropElement({
                fieldIndex,
                j: props?.j,
                stepIndex: props?.stepIndex,
              });
            }}
            className="rounded-xl h-9"
          >
            <MdDelete />
          </Button>
          {!isNested && (
            <FormElementsDropdown
              fieldIndex={fieldIndex}
              stepIndex={props?.stepIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const NoStepsPlaceholder = () => {
  const { addFormStep } = useFormBuilderStore();
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
      <Button size="sm" onClick={() => addFormStep(0)}>
        Add first Step
      </Button>
    </div>
  );
};
//======================================
export function FormEdit() {
  const isMS = useFormBuilderStore((s) => s.isMS);
  const formElements = useFormBuilderStore((s) => s.formElements);
  const reorder = useFormBuilderStore((s) => s.reorder);
  const reorderSteps = useFormBuilderStore((s) => s.reorderSteps);

  const animateVariants = {
    initial: { opacity: 0, y: -15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.85 },
    transition: { duration: 0.3, ease: "easeInOut" },
  };

  switch (isMS) {
    case true:
      if (formElements.length === 0) {
        return <NoStepsPlaceholder />;
      }
      return (
        <Reorder.Group
          values={formElements as FormStep[]}
          onReorder={(newOrder) => {
            reorderSteps(newOrder);
          }}
          className="flex flex-col gap-4"
          layoutScroll
        >
          {(formElements as FormStep[]).map((step, stepIndex) => {
            return (
              <Reorder.Item
                value={step}
                key={step.id}
                layout
                variants={animateVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <StepContainer stepIndex={stepIndex}>
                  <Reorder.Group
                    axis="y"
                    onReorder={(newOrder) => {
                      reorder({ newOrder, stepIndex });
                    }}
                    values={step.stepFields}
                    className="flex flex-col gap-3"
                    tabIndex={-1}
                  >
                    {step.stepFields.map((element, fieldIndex) => {
                      if (Array.isArray(element)) {
                        return (
                          <Reorder.Item
                            key={element[0].id}
                            value={element}
                            variants={animateVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="flex items-center justify-start gap-2 pl-2"
                            layout
                          >
                            <LuGripVertical className="dark:text-muted-foreground text-muted-foreground" />
                            <Reorder.Group
                              value={element}
                              onReorder={(newOrder) => {
                                reorder({ newOrder, fieldIndex });
                              }}
                              values={element}
                              className="w-full flex items-center justify-start gap-2"
                            >
                              {element.map((el, j) => (
                                <Reorder.Item
                                  value={el}
                                  key={el.id}
                                  className="w-full rounded-xl border border-dashed py-1.5 bg-background"
                                >
                                  <EditFormItem
                                    fieldIndex={fieldIndex}
                                    j={j}
                                    element={el}
                                    stepIndex={stepIndex}
                                  />
                                </Reorder.Item>
                              ))}
                            </Reorder.Group>
                          </Reorder.Item>
                        );
                      }
                      return (
                        <Reorder.Item
                          key={element.id}
                          value={element}
                          className="w-full rounded-xl border border-dashed py-1.5 bg-background"
                          variants={animateVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          layout
                        >
                          <EditFormItem
                            fieldIndex={fieldIndex}
                            element={element}
                            stepIndex={stepIndex}
                          />
                        </Reorder.Item>
                      );
                    })}
                  </Reorder.Group>
                </StepContainer>
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      );
    default:
      return (
        <Reorder.Group
          axis="y"
          onReorder={(newOrder) => {
            reorder({ newOrder, fieldIndex: null });
          }}
          values={formElements as FormElementOrList[]}
          className="flex flex-col gap-3 rounded-lg px-3 md:px-4 md:py-5 py-4 border-dashed border bg-muted"
          tabIndex={-1}
        >
          {(formElements as FormElementOrList[]).map((element, i) => {
            if (Array.isArray(element)) {
              return (
                <Reorder.Item
                  value={element}
                  key={element[0].id}
                  variants={animateVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex items-center justify-start gap-2 pl-2"
                  layout
                >
                  <LuGripVertical className="dark:text-muted-foreground text-muted-foreground" />
                  <Reorder.Group
                    axis="x"
                    onReorder={(newOrder) => {
                      reorder({ newOrder, fieldIndex: i });
                    }}
                    values={element}
                    className="flex items-center justify-start gap-2 w-full"
                    tabIndex={-1}
                  >
                    {element.map((el, j) => (
                      <Reorder.Item
                        key={el.id}
                        value={el}
                        className="w-full rounded-xl border border-dashed py-1.5 bg-background"
                        variants={animateVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        layout
                      >
                        <EditFormItem
                          key={el.id}
                          fieldIndex={i}
                          j={j}
                          element={el}
                        />
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </Reorder.Item>
              );
            }
            return (
              <Reorder.Item
                key={element.id}
                value={element}
                className="rounded-xl border border-dashed py-1.5 w-full bg-background"
                variants={animateVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
              >
                <EditFormItem
                  key={element.id}
                  fieldIndex={i}
                  element={element}
                />
              </Reorder.Item>
            );
          })}
        </Reorder.Group>
      );
  }
}
