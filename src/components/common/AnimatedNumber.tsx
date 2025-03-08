import NumberFlow from '@number-flow/react'

type AnimatedNumberProps = {
  value: number
}

export const AnimatedNumber = ({ value }: AnimatedNumberProps) => {
  return (
    <NumberFlow
      value={value}
      format={{ useGrouping: false }}
    />
  )
}
