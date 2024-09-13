export function formattedName(name: string) {
    const TRIMMED_NAME = name.trim()
  
    const REGEX = /[\u0300-\u036f]/g
    const NORMALIZED_NAME = TRIMMED_NAME.normalize('NFD').replace(REGEX, '')
  
    const HYPHENATED_NAME = NORMALIZED_NAME.replaceAll('-', ' ')
    const [CAPITALIZED_NAME] = NORMALIZED_NAME.split('')
    const FORMATTED_NAME =
      CAPITALIZED_NAME.toUpperCase() + HYPHENATED_NAME.slice(1)
  
    return FORMATTED_NAME
  }
  
  export function formattedUrl(url: string | undefined) {
    if (!url) return
  
    const TRIMMED_URL = url.trim()
    const REGEX = /[\u0300-\u036f]/g
  
    const NORMALIZED_URL = TRIMMED_URL.normalize('NFD').replace(REGEX, '')
    const FORMATTED_URL = NORMALIZED_URL.replace(/\s+/g, '-').toLowerCase()
  
    return FORMATTED_URL
  }
  