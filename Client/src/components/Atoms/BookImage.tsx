

function BookImage({ src, alt }: { src: string; alt: string }) {
    return (
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-2xl">
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    );
  }

export default BookImage;