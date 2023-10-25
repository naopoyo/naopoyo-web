import { HiCodeBracket } from 'react-icons/hi2'
import { SiGnubash, SiTypescript, SiTerraform } from 'react-icons/si'

export interface CodeBlockIconProps {
  language: string
}

export default function CodeBlockIcon({ language }: CodeBlockIconProps) {
  switch (language) {
    case 'sh':
    case 'bash':
      return <SiGnubash />
    case 'hcl':
      return <SiTerraform />
    case 'typescript':
      return <SiTypescript />
    default:
      return <HiCodeBracket />
  }
}
