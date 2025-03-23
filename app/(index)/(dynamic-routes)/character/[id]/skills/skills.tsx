import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ViewCard } from '@/app/(index)/_components/view-card'
import { SkillsProps } from '@/app/(index)/(dynamic-routes)/character/[id]/skills/skills.type'
import { SkillList } from '@/app/(index)/(dynamic-routes)/character/[id]/skills/_components/skill-list'

export function Skills(props: SkillsProps) {
  const { data: SKILLS } = props

  const TALENTS = SKILLS.talents ?? []
  const PASSIVES = SKILLS.passives ?? []
  const CONSTELLATIONS = SKILLS.constellations ?? []

  return (
    <div className='col-span-2'>
      <ViewCard title='Habilidades'>
        <Tabs defaultValue='talents'>
          <TabsList className='grid grid-cols-3 gap-4 h-auto rounded-none border-b border-border bg-transparent p-0'>
            <TabsTrigger
              value='talents'
              className='relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary'
            >
              Talentos
            </TabsTrigger>
            <TabsTrigger
              value='passives'
              className='relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary'
            >
              Pasivas
            </TabsTrigger>
            <TabsTrigger
              value='constellations'
              className='relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary'
            >
              Constelaciones
            </TabsTrigger>
          </TabsList>
          <TabsContent value='talents'>
            <SkillList data={TALENTS} />
          </TabsContent>
          <TabsContent value='passives'>
            <SkillList data={PASSIVES} />
          </TabsContent>
          <TabsContent value='constellations'>
            <SkillList data={CONSTELLATIONS} />
          </TabsContent>
        </Tabs>
      </ViewCard>
    </div>
  )
}
