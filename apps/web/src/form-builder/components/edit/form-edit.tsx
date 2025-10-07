import type {
  FormElement,
  FormElementOrList,
  FormStep,
} from "@/form-builder/form-types";
import * as React from "react";
import { AnimatePresence, Reorder, useDragControls } from "motion/react";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { LuGripVertical } from "react-icons/lu";
import { FieldCustomizationView } from "@/form-builder/components/edit/field-edit";
import { FormElementsDropdown } from "@/form-builder/components/edit/form-elements-dropdown";
import useFormBuilderStore from "@/form-builder/hooks/use-form-builder-store";
import { StepContainer } from "@/form-builder/components/edit/step-container";
import { formFieldsIcons } from "@/form-builder/constant/form-elements-list";

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
    "static" in element && element.static
      ? element.content
      : element.label || element.name;
  const Icon = formFieldsIcons[element.fieldType];
  return (
    <div className="w-full group">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center justify-start gap-1 size-full">
          <div className="size-6 grid place-items-center">
            {Icon && (
              <Icon className="size-4 dark:text-muted-foreground text-muted-foreground " />
            )}
          </div>
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

const animateVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.85, y: -10 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

const RowItems = ({
  element,
  children,
}: {
  element: FormElement[];
  children: React.ReactNode;
}) => {
  const controls = useDragControls();
  return (
    <Reorder.Item
      key={element[0].id}
      value={element}
      variants={animateVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      dragControls={controls}
      dragListener={false}
      className="flex items-center justify-start gap-2"
    >
      <div
        className="w-7 h-12 hover:cursor-grab active:grabbing grid place-items-center"
        onPointerDown={(e) => {
          e.stopPropagation();
          controls.start(e);
        }}
      >
        <LuGripVertical className="dark:text-muted-foreground text-muted-foreground" />
      </div>
      <div
        className="flex-1"
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </Reorder.Item>
  );
};

const StepsWrapper = () => {
  const reorderSteps = useFormBuilderStore((s) => s.reorderSteps);
  const formElements = useFormBuilderStore((s) => s.formElements);
  const reorder = useFormBuilderStore((s) => s.reorder);
  const stepControls = useDragControls();
  return (
    <Reorder.Group
      values={formElements as FormStep[]}
      onReorder={(newOrder) => {
        reorderSteps(newOrder);
      }}
      className="flex flex-col gap-4"
      layoutScroll
    >
      <AnimatePresence mode="sync">
        {(formElements as FormStep[]).map((step, stepIndex) => (
          <Reorder.Item
            value={step}
            key={step.id}
            layout
            variants={animateVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            dragControls={stepControls}
            dragListener={false}
          >
            <StepContainer stepIndex={stepIndex} dragControls={stepControls}>
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
                      <RowItems key={element[0].id} element={element}>
                        <Reorder.Group
                          axis="x"
                          values={element}
                          onReorder={(newOrder) => {
                            reorder({ newOrder, fieldIndex, stepIndex });
                          }}
                          className="w-full flex items-center justify-start gap-2"
                          tabIndex={-1}
                        >
                          {element.map((el, j) => (
                            <Reorder.Item
                              value={el}
                              key={el.id}
                              className="reorderItem"
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
                      </RowItems>
                    );
                  }
                  return (
                    <Reorder.Item
                      key={element.id}
                      value={element}
                      className="reorderItem"
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
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

//======================================
export function FormEdit() {
  const isMS = useFormBuilderStore((s) => s.isMS);
  const formElements = useFormBuilderStore((s) => s.formElements);
  const reorder = useFormBuilderStore((s) => s.reorder);
  switch (isMS) {
    case true:
      if (formElements.length === 0) {
        return <NoStepsPlaceholder />;
      }
      return <StepsWrapper />;
    default:
      return (
        <Reorder.Group
          axis="y"
          onReorder={(newOrder) => {
            reorder({ newOrder, fieldIndex: null });
          }}
          values={formElements as FormElementOrList[]}
          className="flex flex-col gap-3 rounded-lg px-3 md:px-4 lg:px-5 md:py-5 py-4 border-dashed border bg-muted"
          tabIndex={-1}
        >
          <AnimatePresence mode="sync">
            {(formElements as FormElementOrList[]).map((element, i) => {
              if (Array.isArray(element)) {
                return (
                  <RowItems element={element} key={element[0].id}>
                    <Reorder.Group
                      axis="x"
                      values={element}
                      onReorder={(newOrder) => {
                        reorder({ newOrder, fieldIndex: i });
                      }}
                      className="flex items-center justify-start gap-2 w-full"
                      tabIndex={-1}
                    >
                      {element.map((el, j) => (
                        <Reorder.Item
                          key={el.id}
                          value={el}
                          className="reorderItem"
                          variants={animateVariants}
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          layout
                          axis="x"
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
                  </RowItems>
                );
              }
              return (
                <Reorder.Item
                  key={element.id}
                  value={element}
                  className="reorderItem"
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
          </AnimatePresence>
        </Reorder.Group>
      );
  }
}
