import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <div className="relative rounded-2xl overflow-hidden shadow-lg sm:mb-[14px] h-[420px] w-full">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    <div className="relative border border-[#eaeced] rounded-2xl h-full w-full">
      <ContentLoader
        speed={1}
        viewBox="0 0 360 460"
        backgroundColor="#eaeced"
        foregroundColor="#ffffff"
        className="w-full h-full"
      >
        <circle cx="180" cy="106" r="80" />
        <rect x="0" y="210" rx="5" ry="5" width="180" height="20" />
        <rect x="0" y="240" rx="5" ry="5" width="100%" height="20" />
        <rect x="0" y="270" rx="5" ry="5" width="150" height="30" />
        <rect x="0" y="340" rx="5" ry="5" width="50" height="20" />
        <rect x="0" y="370" rx="5" ry="5" width="110" height="20" />
        <rect
          x="calc(100% - 45px)"
          y="370"
          rx="5"
          ry="5"
          width="40"
          height="20"
        />
        <rect x="0" y="400" rx="16" ry="16" width="48%" height="45" />
        <rect x="52%" y="400" rx="16" ry="16" width="48%" height="45" />
      </ContentLoader>
    </div>
  </div>
);
