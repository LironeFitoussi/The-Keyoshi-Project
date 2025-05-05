function BookImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[3/4] w-full sm:max-w-[200px] overflow-hidden sm:rounded-t-2xl mx-auto sm:mx-0 sm:rounded-t-none">
      <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
    </div>
  );
}

export default BookImage;
