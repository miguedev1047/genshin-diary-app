import Link from 'next/link'

export function Footer() {
  const YEAR = new Date().getFullYear()

  return (
    <footer className='w-full border shadow-sm'>
      <div className='max-w-6xl flex flex-col mx-auto p-5 pt-12'>
        <div className='flex flex-wrap justify-between gap-8'>
          <div className='space-y-2'>
            <h2 className='text-2xl font-bold mb-5'>Genshin Diary</h2>
            <p className='text-sm'>
              Tu web amigable para guías de Genshin Impact.
            </p>
            <p className='text-xs text-gray-400'>
              Este proyecto está hecho con fines educativos
            </p>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-4'>Enlaces</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/characters'
                  className='hover:underline transition-colors'
                >
                  Personajes
                </Link>
              </li>
              <li>
                <Link
                  href='/weapons'
                  className='hover:underline transition-colors'
                >
                  Armas
                </Link>
              </li>
              <li>
                <Link
                  href='/artifacts'
                  className='hover:underline transition-colors'
                >
                  Artefactos
                </Link>
              </li>
              <li>
                <Link
                  href='/materials'
                  className='hover:underline transition-colors'
                >
                  Materiales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-8 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <div className='flex flex-col items-center md:items-start'>
            <p className='text-sm'>{YEAR} Genshin Diary.</p>
            <p className='text-xs mt-1'>
              Developed by{' '}
              <Link
                href='https://github.com/miguedev1047'
                target='_blank'
                className='hover:underline transition duration-300 ease-in-out'
              >
                Miguel Angel
              </Link>
            </p>
          </div>
          <div className='flex items-center mt-4 md:mt-0'>
            <Link
              href='/privace-policy'
              className='text-sm hover:underline transition-colors'
            >
              Políticas de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
