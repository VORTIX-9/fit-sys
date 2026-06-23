"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "MGL" | "ENG";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const dictionaries: Record<Language, Record<string, string>> = {
    MGL: {
        dashboard: "Хяналтын самбар",
        members: "Гишүүд",
        payments: "Төлбөр",
        classes: "Хичээл",
        settings: "Тохиргоо",
        logout: "Гарах",
        search: "Гишүүн, төлбөр, захиалга хайх",
        notifications: "Мэдэгдэл",
        gym_registration: "Байгууллага бүртгэх",
        unified_access: "Нэгдсэн нэвтрэх",
        staff_desk: "Ажилтны хэсэг",
        theme_light: "Гэгээлэг",
        theme_dark: "Харанхуй",
        home: "Нүүр",
        back: "Буцах",
        continue: "Үргэлжлүүлэх",
        complete: "Дуусгах",
        save: "Хадгалах",
        cancel: "Цуцлах",

        login: "Нэвтрэх",
        signup: "Бүртгүүлэх",
        email: "Имэйл хаяг",
        password: "Нууц үг",
        forgot_password: "Нууц үг мартсан?",
        access_portal: "fit.sys нэвтрэх",
        enter_credentials: "Байгууллагын эрхээрээ нэвтэрнэ үү",
        start_legacy: "Фитнес төвөө бүртгүүлэх",
        register_org: "Тохиргоог богино хугацаанд дуусгаад шууд ашиглаж эхэл",
        org_profile: "Байгууллагын мэдээлэл",
        admin_setup: "Админ хэрэглэгч",
        gym_name: "Фитнес төвийн нэр",
        subdomain: "Дэд домайн",
        full_name: "Бүтэн нэр",
        phone: "Утасны дугаар",
        already_account: "Бүртгэлтэй юу?",
        no_account: "Бүртгэлгүй юу?",

        hero_kicker: "Фитнес төвийн өдөр тутмын үйл ажиллагаа",
        hero_title: "Фитнес төвөө нэг самбараас удирд",
        hero_subtitle: "Гишүүнчлэл, төлбөр, ирц, хуваарь, ажилтны ажлыг нэг системд төвлөрүүлсэн fit.sys нь жижиг студиэс олон салбартай фитнес хүртэл өдөр тутам ашиглахад зориулагдсан.",
        try_free: "Демо эхлүүлэх",
        features: "Боломжууд",
        pricing: "Тариф",
        contact: "Зөвлөгөө авах",

        benefit_1_title: "Гишүүнчлэлийн бүртгэл",
        benefit_1_desc: "Шинэ гишүүн нэмэх, хугацаа сунгах, эрхийн төлөв харах үйлдлүүд нэг урсгалд багтана.",
        benefit_2_title: "Төлбөрийн хяналт",
        benefit_2_desc: "QPay, бэлэн мөнгө, дансны шилжүүлгийг ялгаж, өдрийн орлого болон үлдэгдлийг тодорхой харуулна.",
        benefit_3_title: "Хичээл, ирц",
        benefit_3_desc: "Багшийн хуваарь, заалны багтаамж, QR ирцийг админ болон ажилтны дэлгэцээс удирдана.",

        trust_title: "Өдөр тутмын ажиллагаа эмхтэй болно",
        trust_desc: "Админ, ажилтан, гишүүний хэсэг тусдаа боловч нэг өгөгдөл дээр ажилладаг тул давхар бүртгэл, алдаатай тайлан багасна.",
        growth_engine: "Операторын хяналт",
        realtime_control: "Бодит цагийн төлөв",
        qr_attendance: "QR ирц",

        portal: "Портал",
        collapse: "Хураах",
        attendance: "Ирц",
        system_access: "Системд нэвтрэх",
        or_continue_with: "Эсвэл дараах аргаар",
        otp_sms: "SMS кодоор нэвтрэх",
        security_standard: "Эрхийн түвшинтэй",
        local_hosting: "Монголд ашиглахад бэлэн",
        admin: "Админ",
        staff: "Ажилтан",
        member: "Гишүүн",
        subdomain_hint: "Жишээ: apex.fitsys.mn",
        unlimited_members: "Гишүүний бүртгэл",
        qpay_integrated: "QPay төлбөр",
        local_support: "Монгол хэлтэй дэмжлэг",

        dashboard_label: "Өнөөдрийн төлөв",
        active_members: "Идэвхтэй гишүүд",
        today_revenue: "Өдрийн орлого",
        checkins_today: "Өнөөдрийн ирц",
        class_fill: "Хичээлийн дүүргэлт",
        next_class: "Дараагийн хичээл",
        payment_queue: "Төлбөр шалгах",
        renewal_alerts: "Сунгалтын сануулга",
        setup_title: "Эхлэх тохиргоогоо дуусгаарай",
        setup_desc: "Эдгээр тохиргоог хийснээр гишүүн бүртгэх, төлбөр авах, ирц шалгах үндсэн урсгал бэлэн болно.",
        setup_plans: "Гишүүнчлэлийн төлөвлөгөө үүсгэх",
        setup_members: "Эхний гишүүнээ нэмэх",
        setup_payments: "Төлбөрийн арга холбох",
        setup_schedule: "Хичээлийн хуваарь гаргах",
    },
    ENG: {
        dashboard: "Dashboard",
        members: "Members",
        payments: "Payments",
        classes: "Classes",
        settings: "Settings",
        logout: "Logout",
        search: "Search members, payments, bookings",
        notifications: "Notifications",
        gym_registration: "Register Organization",
        unified_access: "Unified Access",
        staff_desk: "Staff Desk",
        theme_light: "Light",
        theme_dark: "Dark",
        home: "Home",
        back: "Back",
        continue: "Continue",
        complete: "Complete",
        save: "Save",
        cancel: "Cancel",

        login: "Log In",
        signup: "Sign Up",
        email: "Email Address",
        password: "Password",
        forgot_password: "Forgot password?",
        access_portal: "fit.sys access",
        enter_credentials: "Sign in with your organization account",
        start_legacy: "Register Your Fitness Center",
        register_org: "Finish setup quickly and start operating",
        org_profile: "Organization Details",
        admin_setup: "Admin User",
        gym_name: "Fitness Center Name",
        subdomain: "Subdomain",
        full_name: "Full Name",
        phone: "Phone Number",
        already_account: "Already have an account?",
        no_account: "No account yet?",

        hero_kicker: "Daily operations for fitness teams",
        hero_title: "Run your fitness center from one dashboard",
        hero_subtitle: "fit.sys brings memberships, payments, attendance, class schedules, and staff workflows into one focused system for studios, gyms, and multi-location fitness teams.",
        try_free: "Start Demo",
        features: "Features",
        pricing: "Plans",
        contact: "Talk to Us",

        benefit_1_title: "Membership Records",
        benefit_1_desc: "Create members, extend plans, and see access status inside one clear workflow.",
        benefit_2_title: "Payment Control",
        benefit_2_desc: "Track QPay, cash, and bank transfers with daily revenue and pending balances in view.",
        benefit_3_title: "Classes & Attendance",
        benefit_3_desc: "Manage instructor schedules, room capacity, and QR check-ins from admin and staff screens.",

        trust_title: "Cleaner day-to-day operations",
        trust_desc: "Admin, staff, and member portals stay separate while working from the same data, reducing duplicate entry and messy reporting.",
        growth_engine: "Operator Control",
        realtime_control: "Live Status",
        qr_attendance: "QR Check-in",

        portal: "Portal",
        collapse: "Collapse",
        attendance: "Attendance",
        system_access: "System Access",
        or_continue_with: "Or continue with",
        otp_sms: "Sign in with SMS code",
        security_standard: "Role-based access",
        local_hosting: "Ready for Mongolia",
        admin: "Admin",
        staff: "Staff",
        member: "Member",
        subdomain_hint: "Example: apex.fitsys.mn",
        unlimited_members: "Member records",
        qpay_integrated: "QPay payments",
        local_support: "Mongolian support",

        dashboard_label: "Today's Snapshot",
        active_members: "Active Members",
        today_revenue: "Today Revenue",
        checkins_today: "Check-ins Today",
        class_fill: "Class Fill",
        next_class: "Next Class",
        payment_queue: "Payments to Review",
        renewal_alerts: "Renewal Alerts",
        setup_title: "Finish Your Launch Setup",
        setup_desc: "Complete these items to make member registration, payment collection, and attendance checks ready for daily use.",
        setup_plans: "Create membership plans",
        setup_members: "Add your first member",
        setup_payments: "Connect payment methods",
        setup_schedule: "Publish class schedule",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("MGL");

    const t = (key: string) => dictionaries[language][key] || key;

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);

    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return context;
}
