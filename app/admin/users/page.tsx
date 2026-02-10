"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, CheckCircle, XCircle, ShieldAlert } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface User {
    id: string
    name: string
    email: string
    isPremium: boolean
    expiryDate: string | null
    createdAt: string
}

const ADMIN_EMAIL = "peteragak61@gmail.com"

export default function AdminDashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { toast } = useToast()

    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [processingId, setProcessingId] = useState<string | null>(null)

    useEffect(() => {
        if (status === "loading") return

        if (!session || session.user?.email !== ADMIN_EMAIL) {
            router.push("/") // Redirect unauthorized users
            return
        }

        fetchUsers()
    }, [session, status, router])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/admin/users")
            if (!res.ok) throw new Error("Failed to fetch users")
            const data = await res.json()
            setUsers(data.users)
        } catch (error) {
            toast({
                title: "Error",
                description: "Could not load users list",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleSubscription = async (userId: string, action: "grant" | "revoke") => {
        try {
            setProcessingId(userId)
            const res = await fetch("/api/admin/subscriptions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, action }),
            })

            if (!res.ok) throw new Error("Action failed")

            const data = await res.json()
            toast({
                title: "Success",
                description: data.message,
            })

            // Refresh list
            await fetchUsers()
        } catch (error) {
            toast({
                title: "Error",
                description: "Operation failed. Please try again.",
                variant: "destructive",
            })
        } finally {
            setProcessingId(null)
        }
    }

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (status === "loading" || loading) {
        return (
            <div className="flex bg-slate-50 items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                            <ShieldAlert className="h-8 w-8 text-emerald-600" />
                            Admin Dashboard
                        </h1>
                        <p className="text-slate-500 mt-1">Manage user subscriptions manually</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
                        <span className="text-sm font-medium text-slate-600">Logged in as: </span>
                        <span className="text-sm font-bold text-emerald-600">{session?.user?.email}</span>
                    </div>
                </div>

                <Card className="border-slate-200 shadow-lg">
                    <CardHeader className="bg-white border-b border-slate-100 pb-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <CardTitle className="text-xl text-slate-700 self-center">Registered Users ({users.length})</CardTitle>
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search by name or email..."
                                    className="pl-9 bg-slate-50 border-slate-200 focus:ring-emerald-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="rounded-md border-t border-slate-100">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow>
                                        <TableHead className="w-[200px]">User</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Expiry</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <TableRow key={user.id} className="hover:bg-slate-50 transition-colors">
                                                <TableCell className="font-medium">
                                                    <div className="flex flex-col">
                                                        <span className="text-slate-900">{user.name}</span>
                                                        <span className="text-xs text-slate-400">ID: {user.id.substring(0, 8)}...</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-slate-600">{user.email}</TableCell>
                                                <TableCell>
                                                    {user.isPremium ? (
                                                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200 shadow-none">
                                                            <CheckCircle className="w-3 h-3 mr-1" /> Premium
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="text-slate-500 border-slate-200 bg-slate-50">
                                                            Free Plan
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-sm text-slate-500">
                                                    {user.expiryDate ? new Date(user.expiryDate).toLocaleDateString() : "-"}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {user.isPremium ? (
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => handleSubscription(user.id, "revoke")}
                                                                disabled={processingId === user.id}
                                                            >
                                                                {processingId === user.id ? (
                                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <XCircle className="h-4 w-4 mr-1" /> Revoke
                                                                    </>
                                                                )}
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                                                size="sm"
                                                                onClick={() => handleSubscription(user.id, "grant")}
                                                                disabled={processingId === user.id}
                                                            >
                                                                {processingId === user.id ? (
                                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <CheckCircle className="h-4 w-4 mr-1" /> Make Premium
                                                                    </>
                                                                )}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
