import { Tabs, TabsContent, TabsTrigger, TabsList } from '@/components/ui/tabs'
import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { Talents } from './talents'

export function Skills() {
  return (
    <EditorCard title='Habilidades'>
      <Tabs defaultValue='talents' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='talents'>Talentos</TabsTrigger>
          <TabsTrigger value='passives'>Pasivas</TabsTrigger>
          <TabsTrigger value='constellations'>Talentos</TabsTrigger>
        </TabsList>
        <TabsContent value='talents'>
          <Talents />
        </TabsContent>
        <TabsContent value='passives'>Pasivas</TabsContent>
        <TabsContent value='constellations'>Constelaciones</TabsContent>
      </Tabs>
    </EditorCard>
  )
}
