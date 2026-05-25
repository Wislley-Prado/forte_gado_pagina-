type ProductBagProps = {
  compact?: boolean;
  imageUrl?: string;
};

export function ProductBag({ compact = false, imageUrl }: ProductBagProps) {
  // If imageUrl is custom (e.g. uploaded base64 or changed from default pasture), render the image beautifully.
  // The default pasture unsplash photo-1625246333195-78d9c38ad449 is a horizontal scenic photo, not a bag.
  const isCustomImage = imageUrl && !imageUrl.includes("photo-1625246333195-78d9c38ad449");

  if (isCustomImage) {
    return (
      <div
        className={`relative mx-auto ${compact ? "h-60 w-44" : "h-[380px] w-full max-w-[290px]"} flex items-center justify-center overflow-hidden rounded-2xl bg-transparent`}
        aria-label="Imagem do Produto"
      >
        <img
          src={imageUrl}
          alt="Imagem do Produto"
          className="max-h-full max-w-full object-contain drop-shadow-2xl transition duration-300 hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative mx-auto ${compact ? "h-72 w-48" : "h-[430px] w-[290px]"} rounded-t-[42px] rounded-b-2xl bg-[#F8F9FA] premium-shadow transition duration-300 hover:scale-[1.02]`}
      aria-label="Embalagem Fortegado Premium"
    >
      <div className="absolute inset-x-6 top-5 h-4 rounded-full bg-slate-200" />
      <div className="absolute inset-x-0 top-14 h-24 bg-[#0A3D91]" />
      <div className="absolute left-0 top-14 h-24 w-8 bg-[#082B63]" />
      <div className="absolute right-0 top-14 h-24 w-8 bg-[#082B63]" />
      <div className="absolute inset-x-7 top-24 rounded-md bg-[#F2B705] py-3 text-center text-xs font-black tracking-[0.28em] text-[#082B63]">
        PREMIUM
      </div>
      <div className="absolute inset-x-7 top-40 text-center">
        <div className="text-3xl font-black tracking-tight text-[#082B63]">FORTEGADO</div>
        <div className="mt-1 text-sm font-bold tracking-[0.28em] text-[#5E8C31]">MINERAL</div>
      </div>
      <div className="absolute inset-x-8 bottom-28 rounded-lg border border-[#0A3D91]/20 bg-white p-4 text-center">
        <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#0A3D91]">Alta performance</div>
        <div className="mt-2 text-4xl font-black text-[#F2B705]">25kg</div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-20 rounded-b-2xl bg-[#5E8C31]" />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-black uppercase tracking-[0.2em] text-white">
        Rebanho forte
      </div>
    </div>
  );
}
