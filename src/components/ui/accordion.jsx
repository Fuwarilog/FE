import * as React from "react";

export function Accordion({ children, className, collapsible, type, ...rest }) {
  return (
    <div className={`border border-gray-200 rounded-md ${className || ""}`} {...rest}>
      {children}
    </div>
  );
}

export function AccordionItem({ value, children, className, ...props }) {
  const [isOpen, setIsOpen] = React.useState(false);

  // children 내부에서 isOpen과 toggle을 전달해야 하므로 React.cloneElement 사용
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    // AccordionTrigger와 AccordionContent에 props 주입
    return React.cloneElement(child, {
      isOpen,
      toggle: () => setIsOpen((prev) => !prev),
    });
  });

  return (
    <div className={`border-b ${className || ""}`} {...props}>
      {enhancedChildren}
    </div>
  );
}


export function AccordionTrigger({ children, className, isOpen, toggle, ...rest }) {
  return (
    <button
      onClick={toggle}
      className={`flex w-full items-center justify-between p-4 font-medium transition-all hover:bg-gray-100 ${className || ""}`}
      {...rest}
    >
      <span>{children}</span>
      <span className="text-[17px]">{isOpen ? "▾" : "▸"}</span>
    </button>
  );
}

export function AccordionContent({ children, className, isOpen, toggle, ...rest }) {
  if (!isOpen) return null;

  return (
    <div className={`p-4 ${className || ""}`} {...rest}>
      {children}
    </div>
  );
}

