import { useState } from 'react'
import { MaterialDescriptionProps } from './material-description.type'
import parse from 'html-react-parser'
import { PARSE_OPTIONS } from '@/consts/misc'
import { cn } from '@/lib/utils'

const MAX_CHARS = 400

export function MaterialDescription(props: MaterialDescriptionProps) {
  const { description } = props
  const [viewMore, setViewMore] = useState(false)

  const MAX_DESC = description.length > MAX_CHARS

  const DESC = description
  const PARSE_DESC = parse(DESC, PARSE_OPTIONS)

  return (
    <div className='text-pretty opacity-70 max-w-[720px] w-full'>
      {MAX_DESC ? (
        <>
          <span className={cn(viewMore ? 'line-clamp-none' : 'line-clamp-3')}>
            {PARSE_DESC}
          </span>
          <p
            onClick={() => setViewMore(!viewMore)}
            className='text-blue-500 hover:underline'
          >
            {viewMore ? 'Ver menos' : 'Ver mas...'}
          </p>
        </>
      ) : (
        <span>{PARSE_DESC}</span>
      )}
    </div>
  )
}
