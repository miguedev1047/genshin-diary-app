import { getSkillTypeText } from '@/features/utils/character-texts'
import { SkillItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/skills/_components/skill-item/skill-item.type'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SquareBox } from '@/components/square-box'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TiptapPreview } from '@/components/tiptap'
import Image from 'next/image'

export function SkillItem(props: SkillItemProps) {
  const { title, type, image_url, description } = props
  const SKILL_TYPE = getSkillTypeText(type)

  return (
    <Card>
      <CardHeader className='max-md:p-3'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <SquareBox className='bg-accent-foreground dark:bg-accent p-3'>
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
            <CardTitle className='text-base md:text-lg'>{title}</CardTitle>
            <Badge>{SKILL_TYPE}</Badge>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className='p-3 md:p-6'>
        <TiptapPreview content={description} />
      </CardContent>
    </Card>
  )
}
