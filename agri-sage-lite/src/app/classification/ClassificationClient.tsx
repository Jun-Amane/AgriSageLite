'use client'

import { useSearchParams } from 'next/navigation'
import MultimodalClassificationPage from '@/components/MultimodalClassificationPage'

export default function ClassificationClient() {
        const searchParams = useSearchParams()
        const type = searchParams ? searchParams.get('type') : null

        return <MultimodalClassificationPage classificationType={type} />
}
