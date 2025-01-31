import ContentLoader from 'react-content-loader'

export const Skeleton = () => (
  <div className='border grid grid-cols-4 sm:grid-cols-2 p-4 rounded-2xl border-secondareBgColor h-[420px]'>
    <ContentLoader
      speed={2}
      viewBox='0 0 300 400'
      backgroundColor='currentColor'
      foregroundColor='currentColor'
      className='text-gray-100 w-[310px] h-[400px] sm:w-[150] sm:h-[200]'
    >
      <rect x='0' y='20' rx='10' ry='10' width='300' height='150' />
      <rect x='0' y='190' rx='10' ry='10' width='300' height='23' />
      <rect x='0' y='220' rx='10' ry='10' width='300' height='80' />
      <rect x='0' y='310' rx='10' ry='10' width='300' height='30' />
      <rect x='0' y='350' rx='10' ry='10' width='300' height='40' />
    </ContentLoader>
  </div>
)
