import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'El correo electrónico no es válido',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres',
  }),
})

export const AccountSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre es requerido',
  }),
  email: z.string().email({
    message: 'El correo electrónico no es válido',
  }),
  password: z.string().optional(),
  role: z.string().min(1, {
    message: 'El rol es requerido',
  }),
})

export const CharacterSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre del personaje es requerido.',
  }),
  profile_image_url: z.string().min(1, {
    message: 'La url de la imagen es requerida.',
  }),
  splash_art_url: z.string().min(1, {
    message: 'La url de la imagen es requerida.',
  }),
  description: z.string().min(3, {
    message: 'La descripción del personaje es requerida.',
  }),
  role: z.string({ message: 'El rol es requerido.' }).min(1, {
    message: 'El rol es requerido.',
  }),
  element: z.string({ message: 'El elemento es requerido.' }).min(1, {
    message: 'El elemento es requerido.',
  }),
  rarity: z.string({ message: 'La rareza es requerida.' }).min(1, {
    message: 'La rareza es requerida.',
  }),
  region: z.string({ message: 'La region es requerida.' }).min(1, {
    message: 'La region es requerida.',
  }),
  weapon: z.string({ message: 'El tipo de arma es requerida' }).min(1, {
    message: 'El tipo de arma es requerida.',
  }),
  attribute: z.string({ message: 'El atributo es requerido.' }).min(1, {
    message: 'El atributo es requerido.',
  }),
  is_public: z.boolean().optional(),
  is_new: z.boolean().optional(),
})

export const WeaponSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre de la arma es requerido.',
  }),
  image_url: z.string().min(1, {
    message: 'La url de la imagen es requerida.',
  }),
  passive_description: z.string().min(3, {
    message: 'La descripción de la arma es requerida.',
  }),
  min_base_attack: z
    .string({ message: 'El ataque minimo es requerido.' })
    .min(2, {
      message: 'El ataque minimo es requerido.',
    }),
  max_base_attack: z
    .string({ message: 'El ataque maximo es requerido.' })
    .min(2, {
      message: 'El ataque maximo es requerido.',
    }),
  min_secondary_stat_base: z
    .string({ message: 'La substat secundaria minima es requerida.' })
    .min(1, {
      message: 'La substat secundaria minima es requerida.',
    }),
  max_secondary_stat_base: z
    .string({ message: 'La substat base secundaria maxima es requerida.' })
    .min(1, {
      message: 'La substat base secundaria maxima es requerida.',
    }),
  secondary_stat: z
    .string({ message: 'La substat secundaria es requerida.' })
    .min(1, {
      message: 'La substat secundaria es requerida.',
    }),
  type: z.string({ message: 'El tipo del arma es requerida.' }).min(1, {
    message: 'El tipo del arma es requerida.',
  }),
  rarity: z.string({ message: 'La rareza es requerida.' }).min(1, {
    message: 'La rareza es requerida.',
  }),
})

export const CharacterSelectorSchema = z.object({
  characters: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Seleccione al menos un personaje.'),
})

export const WeaponAscensionSchema = z.object({
  ascension_level: z.string().min(1, 'La ascensión requerida.'),
  materials: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Seleccione al menos un material.'),
})

export const WeaponCharacterSchema = z.object({
  weapons: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Seleccione al menos una arma.'),
})

export const MaterialQuantitySchema = z.object({
  quantity: z.string().min(1, 'La cantidad es requerida.'),
})

export const MaterialSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre del material es requerido.',
  }),
  image_url: z.string().min(1, {
    message: 'La url de la imagen es requerida.',
  }),
  description: z.string().min(3, {
    message: 'La descripción del material es requerida.',
  }),
  type: z.string({ message: 'El tipo de material es requerido.' }).min(1, {
    message: 'El tipo de material es requerido.',
  }),
  rarity: z.string({ message: 'La rareza es requerida.' }).min(1, {
    message: 'La rareza es requerida.',
  }),
})

export const ArtifactSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre del artefacto es requerido.',
  }),
  image_url: z.string().min(1, {
    message: 'La url de la imagen es requerida.',
  }),
  rarity: z.string({ message: 'La rareza es requerida.' }).min(1, {
    message: 'La rareza es requerida.',
  }),
  bonus_description: z.string().min(3, {
    message: 'La descripción del artefacto es requerida.',
  }),
})

export const ArtifactCharacterSchema = z.object({
  artifacts: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Seleccione al menos un artefacto.'),
})

export const AscensionSchema = z.object({
  ascension_level: z.string().min(1, 'La ascensión requerida.'),
  materials: z
    .array(z.string().min(4))
    .min(1)
    .nonempty('Seleccione al menos un material.'),
})

export const TalentSchema = z.object({
  talent_level: z.string().min(1, 'El nivel es requerido.'),
  materials: z
    .array(z.string().min(1))
    .min(1)
    .nonempty('Seleccione al menos un material.'),
})

export const StatsPrioritySchema = z.object({
  sand_stat: z.string().min(1, 'La estadistica es requerida.'),
  globet_stat: z.string().min(1, 'La estadistica es requerida.'),
  circlet_stat: z.string().min(1, 'La estadistica es requerida.'),
  order_priority: z.string().min(1, 'La prioridad es requerida.'),
  character_id: z.string(),
})

export const VideoGuideSchema = z.object({
  youtuber_name: z.string().min(1, 'El nombre es requerido.'),
  youtuber_channel: z.string().min(1, 'El canal es requerido.'),
  embed_video_url: z.string().min(1, 'La url es requerida.'),
  character_id: z.string(),
})

export const TeamsCharacterSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre del equipo es requerido.',
  }),
  characters: z
    .array(z.string().min(1))
    .min(4)
    .nonempty('Seleccione al menos 4 personajes.'),
})

export const TeamNameSchema = z.object({
  name: z.string().min(3, {
    message: 'El nombre del equipo es requerido.',
  }),
})

export const SkillCharacterSchema = z.object({
  title: z.string().min(3, { message: 'El nombre de la habilidad es requerido.' }),
  description: z
    .string()
    .min(3, { message: 'La descripción de la habilidad es requerida.' }),
  image_url: z
    .string()
    .min(1, { message: 'La url de la imagen es requerida.' }),
  type: z.string({ message: 'El tipo de la habilidad es requerido.' }).min(1, {
    message: 'El tipo de la habilidad es requerido.',
  }),
  character_id: z.string(),
})

export const TierlistSchema = z.object({
  tier_category: z
    .string()
    .min(1, { message: 'La categoria del tier es requerida.' }),
})
