import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Rating, Typography } from '@mui/material'
import { Star } from '@mui/icons-material'

interface Review {
  profilePhoto: string
  name: string
  recomendation: boolean
  rating: number
  date: string
  comment: string
}

interface ReviewsProps {
  reviews: Review[]
  averageRating: string
}

export const Reviews = ({ reviews, averageRating }: ReviewsProps) => {
  return (
    <div className='w-full reviews sm:w-auto rounded-lg shadow-lg'>
      {reviews && reviews.length > 0 ? (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1-content'
            id='panel1-header'
          >
            <div className='flex gap-12 items-center sm:gap-6 w-full'>
              <h2 className='text-xl sm:text-lg font-semibold text-gray-800 flex items-center'>
                Reviews: {reviews.length}
              </h2>
              <div className='flex text-lg font-semibold text-gray-800 items-center gap-[4px]'>
                <p>Average rating:</p>
                <Star className='text-[orange]' sx={{ fontSize: '21px' }} />
                <p>{averageRating}</p>
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className='divide-y'>
              {reviews.map((review, index) => (
                <div key={index} className='py-4'>
                  <div className='flex justify-between items-start sm:items-center'>
                    <div className='flex items-center'>
                      <img
                        src={review.profilePhoto}
                        alt={review.name}
                        className='w-12 h-12 sm:w-10 sm:h-10 rounded-full border mr-4'
                      />
                      <div>
                        <Typography variant='body1' className='font-semibold'>
                          {review.name}
                        </Typography>
                        <Typography variant='body1' className='font-semibold'>
                          {review.recomendation ? (
                            <span className='text-green-600'>Рекомендует</span>
                          ) : (
                            <span className='text-red-600'>Не рекомендует</span>
                          )}
                        </Typography>
                      </div>
                    </div>
                    <div className='flex flex-col items-end gap-1'>
                      <Rating size='small' readOnly value={review.rating} />
                      <Typography
                        variant='body2'
                        className='text-gray-500 dark:text-gray-300'
                      >
                        {review.date}
                      </Typography>
                    </div>
                  </div>
                  <Typography
                    variant='body2'
                    className='text-gray-600 dark:text-gray-400 pl-16 sm:pl-[55px]'
                  >
                    {review.comment}
                  </Typography>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ) : (
        <Typography
          variant='body2'
          className='text-gray-600 dark:text-gray-400'
        >
          Нет отзывов.
        </Typography>
      )}
    </div>
  )
}
