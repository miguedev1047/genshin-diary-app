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
        <TabsList>
          <TabsTrigger value='talents'>Talentos</TabsTrigger>
          <TabsTrigger value='passives'>Pasivas</TabsTrigger>
          <TabsTrigger value='constellations'>Constelaciones</TabsTrigger>
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
