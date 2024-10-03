import { ModeToggle } from '@/components/main/ThemeMenu'
import BlogForm from '@/features/blog/components/Form'

export default function Home() {
	return (
		<div>
			<div className="fixed top-4 right-4 z-50">
				<ModeToggle />
			</div>
			<main className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
				<h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
					AI Blog Generator
				</h1>
				<BlogForm />
			</main>
		</div>
	)
}
