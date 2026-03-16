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

    const budget = parseFloat(formData.get('budget') as string || '0')
    const startDate = formData.get('startDate') ? new Date(formData.get('startDate') as string) : new Date()
    const endDate = formData.get('endDate') ? new Date(formData.get('endDate') as string) : null

    await prisma.project.create({
        data: {
            title,
            description,
            link: link || null,
            tags: tags || null,
            status: (formData.get('status') as string) || 'PLANNED',
            budget: budget,
            startDate: startDate,
            endDate: endDate,
            image: imagePath,
            envVars: formData.get('envVars') as string || null,
            clientId: formData.get('clientId') as string || null,
        }
    })

    revalidatePath('/admin/projects')
    revalidatePath('/admin/clients')
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

    const budget = parseFloat(formData.get('budget') as string || '0')
    const startDate = formData.get('startDate') ? new Date(formData.get('startDate') as string) : undefined
    const endDate = formData.get('endDate') ? new Date(formData.get('endDate') as string) : null

    await prisma.project.update({
        where: { id },
        data: {
            title,
            description,
            link: link || null,
            tags: tags || null,
            status: (formData.get('status') as string) || undefined,
            budget: budget,
            startDate: startDate,
            endDate: endDate,
            envVars: formData.get('envVars') as string || null,
            clientId: formData.get('clientId') as string || null,
            ...(imagePath && { image: imagePath })
        }
    })

    revalidatePath('/admin/projects')
    revalidatePath('/admin/clients')
    redirect('/admin/projects')
}

export async function createClient(formData: FormData) {
    await checkAdmin()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const notes = formData.get('notes') as string

    await prisma.clientProfile.create({
        data: { name, email, company, phone, notes }
    })

    revalidatePath('/admin/clients')
    redirect('/admin/clients')
}

export async function updateClient(id: string, formData: FormData) {
    await checkAdmin()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const company = formData.get('company') as string
    const phone = formData.get('phone') as string
    const notes = formData.get('notes') as string

    await prisma.clientProfile.update({
        where: { id },
        data: { name, email, company, phone, notes }
    })

    revalidatePath('/admin/clients')
    redirect('/admin/clients')
}

export async function deleteClient(id: string) {
    await checkAdmin()
    await prisma.clientProfile.delete({ where: { id } })
    revalidatePath('/admin/clients')
}

// Payment Actions
export async function addPayment(projectId: string, formData: FormData) {
    await checkAdmin()
    const amount = parseFloat(formData.get('amount') as string)
    const date = new Date(formData.get('date') as string)
    const description = formData.get('description') as string

    await prisma.payment.create({
        data: {
            amount,
            date,
            description,
            projectId
        }
    })

    revalidatePath('/admin/projects')
    revalidatePath('/admin/clients')
    revalidatePath(`/admin/projects/edit/${projectId}`)
}

export async function deletePayment(id: string, projectId: string) {
    await checkAdmin()
    await prisma.payment.delete({ where: { id } })
    revalidatePath(`/admin/projects/edit/${projectId}`)
}
