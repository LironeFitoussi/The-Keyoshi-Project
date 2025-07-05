function BookImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div>
      <img src={src} alt={alt} className={`w-full h-full object-cover ${className ?? ''}`} />
    </div>
  );
}

export default BookImage;
