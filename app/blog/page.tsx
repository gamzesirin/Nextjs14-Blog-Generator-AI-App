'use client'

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
	const searchParams = useSearchParams()
	const content = searchParams.get('content')

	if (!content) {
		return (
			<div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
				<Card className="w-full max-w-3xl mx-auto shadow-lg">
					<CardContent className="p-6">
						<p className="text-center text-lg">Not created blog content.</p>
						<Link href="/" className="mt-4 block text-center">
							<Button variant="outline">
								<ArrowLeft className="mr-2 h-4 w-4" /> Go Back
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		)
	}

	const formatContent = (text: string) => {
		const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g)
		return parts.map((part, index) => {
			if (part.startsWith('**') && part.endsWith('**')) {
				const headerText = part.slice(2, -2)
				return (
					<h2 key={index} className="text-2xl font-bold mt-6 mb-4">
						{headerText}
					</h2>
				)
			} else if (part.startsWith('*') && part.endsWith('*')) {
				const italicText = part.slice(1, -1)
				return (
					<p key={index} className="mb-4 leading-relaxed">
						<i>{italicText}</i>
					</p>
				)
			}
			return (
				<p key={index} className="mb-4 leading-relaxed">
					{part}
				</p>
			)
		})
	}

	return (
		<main className="container mx-auto p-4 min-h-screen bg-gradient-to-b from-background to-secondary/20">
			<Card className="w-full max-w-3xl mx-auto shadow-lg transition-all duration-300 hover:shadow-xl">
				<CardHeader className="space-y-1">
					<CardTitle className="text-3xl font-bold">Generated Blog Post</CardTitle>
					<Link href="/" className="inline-block">
						<Button variant="ghost" size="sm">
							<ArrowLeft className="mr-2 h-4 w-4" /> Back to Generator
						</Button>
					</Link>
				</CardHeader>
				<CardContent className="prose dark:prose-invert max-w-none">{formatContent(content)}</CardContent>
			</Card>
		</main>
	)
}
