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
    const imageFile = formData.get('image') as File

    let imagePath = null;

    if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const { uploadToCloudinary } = await import('@/lib/cloudinary')
        imagePath = await uploadToCloudinary(buffer, 'vintvate_blogs')
    }

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
            image: imagePath
        }
    })

    revalidatePath('/admin/blogs')
    redirect('/admin/blogs')
}

export async function updateBlog(id: string, formData: FormData) {
    await checkAdmin()

    const title = formData.get('title') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const author = formData.get('author') as string
    const imageFile = formData.get('image') as File

    let imagePath = undefined;

    if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const { uploadToCloudinary } = await import('@/lib/cloudinary')
        imagePath = await uploadToCloudinary(buffer, 'vintvate_blogs')
    }

    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    // Check if slug is taken by another blog
    const existing = await prisma.blog.findFirst({
        where: {
            slug,
            NOT: { id }
        }
    })
    if (existing) {
        slug = `${slug}-${Date.now()}`
    }

    await prisma.blog.update({
        where: { id },
        data: {
            title,
            slug,
            excerpt,
            content,
            author,
            ...(imagePath && { image: imagePath })
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

        const { uploadToCloudinary } = await import('@/lib/cloudinary')
        imagePath = await uploadToCloudinary(buffer, 'vintvate_team')
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

export async function updateTeamMember(id: string, formData: FormData) {
    await checkAdmin()

    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const bio = formData.get('bio') as string
    const imageFile = formData.get('image') as File

    let imagePath = undefined;

    if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const { uploadToCloudinary } = await import('@/lib/cloudinary')
        imagePath = await uploadToCloudinary(buffer, 'vintvate_team')
    }

    await prisma.team.update({
        where: { id },
        data: {
            name,
            role,
            bio,
            ...(imagePath && { image: imagePath })
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

        const { uploadToCloudinary } = await import('@/lib/cloudinary')
        imagePath = await uploadToCloudinary(buffer, 'vintvate_projects')
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

export async function updateProject(id: string, formData: FormData) {
    await checkAdmin()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const link = formData.get('link') as string
    const tags = formData.get('tags') as string
    const imageFile = formData.get('image') as File

    let imagePath = undefined;

    if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const { uploadToCloudinary } = await import('@/lib/cloudinary')
        imagePath = await uploadToCloudinary(buffer, 'vintvate_projects')
    }

    await prisma.project.update({
        where: { id },
        data: {
            title,
            description,
            link: link || null,
            tags: tags || null,
            ...(imagePath && { image: imagePath })
        }
    })

    revalidatePath('/admin/projects')
    redirect('/admin/projects')
}
