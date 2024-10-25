import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs'
import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { Talents } from '@/editor/character/[name]/skills/talents'
import { Passives } from '@/editor/character/[name]/skills/passives'
import { Constellations } from '@/editor/character/[name]/skills/constellations'

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
