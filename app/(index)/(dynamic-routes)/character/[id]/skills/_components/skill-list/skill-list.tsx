import { SkillItem } from '@/app/(index)/(dynamic-routes)/character/[id]/skills/_components/skill-item'
import { SkillListProps } from '@/app/(index)/(dynamic-routes)/character/[id]/skills/_components/skill-list/skill-list.type'
import { Title } from '@/components/ui/title'

export function SkillList(props: SkillListProps) {
  const { data: SKILLS } = props

  if (!SKILLS.length) {
    return (
      <Title className='text-center py-20 text-2xl opacity-70 font-extrabold uppercase'>
        No hay elementos para mostrar
      </Title>
    )
  }

  const MAPPED_SKILLS = SKILLS.map((skill) => (
    <li key={skill.id}>
      <SkillItem {...skill} />
    </li>
  ))

  return <ul className='grid gap-4'>{MAPPED_SKILLS}</ul>
}
