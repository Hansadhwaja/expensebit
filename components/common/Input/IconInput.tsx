import { Input } from "@/components/ui/input"
import { LucideIcon } from "lucide-react"

interface Props {
  Icon: LucideIcon
  placeholder?: string
  defaultValue: string
  onChange: (v: string) => void
}

const IconInput = ({
  Icon,
  placeholder = "Search expenses...",
  defaultValue,
  onChange,
}: Props) => {
  return (
    <div className="relative">
      <Icon
        size={16}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        placeholder={placeholder}
        className="rounded-xl pl-9"
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default IconInput
