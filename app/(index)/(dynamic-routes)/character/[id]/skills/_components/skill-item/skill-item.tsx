import { getSkillTypeText } from '@/features/utils/character-texts'
import { SkillItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/skills/_components/skill-item/skill-item.type'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SquareBox } from '@/components/square-box'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import parse from 'html-react-parser'

export function SkillItem(props: SkillItemProps) {
  const { title, type, image_url, description } = props
  const SKILL_TYPE = getSkillTypeText(type)

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
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

          <div className='w-full space-y-2'>
            <CardTitle>{title}</CardTitle>
            <Badge>{SKILL_TYPE}</Badge>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='p-6'>{parse(description)}</CardContent>
    </Card>
  )
}
