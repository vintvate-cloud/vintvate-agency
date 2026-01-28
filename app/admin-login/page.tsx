'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (res?.error) {
                setError('Invalid credentials')
                setIsLoading(false)
            } else {
                router.push('/admin')
            }
        } catch (err) {
            console.log(err)
            setIsLoading(false)
        }
    }

    return (
        <>
            <style>{`
        nav, footer, .preloader { display: none !important; }
      `}</style>
            <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[var(--background)] overflow-hidden">
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                    <span className="font-anton text-[80vh] leading-none whitespace-nowrap text-[var(--foreground)] -rotate-12 origin-center">
                        ADMIN
                    </span>
                </div>

                {/* Back to Site Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-8 left-8"
                >
                    <Link
                        href="/"
                        className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center gap-2"
                    >
                        <span>←</span> Back to Site
                    </Link>
                </motion.div>

                {/* Login Form */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 w-full max-w-md px-8"
                >
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="font-anton text-6xl md:text-7xl tracking-tighter text-[var(--foreground)] uppercase"
                        >
                            Login
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="font-inter text-sm uppercase tracking-widest text-[var(--muted-foreground)] mt-4"
                        >
                            Admin Access Only
                        </motion.p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors placeholder:text-[var(--muted-foreground)]"
                                placeholder="admin@vintvate.com"
                                required
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)] mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-[var(--border)] py-3 font-inter text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none transition-colors placeholder:text-[var(--muted-foreground)]"
                                placeholder="••••••••"
                                required
                            />
                        </motion.div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 font-inter text-sm"
                            >
                                {error}
                            </motion.p>
                        )}

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-8 bg-[var(--foreground)] text-[var(--background)] py-4 font-inter text-sm uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-8 left-0 w-full text-center"
                >
                    <p className="font-inter text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                        © 2024 Vintvate Agency
                    </p>
                </motion.div>
            </div>
        </>
    )
}
