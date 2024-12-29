import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ConstellationForm as EditConstellation } from '@/app/(panel)/editor/character/[id]/skills/constellations/_components/constellation-form'
import { ConstellationDelete as DeleteConstellation } from '@/app/(panel)/editor/character/[id]/skills/constellations/_components/constellation-delete'
import { ConstellationItemProps } from '@/app/(panel)/editor/character/[id]/skills/constellations/_components/constellation-item/constellation-item.type'
import { getSkillTypeText } from '@/features/utils/character-texts'
import { SquareBox } from '@/components/square-box'
import Image from 'next/image'
import parse from 'html-react-parser'

export function ConstellationItem(props: ConstellationItemProps) {
  const { title, id, description, image_url, type } = props
  const SKILL_TYPE = getSkillTypeText(type)

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <SortableList.DragHandle />
            <SquareBox className='bg-main-muted dark:bg-accent p-3'>
              <Image
                src={image_url!}
                alt={title}
                width={200}
                height={200}
                className='size-full object-cover'
              />
            </SquareBox>
          </div>

          <div className='w-full'>
            <article className='flex justify-between items-center gap-4'>
              <CardTitle>{title}</CardTitle>

              <div className='flex items-center gap-2'>
                <EditConstellation id={id} />
                <DeleteConstellation id={id} />
              </div>
            </article>
            <Badge>{SKILL_TYPE}</Badge>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='p-6'>{parse(description)}</CardContent>
    </Card>
  )
}
