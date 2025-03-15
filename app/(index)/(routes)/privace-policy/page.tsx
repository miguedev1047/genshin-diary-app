import { BorderBeam } from '@/components/magicui/border-beam'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DISCORD_USER } from '@/consts/misc'

export default function PrivacePolicyPage() {
  return (
    <section className='relative'>
      <Card className='relative overflow-clip'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold text-center'>
            Política de Privacidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <article className='prose lg:prose-lg mx-auto mb-8'>
            <p>
              Bienvenido a nuestra página de guías para <em>Genshin Impact</em>.
              Queremos asegurarnos de que comprendas cómo manejamos la
              información y el propósito de nuestro sitio. Por favor, lee
              detenidamente nuestra política de privacidad antes de interactuar
              con nuestro sitio.
            </p>

            <h2 className='text-2xl font-semibold mt-6'>
              1. Propósito del Sitio
            </h2>
            <p>
              Este sitio es exclusivamente informativo y tiene como objetivo
              proporcionar guías y consejos relacionados con el juego{' '}
              <em>Genshin Impact</em>. No estamos asociados, afiliados ni
              respaldados por HoYoverse. Todo el contenido aquí presentado es
              independiente y puede contener errores o imprecisiones.
            </p>

            <h2 className='text-2xl font-semibold mt-6'>
              2. Exactitud de la Información
            </h2>
            <p>
              Nos esforzamos por garantizar que la información publicada sea
              precisa y útil. Sin embargo, no podemos garantizar la exactitud de
              todos los datos y nos reservamos el derecho de corregir o
              actualizar el contenido en cualquier momento.
            </p>

            <h2 className='text-2xl font-semibold mt-6'>
              3. Consentimiento para el Ingreso de Datos
            </h2>
            <p>
              Cualquier dato que usted decida ingresar en nuestro sitio, como
              comentarios o sugerencias, lo hace bajo su propio consentimiento.
              No obligamos a nadie a proporcionar información personal. Usted es
              responsable de los datos que decide compartir con nosotros, y no
              nos hacemos responsables de cualquier consecuencia derivada de
              ello.
            </p>

            <h2 className='text-2xl font-semibold mt-6'>
              4. Recopilación de Información
            </h2>
            <p>
              Nuestro sitio no recopila automáticamente datos personales sin su
              consentimiento explícito. Si decidimos implementar funciones que
              requieran el ingreso de datos, como formularios, nos comprometemos
              a utilizar dicha información únicamente para el propósito
              especificado.
            </p>

            <h2 className='text-2xl font-semibold mt-6'>
              5. Responsabilidad por Datos Personales
            </h2>
            <p>
              No nos hacemos responsables por cualquier situación que pueda
              surgir debido al ingreso voluntario de datos personales en nuestro
              sitio. Recomendamos no compartir información sensible o privada en
              espacios públicos del sitio.
            </p>

            <h2 className='text-2xl font-semibold mt-6'>
              6. Propiedad Intelectual
            </h2>
            <p>
              Todo el contenido generado en esta página, incluidas imágenes,
              textos y guías, es propiedad de sus respectivos autores y
              colaboradores. <em>Genshin Impact</em> y todos los nombres,
              imágenes y materiales relacionados son propiedad intelectual de
              HoYoverse.
            </p>

            <h2 className='text-2xl font-semibold mt-6'>
              7. Modificaciones a esta Política
            </h2>
            <p>
              Nos reservamos el derecho de modificar esta política de privacidad
              en cualquier momento. Cualquier cambio será notificado en esta
              misma página.
            </p>

            <p className='mt-6'>
              Si tienes preguntas o inquietudes, contactame a mi discord{' '}
              <span className='font-bold'>{DISCORD_USER}</span>
            </p>
          </article>
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}
