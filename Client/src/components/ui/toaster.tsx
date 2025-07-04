interface ToasterProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  richColors?: boolean;
  closeButton?: boolean;
}

export function Toaster({ position = 'top-right', richColors = false, closeButton = false }: ToasterProps) {
  // Simple placeholder toaster component
  return (
    <div 
      className="toaster" 
      data-position={position}
      data-rich-colors={richColors}
      data-close-button={closeButton}
    />
  );
} 