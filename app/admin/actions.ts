'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

async function checkAdmin() {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
        throw new Error('Unauthorized')
    }
}

export async function createBlog(formData: FormData) {
    await checkAdmin()

    const title = formData.get('title') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const author = formData.get('author') as string
    const image = formData.get('image') as string

    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    const existing = await prisma.blog.findUnique({ where: { slug } })
    if (existing) {
        slug = `${slug}-${Date.now()}`
    }

    await prisma.blog.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            author,
            image: image || null
        }
    })

    revalidatePath('/admin/blogs')
    redirect('/admin/blogs')
}

export async function createTeamMember(formData: FormData) {
    await checkAdmin()

    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const bio = formData.get('bio') as string
    const imageFile = formData.get('image') as File

    let imagePath = null;

    if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Dynamic imports to prevent Client Bundle errors
        const { promises: fs } = await import('fs')
        const path = (await import('path')).default

        const uploadDir = path.join(process.cwd(), 'public', 'uploads')

        try {
            await fs.access(uploadDir)
        } catch {
            await fs.mkdir(uploadDir, { recursive: true })
        }

        const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
        const filepath = path.join(uploadDir, filename)

        await fs.writeFile(filepath, buffer)
        imagePath = `/uploads/${filename}`
    }

    await prisma.team.create({
        data: {
            name,
            role,
            bio,
            image: imagePath
        }
    })

    revalidatePath('/admin/teams')
    redirect('/admin/teams')
}

export async function createProject(formData: FormData) {
    await checkAdmin()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const link = formData.get('link') as string
    const tags = formData.get('tags') as string
    const imageFile = formData.get('image') as File

    let imagePath = null;

    if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Dynamic imports to prevent Client Bundle errors
        const { promises: fs } = await import('fs')
        const path = (await import('path')).default

        const uploadDir = path.join(process.cwd(), 'public', 'uploads')

        try {
            await fs.access(uploadDir)
        } catch {
            await fs.mkdir(uploadDir, { recursive: true })
        }

        const filename = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
        const filepath = path.join(uploadDir, filename)

        await fs.writeFile(filepath, buffer)
        imagePath = `/uploads/${filename}`
    }

    await prisma.project.create({
        data: {
            title,
            description,
            link: link || null,
            tags: tags || null,
            image: imagePath
        }
    })

    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}

export async function deleteBlog(id: string) {
    await checkAdmin()
    await prisma.blog.delete({ where: { id } })
    revalidatePath('/admin/blogs')
}

export async function deleteTeamMember(id: string) {
    await checkAdmin()
    await prisma.team.delete({ where: { id } })
    revalidatePath('/admin/teams')
}

export async function deleteProject(id: string) {
    await checkAdmin()
    await prisma.project.delete({ where: { id } })
    revalidatePath('/admin/projects')
}
