import { BG_ELEMENT } from '@/consts/classes'
import { ElementProps } from '@/types/classes.type'

export function getElementBg(elementType: string) {
  const BG_STYLES = {
    backgroundImage: `url(${BG_ELEMENT[elementType as ElementProps]})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return BG_STYLES
}
