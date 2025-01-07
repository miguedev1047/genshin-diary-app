import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs'
import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { Talents } from '@/app/(panel)/editor/character/[id]/skills/talents'
import { Passives } from '@/app/(panel)/editor/character/[id]/skills/passives'
import { Constellations } from '@/app/(panel)/editor/character/[id]/skills/constellations'

export function Skills() {
  return (
    <EditorCard title='Habilidades'>
      <Tabs
        defaultValue='talents'
        className='space-y-4'
      >
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
          <Talents />
        </TabsContent>
        <TabsContent value='passives'>
          <Passives />
        </TabsContent>
        <TabsContent value='constellations'>
          <Constellations />
        </TabsContent>
      </Tabs>
    </EditorCard>
  )
}
