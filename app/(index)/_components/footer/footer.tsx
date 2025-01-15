import Link from 'next/link'

export function Footer() {
  const YEAR = new Date().getFullYear()

  return (
    <footer className='bg-black text-gray-300 p-5 pt-12 rounded-tl-3xl rounded-tr-3xl'>
      <div className='max-w-6xl mx-auto flex flex-wrap justify-between gap-8'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold text-white mb-5'>Genshin Diary</h2>
          <p className='text-sm'>
            Tu web amigable para guías de Genshin Impact.
          </p>
          <p className='text-xs text-gray-400'>
            Este proyecto está hecho con fines educativos
          </p>
        </div>

        <div>
          <h3 className='text-lg font-semibold mb-4 text-white'>Enlaces</h3>
          <ul className='space-y-2'>
            <li>
              <Link
                href='/characters'
                className='hover:text-white transition-colors'
              >
                Personajes
              </Link>
            </li>
            <li>
              <Link
                href='/weapons'
                className='hover:text-white transition-colors'
              >
                Armas
              </Link>
            </li>
            <li>
              <Link
                href='/artifacts'
                className='hover:text-white transition-colors'
              >
                Artefactos
              </Link>
            </li>
            <li>
              <Link
                href='/materials'
                className='hover:text-white transition-colors'
              >
                Materiales
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className='mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center'>
        <div className='flex flex-col items-center md:items-start'>
          <p className='text-sm'>{YEAR} Genshin Diary.</p>
          <p className='text-xs text-gray-400 mt-1'>
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
            className='text-sm text-gray-400 hover:text-white transition-colors'
          >
            Políticas de privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
