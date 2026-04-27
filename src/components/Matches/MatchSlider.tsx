import React, { FC } from 'react';
import 'swiper/css'
import MatchCard from 'components/Matches/MatchCard';
import { ScrollContainer } from 'components/core/ScrollContainer/ScrollContainer'
import { useResponsiveValue } from 'components/core/utils'
import { MatchSliderProps } from 'components/Matches/types'

const MatchSlider: FC<MatchSliderProps> = ({
  matches,
  uid,
}) => {


  const horizontal = useResponsiveValue({
    mobile: false,
    tablet: true,
    desktop: true
  })

  const scrollContainerConfig = {
    horizontal,
    contentContainerStyle: { paddingHorizontal: 8, gap: 8 }
  }
  return (
        <ScrollContainer {...scrollContainerConfig}>
          {matches.map((item, i) => (
            <MatchCard
              key={i}
              match={item}
              uid={uid}
            />
          ))}
        </ScrollContainer>
  )
}

export default MatchSlider
