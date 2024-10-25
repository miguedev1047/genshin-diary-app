import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TalentItemProps } from '@/editor/character/[name]/skills/talents/_components/talent-item/talent-item.type'
import { TalentForm as EditTalent } from '@/editor/character/[name]/skills/talents/_components/talent-form'
import { TalentDelete as DeleteTalent } from '@/editor/character/[name]/skills/talents/_components/talent-delete'
import { Separator } from '@/components/ui/separator'
import { SortableList } from '@/shared/components/sortable-list'
import { getSkillTypeText } from '@/features/utils/character-texts'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import parse from 'html-react-parser'

export function TalentItem(props: TalentItemProps) {
  const { title, id, description, image_url, type } = props
  const SKILL_TYPE = getSkillTypeText(type)

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <SortableList.DragHandle />
            <figure className='size-20 bg-main-muted rounded-lg p-3'>
              <Image
                src={image_url!}
                alt={title}
                width={200}
                height={200}
                className='size-full object-cover'
              />
            </figure>
          </div>

          <div className='w-full'>
            <article className='flex justify-between items-center gap-4'>
              <CardTitle>{title}</CardTitle>

              <div className='flex items-center gap-2'>
                <EditTalent id={id} />
                <DeleteTalent id={id} />
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
