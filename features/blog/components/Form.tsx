'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const BlogForm = () => {
	const [topic, setTopic] = useState('')
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await fetch('/api/generateBlog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ topic })
			})

			if (!response.ok) {
				throw new Error('Failed to generate blog post')
			}

			const data = await response.json()
			router.push(`/blog?content=${encodeURIComponent(data.blog)}`)
		} catch (error) {
			console.error('Error:', error)

			router.push('/blog')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto shadow-lg transition-all duration-300 hover:shadow-xl">
			<CardHeader>
				<CardTitle className="text-2xl font-semibold">Generate a Blog Post</CardTitle>
				<CardDescription>Enter a topic and let AI create a blog post for you.</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						type="text"
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
						placeholder="Enter a topic"
						required
						className="transition-all duration-300 focus:ring-2 focus:ring-primary"
					/>
					<Button type="submit" disabled={loading} className="w-full transition-all duration-300 hover:bg-primary/90">
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Generating...
							</>
						) : (
							'Generate Blog'
						)}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}

export default BlogForm
