"use client";

import {
    Activity,
    AlertTriangle,
    BadgeCheck,
    Bell,
    Building2,
    Calendar,
    CalendarCheck,
    Check,
    Clock,
    CreditCard,
    Download,
    Dumbbell,
    Filter,
    MapPin,
    Plus,
    QrCode,
    ReceiptText,
    ScanLine,
    Search,
    Settings,
    ShieldCheck,
    SlidersHorizontal,
    UserPlus,
    Users,
    WalletCards,
    X,
    type LucideIcon,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

type SectionKey = "members" | "payments" | "classes" | "attendance" | "settings" | "memberships";
type IconKey =
    | "activity"
    | "alert"
    | "badge"
    | "bell"
    | "building"
    | "calendar"
    | "calendarCheck"
    | "check"
    | "clock"
    | "creditCard"
    | "currency"
    | "download"
    | "dumbbell"
    | "filter"
    | "mapPin"
    | "plus"
    | "qr"
    | "receipt"
    | "scan"
    | "search"
    | "settings"
    | "shield"
    | "sliders"
    | "userPlus"
    | "users"
    | "wallet";

type Summary = {
    label: string;
    value: string;
    detail: string;
    icon: IconKey;
    tone: "primary" | "secondary" | "accent" | "success" | "warning";
};

type Action = {
    label: string;
    icon: IconKey;
    variant?: "primary" | "secondary";
};

type Column = {
    key: string;
    label: string;
};

type Row = Record<string, string>;
type DialogMode = "create" | "details";

type SectionConfig = {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    primaryPanelTitle: string;
    secondaryPanelTitle: string;
    summaries: Summary[];
    actions: Action[];
    columns: Column[];
    rows: Row[];
    sideItems: { label: string; value: string; icon: IconKey }[];
};

const icons: Record<IconKey, LucideIcon> = {
    activity: Activity,
    alert: AlertTriangle,
    badge: BadgeCheck,
    bell: Bell,
    building: Building2,
    calendar: Calendar,
    calendarCheck: CalendarCheck,
    check: Check,
    clock: Clock,
    creditCard: CreditCard,
    currency: CreditCard,
    download: Download,
    dumbbell: Dumbbell,
    filter: Filter,
    mapPin: MapPin,
    plus: Plus,
    qr: QrCode,
    receipt: ReceiptText,
    scan: ScanLine,
    search: Search,
    settings: Settings,
    shield: ShieldCheck,
    sliders: SlidersHorizontal,
    userPlus: UserPlus,
    users: Users,
    wallet: WalletCards,
};

const toneStyles: Record<Summary["tone"], string> = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
};

const actionText: Record<"MGL" | "ENG", {
    cancel: string;
    close: string;
    details: string;
    download: string;
    empty: string;
    filter: string;
    noChanges: string;
    saved: string;
    submit: string;
}> = {
    MGL: {
        cancel: "Цуцлах",
        close: "Хаах",
        details: "Дэлгэрэнгүй мэдээлэл",
        download: "Тайлан татагдлаа.",
        empty: "Илэрц олдсонгүй",
        filter: "Жагсаалт шүүгдлээ.",
        noChanges: "Одоогоор хадгалах өөрчлөлт алга.",
        saved: "Өөрчлөлт хадгалагдлаа.",
        submit: "Хадгалах",
    },
    ENG: {
        cancel: "Cancel",
        close: "Close",
        details: "Details",
        download: "Report downloaded",
        empty: "No results found",
        filter: "Filter applied",
        noChanges: "No unsaved changes right now.",
        saved: "Saved successfully",
        submit: "Submit",
    },
};

function buildDraftRow(section: SectionKey, columns: Column[], language: "MGL" | "ENG") {
    const isEng = language === "ENG";

    const drafts: Record<SectionKey, Row> = {
        members: {
            name: isEng ? "New Member" : "Шинэ гишүүн",
            phone: "9900-0000",
            plan: isEng ? "Basic 1 mo" : "Basic 1 сар",
            until: "2026.07.23",
            status: isEng ? "Active" : "Идэвхтэй",
        },
        payments: {
            receipt: `FIT-${Math.floor(3000 + Math.random() * 900)}`,
            member: isEng ? "New Member" : "Шинэ гишүүн",
            method: "QPay",
            amount: isEng ? "120,000 MNT" : "120,000₮",
            status: isEng ? "Review" : "Шалгах",
        },
        classes: {
            time: "17:30",
            className: isEng ? "Open Gym" : "Нээлттэй заал",
            trainer: isEng ? "Staff" : "Ажилтан",
            room: isEng ? "Room A" : "A заал",
            fill: "0/20",
        },
        attendance: {
            time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
            member: isEng ? "New Member" : "Шинэ гишүүн",
            type: isEng ? "Entry" : "Оролт",
            className: isEng ? "Open gym" : "Нээлттэй заал",
            method: "QR",
        },
        settings: {
            setting: isEng ? "Notification rule" : "Мэдэгдлийн дүрэм",
            value: isEng ? "Enabled" : "Идэвхтэй",
            owner: isEng ? "System" : "Систем",
            status: isEng ? "Active" : "Идэвхтэй",
        },
        memberships: {
            plan: isEng ? "Starter" : "Starter",
            duration: isEng ? "30 days" : "30 хоног",
            sessions: isEng ? "Unlimited" : "Хязгааргүй",
            price: isEng ? "99,000 MNT" : "99,000₮",
            status: isEng ? "Active" : "Идэвхтэй",
        },
    };

    return columns.reduce<Row>((row, column) => {
        row[column.key] = drafts[section][column.key] ?? "";
        return row;
    }, {});
}

function downloadRows(filename: string, columns: Column[], rows: Row[]) {
    const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const csv = [
        columns.map((column) => escapeCsv(column.label)).join(","),
        ...rows.map((row) => columns.map((column) => escapeCsv(row[column.key] ?? "")).join(",")),
    ].join("\n");

    const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

const content: Record<"MGL" | "ENG", Record<SectionKey, SectionConfig>> = {
    MGL: {
        members: {
            title: "Гишүүд",
            subtitle: "Гишүүний бүртгэл, эрхийн хугацаа, сунгалтыг нэг дор хянаж удирдана.",
            searchPlaceholder: "Нэр, утас, гишүүнчлэлийн багцаар хайх",
            primaryPanelTitle: "Бүртгэлтэй гишүүд",
            secondaryPanelTitle: "Өнөөдрийн анхаарах зүйлс",
            actions: [
                { label: "Гишүүн бүртгэх", icon: "userPlus", variant: "primary" },
                { label: "Жагсаалт шүүх", icon: "filter" },
            ],
            summaries: [
                { label: "Идэвхтэй гишүүн", value: "1,284", detail: "+18 энэ долоо хоногт", icon: "users", tone: "primary" },
                { label: "Эрх дуусах гэж буй", value: "32", detail: "7 хоногийн дотор", icon: "clock", tone: "warning" },
                { label: "Өнөөдөр нэмэгдсэн", value: "14", detail: "шинэ гишүүн", icon: "userPlus", tone: "success" },
            ],
            columns: [
                { key: "name", label: "Нэр" },
                { key: "phone", label: "Утас" },
                { key: "plan", label: "Гишүүнчлэл" },
                { key: "until", label: "Дуусах өдөр" },
                { key: "status", label: "Төлөв" },
            ],
            rows: [
                { name: "Б. Анударь", phone: "9911-2456", plan: "Premium 3 сар", until: "2026.07.18", status: "Идэвхтэй" },
                { name: "Г. Тэмүүлэн", phone: "8800-6412", plan: "Basic 1 сар", until: "2026.06.29", status: "Сунгах" },
                { name: "Э. Номин", phone: "9904-3311", plan: "Pro 6 сар", until: "2026.09.02", status: "Идэвхтэй" },
            ],
            sideItems: [
                { label: "Сунгалтын сануулга илгээх", value: "32", icon: "bell" },
                { label: "Багц холбоогүй шинэ гишүүн", value: "5", icon: "badge" },
                { label: "Утас баталгаажаагүй", value: "8", icon: "alert" },
            ],
        },
        payments: {
            title: "Төлбөрийн удирдлага",
            subtitle: "Гишүүний төлбөр, орлого, баталгаажуулалт болон төлбөрийн төлөвийг нэг дороос удирдана.",
            searchPlaceholder: "Гишүүн, баримтын дугаар эсвэл төлбөрөөр хайх",
            primaryPanelTitle: "Төлбөрийн жагсаалт",
            secondaryPanelTitle: "Анхаарах зүйлс",
            actions: [
                { label: "+ Төлбөр бүртгэх", icon: "creditCard", variant: "primary" },
                { label: "Тайлан экспортлох", icon: "download" },
            ],
            summaries: [
                { label: "Өнөөдрийн орлого", value: "₮3.8M", detail: "+12% өчигдрөөс", icon: "currency", tone: "primary" },
                { label: "Хүлээгдэж буй төлбөр", value: "14", detail: "Баталгаажуулалт хүлээж байна", icon: "clock", tone: "warning" },
                { label: "Баталгаажсан төлбөр", value: "46", detail: "Өнөөдөр", icon: "check", tone: "success" },
            ],
            columns: [
                { key: "receipt", label: "Баримтын №" },
                { key: "member", label: "Гишүүн" },
                { key: "method", label: "Төлбөрийн төрөл" },
                { key: "amount", label: "Төлсөн дүн" },
                { key: "status", label: "Төлөв" },
            ],
            rows: [
                { receipt: "FIT-2041", member: "Б. Анударь", method: "QPay", amount: "180,000₮", status: "Баталгаажсан" },
                { receipt: "FIT-2040", member: "Г. Тэмүүлэн", method: "Банк", amount: "120,000₮", status: "Хүлээгдэж байна" },
                { receipt: "FIT-2039", member: "Э. Номин", method: "Бэлэн", amount: "420,000₮", status: "Баталгаажсан" },
            ],
            sideItems: [
                { label: "Банкны төлбөр тулгах шаардлагатай", value: "9", icon: "receipt" },
                { label: "QPay баталгаажуулах төлбөр", value: "3", icon: "wallet" },
                { label: "Буцаалтын хүсэлт", value: "2", icon: "alert" },
            ],
        },
        classes: {
            title: "Хичээлийн хуваарь",
            subtitle: "Хичээл, багш, заалны багтаамж болон захиалгын дүүргэлтийг удирдана.",
            searchPlaceholder: "Хичээл, багш, заалаар хайх",
            primaryPanelTitle: "Өнөөдрийн хичээлүүд",
            secondaryPanelTitle: "Хуваарийн анхаарах зүйлс",
            actions: [
                { label: "Хичээл бүртгэх", icon: "plus", variant: "primary" },
                { label: "Хуваарь шүүх", icon: "calendar" },
            ],
            summaries: [
                { label: "Өнөөдрийн хичээл", value: "12", detail: "3 зааланд", icon: "calendar", tone: "primary" },
                { label: "Дундаж дүүргэлт", value: "82%", detail: "+6% энэ 7 хоногт", icon: "calendarCheck", tone: "success" },
                { label: "Сул суудал", value: "48", detail: "оройн цагууд", icon: "dumbbell", tone: "accent" },
            ],
            columns: [
                { key: "time", label: "Цаг" },
                { key: "className", label: "Хичээл" },
                { key: "trainer", label: "Багш" },
                { key: "room", label: "Заал" },
                { key: "fill", label: "Дүүргэлт" },
            ],
            rows: [
                { time: "18:30", className: "Сунгалт", trainer: "Б. Түвшин", room: "A заал", fill: "21/24" },
                { time: "19:15", className: "Yoga Flow", trainer: "С. Мишээл", room: "B заал", fill: "16/20" },
                { time: "20:00", className: "HIIT", trainer: "Д. Саруул", room: "A заал", fill: "24/24" },
            ],
            sideItems: [
                { label: "Багш солих шаардлагатай", value: "1", icon: "alert" },
                { label: "Дүүрсэн хичээл", value: "3", icon: "check" },
                { label: "Шинэ захиалга орсон", value: "27", icon: "calendarCheck" },
            ],
        },
        attendance: {
            title: "Ирц бүртгэл",
            subtitle: "QR уншуулсан болон гараар бүртгэсэн оролт, хичээлийн ирцийг хянана.",
            searchPlaceholder: "Гишүүн, хичээл, бүртгэлийн аргаар хайх",
            primaryPanelTitle: "Сүүлд бүртгэгдсэн ирц",
            secondaryPanelTitle: "Ирцийн төхөөрөмжүүд",
            actions: [
                { label: "QR уншуулах", icon: "qr", variant: "primary" },
                { label: "Гараар ирц бүртгэх", icon: "scan" },
            ],
            summaries: [
                { label: "Өнөөдрийн ирц", value: "216", detail: "09:00 цагаас хойш", icon: "scan", tone: "primary" },
                { label: "Хичээлээр бүртгэгдсэн", value: "88", detail: "5 хичээлээр", icon: "activity", tone: "accent" },
                { label: "Гараар нэмсэн", value: "11", detail: "админ баталгаажуулсан", icon: "badge", tone: "warning" },
            ],
            columns: [
                { key: "time", label: "Цаг" },
                { key: "member", label: "Гишүүн" },
                { key: "type", label: "Бүртгэл" },
                { key: "className", label: "Хичээл" },
                { key: "method", label: "Арга" },
            ],
            rows: [
                { time: "12:06", member: "Б. Анударь", type: "Оролт", className: "Нээлттэй заал", method: "QR" },
                { time: "11:58", member: "Г. Тэмүүлэн", type: "Хичээл", className: "Сунгалт", method: "QR" },
                { time: "11:44", member: "Э. Номин", type: "Оролт", className: "Нээлттэй заал", method: "Гараар" },
            ],
            sideItems: [
                { label: "QR уншигч идэвхтэй", value: "2", icon: "qr" },
                { label: "Гараагүй гишүүд", value: "34", icon: "clock" },
                { label: "Давхар уншилт шалгах", value: "4", icon: "alert" },
            ],
        },
        settings: {
            title: "Байгууллагын тохиргоо",
            subtitle: "Байгууллагын мэдээлэл, салбар, ажилтны эрх, мэдэгдлийн дүрмийг удирдана.",
            searchPlaceholder: "Тохиргоо, салбар, эрхээр хайх",
            primaryPanelTitle: "Тохиргооны жагсаалт",
            secondaryPanelTitle: "Системийн хяналт",
            actions: [
                { label: "Өөрчлөлт хадгалах", icon: "check", variant: "primary" },
                { label: "Тохиргоо харах", icon: "sliders" },
            ],
            summaries: [
                { label: "Салбар", value: "2", detail: "идэвхтэй байршил", icon: "building", tone: "primary" },
                { label: "Ажилтан", value: "18", detail: "эрхийн түвшинтэй", icon: "shield", tone: "success" },
                { label: "Мэдэгдлийн дүрэм", value: "6", detail: "идэвхтэй", icon: "bell", tone: "accent" },
            ],
            columns: [
                { key: "setting", label: "Тохиргоо" },
                { key: "value", label: "Одоогийн утга" },
                { key: "owner", label: "Хариуцагч" },
                { key: "status", label: "Төлөв" },
            ],
            rows: [
                { setting: "Байгууллагын нэр", value: "goku-gym", owner: "Админ", status: "Идэвхтэй" },
                { setting: "Төв салбар", value: "Main location", owner: "Менежер", status: "Идэвхтэй" },
                { setting: "Сунгалтын сануулга", value: "7 хоногийн өмнө", owner: "Систем", status: "Идэвхтэй" },
            ],
            sideItems: [
                { label: "Админ эрхтэй хэрэглэгч", value: "3", icon: "shield" },
                { label: "Салбарын цагийн хуваарь", value: "2", icon: "clock" },
                { label: "Төлбөрийн холболт", value: "QPay", icon: "wallet" },
            ],
        },
        memberships: {
            title: "Гишүүнчлэлийн багц",
            subtitle: "Үнийн багц, хугацаа, эрхийн нөхцөлийг тохируулж борлуулалтад ашиглана.",
            searchPlaceholder: "Багц, үнэ, хугацаагаар хайх",
            primaryPanelTitle: "Багцын жагсаалт",
            secondaryPanelTitle: "Борлуулалтын тойм",
            actions: [
                { label: "Багц нэмэх", icon: "plus", variant: "primary" },
                { label: "Тохиргоо", icon: "settings" },
            ],
            summaries: [
                { label: "Идэвхтэй багц", value: "6", detail: "борлуулалтад нээлттэй", icon: "badge", tone: "primary" },
                { label: "Дундаж үнэ", value: "190K", detail: "сарын багц", icon: "currency", tone: "success" },
                { label: "Хамгийн эрэлттэй", value: "Pro", detail: "42% борлуулалт", icon: "activity", tone: "accent" },
            ],
            columns: [
                { key: "plan", label: "Багц" },
                { key: "duration", label: "Хугацаа" },
                { key: "sessions", label: "Эрх" },
                { key: "price", label: "Үнэ" },
                { key: "status", label: "Төлөв" },
            ],
            rows: [
                { plan: "Basic", duration: "30 хоног", sessions: "Хязгааргүй", price: "120,000₮", status: "Идэвхтэй" },
                { plan: "Pro", duration: "90 хоног", sessions: "Хязгааргүй", price: "320,000₮", status: "Идэвхтэй" },
                { plan: "Premium", duration: "180 хоног", sessions: "Хязгааргүй", price: "590,000₮", status: "Идэвхтэй" },
            ],
            sideItems: [
                { label: "Шинэ гишүүнд санал болгох", value: "Pro", icon: "badge" },
                { label: "Дууссан багц архивлах", value: "1", icon: "alert" },
                { label: "QPay дээр үнэ шинэчлэх", value: "0", icon: "wallet" },
            ],
        },
    },
    ENG: {
        members: {
            title: "Members",
            subtitle: "Track member records, access windows, and renewal status in one workspace.",
            searchPlaceholder: "Search by name, phone, or plan",
            primaryPanelTitle: "Member List",
            secondaryPanelTitle: "Today's Follow-up",
            actions: [
                { label: "New Member", icon: "userPlus", variant: "primary" },
                { label: "Filter", icon: "filter" },
            ],
            summaries: [
                { label: "Active", value: "1,284", detail: "+18 this week", icon: "users", tone: "primary" },
                { label: "Expiring Soon", value: "32", detail: "within 7 days", icon: "clock", tone: "warning" },
                { label: "New Signups", value: "14", detail: "today", icon: "userPlus", tone: "success" },
            ],
            columns: [
                { key: "name", label: "Name" },
                { key: "phone", label: "Phone" },
                { key: "plan", label: "Plan" },
                { key: "until", label: "Ends" },
                { key: "status", label: "Status" },
            ],
            rows: [
                { name: "B. Anudari", phone: "9911-2456", plan: "Premium 3 mo", until: "2026.07.18", status: "Active" },
                { name: "G. Temuulen", phone: "8800-6412", plan: "Basic 1 mo", until: "2026.06.29", status: "Renew" },
                { name: "E. Nomin", phone: "9904-3311", plan: "Pro 6 mo", until: "2026.09.02", status: "Active" },
            ],
            sideItems: [
                { label: "Renewal reminders", value: "32", icon: "bell" },
                { label: "Plan assignment needed", value: "5", icon: "badge" },
                { label: "Unverified phones", value: "8", icon: "alert" },
            ],
        },
        payments: {
            title: "Payments",
            subtitle: "Monitor daily revenue, payment status, and approval queues.",
            searchPlaceholder: "Search receipts, members, or methods",
            primaryPanelTitle: "Payment Transactions",
            secondaryPanelTitle: "Approval Queue",
            actions: [
                { label: "Record Payment", icon: "creditCard", variant: "primary" },
                { label: "Export", icon: "download" },
            ],
            summaries: [
                { label: "Daily Revenue", value: "3.8M", detail: "+12% from yesterday", icon: "currency", tone: "primary" },
                { label: "Pending", value: "14", detail: "bank and QPay", icon: "clock", tone: "warning" },
                { label: "Approved", value: "46", detail: "today", icon: "check", tone: "success" },
            ],
            columns: [
                { key: "receipt", label: "Receipt" },
                { key: "member", label: "Member" },
                { key: "method", label: "Method" },
                { key: "amount", label: "Amount" },
                { key: "status", label: "Status" },
            ],
            rows: [
                { receipt: "FIT-2041", member: "B. Anudari", method: "QPay", amount: "180,000 MNT", status: "Paid" },
                { receipt: "FIT-2040", member: "G. Temuulen", method: "Bank", amount: "120,000 MNT", status: "Review" },
                { receipt: "FIT-2039", member: "E. Nomin", method: "Cash", amount: "420,000 MNT", status: "Paid" },
            ],
            sideItems: [
                { label: "Bank transfers to match", value: "9", icon: "receipt" },
                { label: "QPay callbacks pending", value: "3", icon: "wallet" },
                { label: "Refund requests", value: "2", icon: "alert" },
            ],
        },
        classes: {
            title: "Classes",
            subtitle: "Manage schedule, trainers, room capacity, and booking fill.",
            searchPlaceholder: "Search class, trainer, or room",
            primaryPanelTitle: "Today's Schedule",
            secondaryPanelTitle: "Schedule Control",
            actions: [
                { label: "Add Class", icon: "plus", variant: "primary" },
                { label: "Filter Schedule", icon: "calendar" },
            ],
            summaries: [
                { label: "Classes Today", value: "12", detail: "across 3 rooms", icon: "calendar", tone: "primary" },
                { label: "Average Fill", value: "82%", detail: "+6% this week", icon: "calendarCheck", tone: "success" },
                { label: "Open Seats", value: "48", detail: "evening slots", icon: "dumbbell", tone: "accent" },
            ],
            columns: [
                { key: "time", label: "Time" },
                { key: "className", label: "Class" },
                { key: "trainer", label: "Trainer" },
                { key: "room", label: "Room" },
                { key: "fill", label: "Fill" },
            ],
            rows: [
                { time: "18:30", className: "Сунгалт", trainer: "B. Tuvshin", room: "Room A", fill: "21/24" },
                { time: "19:15", className: "Yoga Flow", trainer: "S. Misheel", room: "Room B", fill: "16/20" },
                { time: "20:00", className: "HIIT", trainer: "D. Saruul", room: "Room A", fill: "24/24" },
            ],
            sideItems: [
                { label: "Trainer changes needed", value: "1", icon: "alert" },
                { label: "Full classes", value: "3", icon: "check" },
                { label: "New bookings", value: "27", icon: "calendarCheck" },
            ],
        },
        attendance: {
            title: "Attendance",
            subtitle: "Review QR scans, manual entries, and today's check-in flow.",
            searchPlaceholder: "Search member, class, or method",
            primaryPanelTitle: "Recent Check-ins",
            secondaryPanelTitle: "QR Attendance Board",
            actions: [
                { label: "Scan QR", icon: "qr", variant: "primary" },
                { label: "Manual Entry", icon: "scan" },
            ],
            summaries: [
                { label: "Check-ins Today", value: "216", detail: "since 09:00", icon: "scan", tone: "primary" },
                { label: "Class Attendance", value: "88", detail: "from 5 classes", icon: "activity", tone: "accent" },
                { label: "Manual Entries", value: "11", detail: "admin approved", icon: "badge", tone: "warning" },
            ],
            columns: [
                { key: "time", label: "Time" },
                { key: "member", label: "Member" },
                { key: "type", label: "Type" },
                { key: "className", label: "Class" },
                { key: "method", label: "Method" },
            ],
            rows: [
                { time: "12:06", member: "B. Anudari", type: "Entry", className: "Open gym", method: "QR" },
                { time: "11:58", member: "G. Temuulen", type: "Class", className: "Сунгалт", method: "QR" },
                { time: "11:44", member: "E. Nomin", type: "Entry", className: "Open gym", method: "Manual" },
            ],
            sideItems: [
                { label: "QR devices active", value: "2", icon: "qr" },
                { label: "Open check-ins", value: "34", icon: "clock" },
                { label: "Duplicate scans to review", value: "4", icon: "alert" },
            ],
        },
        settings: {
            title: "Settings",
            subtitle: "Manage organization details, locations, permissions, and notification rules.",
            searchPlaceholder: "Search settings, location, or role",
            primaryPanelTitle: "System Settings",
            secondaryPanelTitle: "Security",
            actions: [
                { label: "Save", icon: "check", variant: "primary" },
                { label: "Review Changes", icon: "sliders" },
            ],
            summaries: [
                { label: "Locations", value: "2", detail: "active sites", icon: "building", tone: "primary" },
                { label: "Staff", value: "18", detail: "with roles", icon: "shield", tone: "success" },
                { label: "Notifications", value: "6", detail: "active rules", icon: "bell", tone: "accent" },
            ],
            columns: [
                { key: "setting", label: "Setting" },
                { key: "value", label: "Current Value" },
                { key: "owner", label: "Owner" },
                { key: "status", label: "Status" },
            ],
            rows: [
                { setting: "Organization name", value: "goku-gym", owner: "Admin", status: "Active" },
                { setting: "Primary location", value: "Main location", owner: "Manager", status: "Active" },
                { setting: "Renewal reminder", value: "7 days before", owner: "System", status: "Active" },
            ],
            sideItems: [
                { label: "Admin users", value: "3", icon: "shield" },
                { label: "Location schedules", value: "2", icon: "clock" },
                { label: "Payment connection", value: "QPay", icon: "wallet" },
            ],
        },
        memberships: {
            title: "Membership Plans",
            subtitle: "Create prices, durations, and access packages for daily sales.",
            searchPlaceholder: "Search plans, prices, or duration",
            primaryPanelTitle: "Plan List",
            secondaryPanelTitle: "Sales Snapshot",
            actions: [
                { label: "Add Plan", icon: "plus", variant: "primary" },
                { label: "Settings", icon: "settings" },
            ],
            summaries: [
                { label: "Active Plans", value: "6", detail: "open for sale", icon: "badge", tone: "primary" },
                { label: "Average Price", value: "190K", detail: "monthly plan", icon: "currency", tone: "success" },
                { label: "Top Plan", value: "Pro", detail: "42% of sales", icon: "activity", tone: "accent" },
            ],
            columns: [
                { key: "plan", label: "Plan" },
                { key: "duration", label: "Duration" },
                { key: "sessions", label: "Access" },
                { key: "price", label: "Price" },
                { key: "status", label: "Status" },
            ],
            rows: [
                { plan: "Basic", duration: "30 days", sessions: "Unlimited", price: "120,000 MNT", status: "Active" },
                { plan: "Pro", duration: "90 days", sessions: "Unlimited", price: "320,000 MNT", status: "Active" },
                { plan: "Premium", duration: "180 days", sessions: "Unlimited", price: "590,000 MNT", status: "Active" },
            ],
            sideItems: [
                { label: "Default recommendation", value: "Pro", icon: "badge" },
                { label: "Plans to archive", value: "1", icon: "alert" },
                { label: "QPay price sync", value: "0", icon: "wallet" },
            ],
        },
    },
};

function AdminSectionContent({
    slug,
    section,
    language,
    page,
    labels,
}: {
    slug: string;
    section: SectionKey;
    language: "MGL" | "ENG";
    page: SectionConfig;
    labels: typeof actionText["MGL"];
}) {
    const [rows, setRows] = useState<Row[]>(page.rows);
    const [searchText, setSearchText] = useState("");
    const [appliedQuery, setAppliedQuery] = useState("");
    const [dialogMode, setDialogMode] = useState<DialogMode | null>(null);
    const [notice, setNotice] = useState("");
    const [selectedRow, setSelectedRow] = useState<Row | null>(null);
    const [draftRow, setDraftRow] = useState<Row>(() => buildDraftRow(section, page.columns, language));

    const filteredRows = useMemo(() => {
        const query = appliedQuery.trim().toLowerCase();

        if (!query) return rows;

        return rows.filter((row) =>
            Object.values(row).some((value) => value.toLowerCase().includes(query))
        );
    }, [appliedQuery, rows]);

    const showNotice = (message: string) => {
        setNotice(message);
        window.setTimeout(() => setNotice(""), 2200);
    };

    const applyFilter = () => {
        setAppliedQuery(searchText);
        showNotice(labels.filter);
    };

    const openCreateDialog = () => {
        if (section === "settings") {
            showNotice(labels.saved);
            return;
        }

        setDraftRow(buildDraftRow(section, page.columns, language));
        setDialogMode("create");
    };

    const handleAction = (action: Action) => {
        if (action.variant === "primary") {
            openCreateDialog();
            return;
        }

        if (section === "payments") {
            downloadRows(`${slug}-${section}-report.csv`, page.columns, filteredRows);
            showNotice(labels.download);
            return;
        }

        if (section === "settings" || section === "memberships") {
            setDialogMode("details");
            return;
        }

        applyFilter();
    };

    const submitDraft = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setRows((currentRows) => [draftRow, ...currentRows]);
        setDialogMode(null);
        showNotice(labels.saved);
    };

    return (
        <div className="space-y-6 p-5 xl:p-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="max-w-3xl">
                    <h1 className="text-3xl font-bold leading-tight">{page.title}</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{page.subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {page.actions.map((action) => {
                        const ActionIcon = icons[action.icon];

                        return (
                            <button
                                key={action.label}
                                type="button"
                                onClick={() => handleAction(action)}
                                className={
                                    action.variant === "primary"
                                        ? "button-primary inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition"
                                        : "button-secondary inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition"
                                }
                            >
                                <ActionIcon className="h-4 w-4" />
                                {action.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {notice && (
                <div
                    aria-live="polite"
                    className="fixed right-5 top-20 z-[80] rounded-2xl border border-line bg-surface px-4 py-3 text-sm text-foreground shadow-lg"
                >
                    {notice}
                </div>
            )}

            <div className="grid gap-3 md:grid-cols-3">
                {page.summaries.map((item) => {
                    const SummaryIcon = icons[item.icon];

                    return (
                        <div key={item.label} className="rounded-2xl border border-line bg-surface p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-sm text-muted">{item.label}</p>
                                    <p className="mt-2 text-3xl font-bold leading-tight">{item.value}</p>
                                </div>
                                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneStyles[item.tone]}`}>
                                    <SummaryIcon className="h-4 w-4" />
                                </div>
                            </div>
                            <p className="mt-3 text-xs text-muted">{item.detail}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
                <section className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
                    <div className="flex flex-col gap-3 border-b border-line p-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-base font-semibold">{page.primaryPanelTitle}</h2>
                        </div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <div className="relative min-w-0 sm:w-72">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                                <input
                                    className="input-field h-10 w-full rounded-xl pl-10 pr-3 text-sm"
                                    placeholder={page.searchPlaceholder}
                                    type="search"
                                    value={searchText}
                                    onChange={(event) => setSearchText(event.target.value)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            applyFilter();
                                        }
                                    }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={applyFilter}
                                className="button-secondary inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition"
                            >
                                <Filter className="h-4 w-4" />
                                {language === "ENG" ? "Filter" : "Шүүх"}
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead className="bg-surface-muted text-xs text-muted">
                                <tr className="border-b border-line">
                                    {page.columns.map((column) => (
                                        <th key={column.key} className="px-5 py-3 text-sm font-medium text-muted">
                                            {column.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[color:var(--line)]">
                                {filteredRows.map((row, rowIndex) => (
                                    <tr
                                        key={`${section}-${rowIndex}`}
                                        tabIndex={0}
                                        onClick={() => setSelectedRow(row)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" || event.key === " ") {
                                                event.preventDefault();
                                                setSelectedRow(row);
                                            }
                                        }}
                                        className="cursor-pointer transition hover:bg-surface-muted/60 focus-visible:bg-surface-muted focus-visible:outline-none"
                                    >
                                        {page.columns.map((column, columnIndex) => (
                                            <td key={column.key} className={"px-5 py-5 align-middle " + (column.key === 'amount' ? 'text-right' : '')}>
                                                {column.key === 'status' ? (
                                                    (() => {
                                                        const status = String(row[column.key] ?? "");
                                                        const statusMap: Record<string, string> = {
                                                            'Баталгаажсан': 'bg-success/10 text-success',
                                                            'Төлөгдсөн': 'bg-success/10 text-success',
                                                            'Хүлээгдэж байна': 'bg-warning/10 text-warning',
                                                            'Шалгах': 'bg-warning/10 text-warning',
                                                            'Буцаасан': 'bg-danger/10 text-danger',
                                                            'Цуцлагдсан': 'bg-surface-muted text-muted',
                                                        };

                                                        const cls = statusMap[status] ?? 'bg-surface px-2.5 py-1 text-xs text-muted';

                                                        return (
                                                            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${cls}`}>
                                                                {status}
                                                            </span>
                                                        );
                                                    })()
                                                ) : column.key === 'amount' ? (
                                                    <span className="font-semibold">{row[column.key]}</span>
                                                ) : (
                                                    <span className={columnIndex === 0 ? 'font-semibold' : 'text-muted'}>
                                                        {row[column.key]}
                                                    </span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                {filteredRows.length === 0 && (
                                    <tr>
                                        <td className="px-4 py-8 text-center text-sm text-muted" colSpan={page.columns.length}>
                                            {labels.empty}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Analytics section under the table */}
                        <div className="mt-6 rounded-2xl border border-line bg-surface p-5 shadow-sm">
                            <h3 className="text-base font-semibold">Орлогын хандлага</h3>
                            <p className="mt-1 text-sm text-muted">Орлогын график (сүүлийн 7-30 хоног)</p>
                            <div className="mt-4 h-40 w-full">
                                <svg className="h-full w-full" viewBox="0 0 800 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="rgba(37,99,235,0.12)" />
                                            <stop offset="100%" stopColor="rgba(37,99,235,0)" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,140 L80,120 L160,100 L240,110 L320,80 L400,70 L480,95 L560,60 L640,50 L720,70 L800,40" fill="url(#g)" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted">Төлбөрийн төрлийн харьцаа</p>
                                    <div className="mt-2 h-20 w-full rounded-lg bg-surface-muted" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted">(QPay / Банк / Бэлэн)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="rounded-2xl border border-line bg-surface p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h2 className="text-base font-semibold">{page.secondaryPanelTitle}</h2>
                            <p className="mt-1 text-xs text-muted">Таны оролцоо шаардлагатай төлбөрүүд</p>
                        </div>
                    </div>

                    <div className="mt-4 divide-y divide-line">
                        {page.sideItems.map((item) => {
                            const SideIcon = icons[item.icon];

                            return (
                                <div key={item.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-primary">
                                            <SideIcon className="h-4 w-4" />
                                        </div>
                                        <p className="min-w-0 truncate text-sm text-muted">{item.label}</p>
                                    </div>
                                    <p className="shrink-0 text-sm font-semibold">{item.value}</p>
                                </div>
                            );
                        })}
                    </div>
                </aside>
            </div>

            {selectedRow && (
                <div className="fixed inset-0 z-[60] bg-foreground/20">
                    <button
                        type="button"
                        aria-label={labels.close}
                        className="absolute inset-0 h-full w-full cursor-default"
                        onClick={() => setSelectedRow(null)}
                    />
                    <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-line bg-surface shadow-lg">
                        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
                            <div>
                                <p className="text-xs font-medium text-muted">{labels.details}</p>
                                <h2 className="mt-1 text-lg font-semibold">
                                    {selectedRow[page.columns[0]?.key] || page.title}
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedRow(null)}
                                className="flex h-9 w-9 items-center justify-center rounded-xl text-muted transition hover:bg-surface-muted hover:text-foreground"
                                aria-label={labels.close}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5">
                            <dl className="divide-y divide-line rounded-2xl border border-line">
                                {page.columns.map((column) => (
                                    <div key={column.key} className="grid grid-cols-[140px_1fr] gap-4 px-4 py-3">
                                        <dt className="text-sm text-muted">{column.label}</dt>
                                        <dd className="min-w-0 text-sm font-medium text-foreground">
                                            {selectedRow[column.key] || "-"}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <div className="border-t border-line p-4">
                            <button
                                type="button"
                                onClick={() => setSelectedRow(null)}
                                className="button-secondary inline-flex h-10 w-full items-center justify-center rounded-xl px-3 text-sm font-semibold transition"
                            >
                                {labels.close}
                            </button>
                        </div>
                    </aside>
                </div>
            )}

            {dialogMode && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/20 p-4">
                    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-surface shadow-lg">
                        <div className="flex items-center justify-between border-b border-line px-5 py-4">
                            <h2 className="text-base font-semibold">
                                {dialogMode === "create" ? page.actions[0]?.label : page.actions[1]?.label}
                            </h2>
                            <button
                                type="button"
                                onClick={() => setDialogMode(null)}
                                className="rounded-xl px-2 py-1 text-sm text-muted transition hover:bg-surface-muted hover:text-foreground"
                            >
                                {labels.close}
                            </button>
                        </div>

                        {dialogMode === "create" ? (
                            <form onSubmit={submitDraft} className="space-y-4 p-5">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {page.columns.map((column) => (
                                        <label key={column.key} className="block text-sm">
                                            <span className="mb-1 block font-medium">{column.label}</span>
                                            <input
                                                className="input-field h-10 w-full rounded-xl px-3 text-sm"
                                                value={draftRow[column.key] ?? ""}
                                                onChange={(event) =>
                                                    setDraftRow((currentDraft) => ({
                                                        ...currentDraft,
                                                        [column.key]: event.target.value,
                                                    }))
                                                }
                                            />
                                        </label>
                                    ))}
                                </div>
                                <div className="flex justify-end gap-2 border-t border-line pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setDialogMode(null)}
                                        className="button-secondary inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold transition"
                                    >
                                        {labels.cancel}
                                    </button>
                                    <button
                                        type="submit"
                                        className="button-primary inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold transition"
                                    >
                                        {labels.submit}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="p-5">
                                <p className="text-sm leading-6 text-muted">{labels.noChanges}</p>
                                <div className="mt-5 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setDialogMode(null)}
                                        className="button-secondary inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold transition"
                                    >
                                        {labels.close}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function AdminSectionPage({ slug, section }: { slug: string; section: SectionKey }) {
    const { language } = useLanguage();
    const page = content[language][section];
    const labels = actionText[language];

    return (
        <AdminSectionContent
            key={`${language}-${section}`}
            slug={slug}
            section={section}
            language={language}
            page={page}
            labels={labels}
        />
    );
}
