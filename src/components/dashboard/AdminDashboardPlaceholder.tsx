"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { LayoutDashboard, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AdminDashboardPlaceholder({ slug }: { slug: string }) {
    const { t } = useLanguage();
    const [gymReady, setGymReady] = useState(false);

    const checklistItems = [
        { id: 'plans', label: "Гишүүнчлэлийн төлөвлөгөө үүсгэх", completed: false, href: `/${slug}/app/admin/memberships` },
        { id: 'members', label: "Эхний гишүүнээ нэмэх", completed: false, href: `/${slug}/app/admin/members` },
        { id: 'payments', label: "Төлбөр баталгаажуулах", completed: false, href: `/${slug}/app/admin/payments` },
        { id: 'schedule', label: "Хичээлийн хуваарь гаргах", completed: false, href: `/${slug}/app/admin/classes` },
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black text-foreground italic uppercase tracking-tighter">
                    {t('dashboard')}
                </h1>
                <p className="text-foreground/40 font-bold uppercase tracking-widest text-[10px]">
                    {slug}.fit / System Management
                </p>
            </div>

            {!gymReady && (
                <div className="glass p-12 rounded-[50px] border border-primary/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />

                    <div className="max-w-2xl space-y-8 relative z-10">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-foreground italic uppercase tracking-tight">
                                Таны gym <span className="text-primary">бэлэн болоогүй</span> байна
                            </h2>
                            <p className="text-sm text-foreground/40 font-medium leading-relaxed">
                                Системийг бүрэн хүчин чадлаар нь ашиглахын тулд дараах тохиргоонуудыг хийх шаардлагатай.
                                Энэхүү checklist нь таныг хамгийн хурдан хугацаанд үйл ажиллагаагаа эхлүүлэхэд тусална.
                            </p>
                        </div>

                        <div className="grid gap-4 pt-4">
                            {checklistItems.map((item, index) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className="flex items-center justify-between p-6 bg-foreground/[0.03] border border-foreground/5 rounded-[30px] hover:border-primary/20 hover:bg-foreground/[0.05] transition-all group/item"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs ${item.completed ? 'bg-primary text-black' : 'bg-foreground/5 text-foreground/20 border border-foreground/10'}`}>
                                            {item.completed ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                                        </div>
                                        <span className={`text-sm font-bold uppercase tracking-widest ${item.completed ? 'text-foreground/40 line-through' : 'text-foreground'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover/item:opacity-100 -translate-x-4 group-hover/item:translate-x-0 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
