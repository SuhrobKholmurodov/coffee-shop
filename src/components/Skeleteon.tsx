import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
  <div className='relative rounded-2xl overflow-hidden shadow-lg sm:mb-[14px] h-[420px]'>
    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent' />
    <div className='relative z-10 border border-[#eaeced] rounded-2xl h-full'>
      <ContentLoader
        speed={1}
        viewBox='0 0 360 460'
        backgroundColor='#eaeced'
        foregroundColor='#ffffff'
        className='text-gray-100 w-[350px] sm:w-full h-[420px]'
      >
        <circle cx='180' cy='106' r='80' />
        <rect x='0' y='210' rx='5' ry='5' width='180' height='20' />
        <rect x='0' y='240' rx='5' ry='5' width='350' height='20' />
        <rect x='0' y='250' rx='5' ry='5' width='150' height='30' />
        <rect x='0' y='340' rx='5' ry='5' width='50' height='20' />
        <rect x='0' y='370' rx='5' ry='5' width='110' height='20' />
        <rect x='315' y='370' rx='5' ry='5' width='40' height='20' />
        <rect x='0' y='400' rx='16' ry='16' width='175' height='45' />
        <rect x='180' y='400' rx='16' ry='16' width='175' height='45' />
      </ContentLoader>
    </div>
  </div>
)
