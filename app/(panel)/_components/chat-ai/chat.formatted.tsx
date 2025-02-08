import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

interface FormattedResponseProps {
  content: string
}

export function FormattedResponse({ content }: FormattedResponseProps) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
  )
}
