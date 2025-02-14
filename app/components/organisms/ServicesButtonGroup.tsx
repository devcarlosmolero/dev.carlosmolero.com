import { ChevronRight } from 'lucide-react'
import Button from '../atoms/Button'

export default function ServicesButtonGroup({ labels }: { labels: string[] }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {labels.map((label) => (
                <Button
                    variant="outline"
                    className="flex items-center gap-x-3"
                    key={label}
                    url={
                        'https://cal.com/devcarlosmolero/hire-me-meeting'
                    }
                    target={'_blank'}
                >
                    <p className="w-full text-start">{label}</p>
                    <ChevronRight className="size-4" />
                </Button>
            ))}
        </div>
    )
}
