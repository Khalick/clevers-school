'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, BookOpen, Search, FileText, User, X, LogIn, LogOut, AlertCircle, CheckCircle } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

// Mobile User Sheet Component
const MobileUserSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/', redirect: true });
    };

    // Navigate programmatically to avoid race condition with Link unmounting
    const handleAuthNavigation = (path: string) => {
        router.push(path);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={onClose}
            />

            {/* Sheet */}
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 lg:hidden animate-slide-up shadow-2xl">
                {/* Handle */}
                <div className="flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                {/* Header */}
                <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {isAuthenticated ? 'My Account' : 'Welcome'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 pb-8 max-h-[60vh] overflow-y-auto">
                    {isAuthenticated ? (
                        <div className="space-y-4">
                            {/* User Info */}
                            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                    <span className="text-xl font-bold text-white">
                                        {session?.user?.name?.charAt(0) || 'U'}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{session?.user?.name}</p>
                                    <p className="text-sm text-gray-500">{session?.user?.email}</p>
                                </div>
                            </div>

                            {/* Subscription Status */}
                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                <div className="flex items-center gap-2 text-amber-600 mb-2">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="font-medium">Subscription</span>
                                </div>
                                <Link
                                    href="/subscribe"
                                    className="text-sm text-amber-700 underline"
                                    onClick={onClose}
                                >
                                    View subscription details →
                                </Link>
                            </div>

                            {/* Quick Links */}
                            <div className="grid grid-cols-2 gap-3">
                                <Link
                                    href="/profile"
                                    className="p-4 bg-gray-50 rounded-2xl text-center hover:bg-gray-100 transition-colors"
                                    onClick={onClose}
                                >
                                    <User className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">Profile</span>
                                </Link>
                                <Link
                                    href="/subscribe"
                                    className="p-4 bg-gray-50 rounded-2xl text-center hover:bg-gray-100 transition-colors"
                                    onClick={onClose}
                                >
                                    <CheckCircle className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                                    <span className="text-sm font-medium text-gray-700">Subscribe</span>
                                </Link>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-medium hover:bg-red-100 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Welcome Message */}
                            <div className="text-center py-4">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Join Clevers Schools
                                </h3>
                                <p className="text-gray-500">
                                    Access premium educational resources
                                </p>
                            </div>

                            {/* Auth Buttons */}
                            <button
                                onClick={() => handleAuthNavigation('/auth/signin')}
                                className="w-full flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                            >
                                <LogIn className="w-5 h-5" />
                                Sign In
                            </button>

                            <button
                                onClick={() => handleAuthNavigation('/auth/signup')}
                                className="w-full flex items-center justify-center gap-2 p-4 border-2 border-green-600 text-green-600 rounded-2xl font-medium hover:bg-green-50 transition-colors"
                            >
                                Create Account
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

// Main Bottom Navigation Component
const MobileBottomNav = () => {
    const pathname = usePathname();
    const [isUserSheetOpen, setIsUserSheetOpen] = useState(false);
    const { status } = useSession();
    const isAuthenticated = status === 'authenticated';

    const navItems = [
        { href: '/', icon: Home, label: 'Home' },
        { href: '/form1234-notes', icon: BookOpen, label: 'Notes' },
        { href: '/kcse', icon: FileText, label: 'KCSE' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Bottom Navigation - Mobile Only */}
            <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
                {/* Glass Background */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-lg border-t border-gray-200" />

                {/* Navigation Items */}
                <div className="relative flex items-center justify-around px-2 py-2 pb-safe">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-2xl transition-all ${active
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className={`w-6 h-6 ${active ? 'text-green-600' : ''}`} />
                                <span className={`text-xs mt-1 font-medium ${active ? 'text-green-700' : ''}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}

                    {/* Search Button */}
                    <Link
                        href="/#search"
                        className="flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-2xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
                    >
                        <Search className="w-6 h-6" />
                        <span className="text-xs mt-1 font-medium">Search</span>
                    </Link>

                    {/* Profile Button */}
                    <button
                        onClick={() => setIsUserSheetOpen(true)}
                        className={`flex flex-col items-center justify-center min-w-[64px] py-2 px-3 rounded-2xl transition-all ${isUserSheetOpen
                            ? 'bg-green-100 text-green-700'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <div className="relative">
                            <User className={`w-6 h-6 ${isUserSheetOpen ? 'text-green-600' : ''}`} />
                            {isAuthenticated && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                            )}
                        </div>
                        <span className={`text-xs mt-1 font-medium ${isUserSheetOpen ? 'text-green-700' : ''}`}>
                            {isAuthenticated ? 'Account' : 'Login'}
                        </span>
                    </button>
                </div>
            </nav>

            {/* User Sheet */}
            <MobileUserSheet
                isOpen={isUserSheetOpen}
                onClose={() => setIsUserSheetOpen(false)}
            />
        </>
    );
};

export default MobileBottomNav;
