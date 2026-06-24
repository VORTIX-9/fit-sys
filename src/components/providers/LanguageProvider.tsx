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
        search: "Гишүүн, төлбөр, хичээл хайх",
        notifications: "Мэдэгдэл",
        gym_registration: "Байгууллага бүртгэх",
        unified_access: "Нэгдсэн нэвтрэлт",
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
        forgot_password: "Нууц үгээ мартсан?",
        access_portal: "fit.sys нэвтрэлт",
        enter_credentials: "Байгууллагын workspace-д нэвтрэх",
        start_legacy: "Фитнес төвөө fit.sys-д бүртгүүлэх",
        register_org: "Гишүүнчлэл, төлбөр, ирцийн үндсэн тохиргоог нэг дор эхлүүлнэ.",
        org_profile: "Байгууллагын мэдээлэл",
        admin_setup: "Админ хэрэглэгч",
        gym_name: "Фитнес төвийн нэр",
        subdomain: "Системийн хаяг",
        full_name: "Бүтэн нэр",
        phone: "Утасны дугаар",
        already_account: "Бүртгэлтэй юу?",
        no_account: "Бүртгэлгүй юу?",
        signup_hero_title: "Фитнес төвийнхөө ажлыг нэг цэгтэй системээс эхлүүл.",
        signup_hero_desc: "Байгууллагаа бүртгээд эхний админ эрхээ үүсгэнэ. Дараа нь гишүүнчлэл, төлбөр, ирцийн самбар шууд нээгдэнэ.",
        signup_value_1: "Гишүүнчлэлийн багц, эрхийн хугацааг тохируулна",
        signup_value_2: "Төлбөр, сунгалт, хугацаа дуусах гишүүдийг хянана",
        signup_value_3: "Сургалтын хуваарь гаргаж, ирцийг бүртгэнэ.",
        signup_fast_setup: "Тохиргоо хэдхэн минут үргэлжилнэ",
        signup_role_access: "Эрхийн түвшинтэй админ хандалт",
        signup_org_help: "Өдөр тутам ашиглах байгууллагын нэр, системийн хаягийг сонгоно.",
        signup_admin_help: "Workspace-ийг удирдах үндсэн админ хэрэглэгчийг үүсгэнэ.",

        hero_kicker: "Фитнес төвийн өдөр тутмын удирдлага",
        hero_title: "Фитнес төвийн өдөр тутмын удирдлагыг нэг системд төвлөрүүл.",
        hero_subtitle: "fit.sys нь гишүүнчлэл, төлбөр, хуваарь, ирц бүртгэлийг нэг самбарт төвлөрүүлж, фитнес төвийн өдөр тутмын ажлыг илүү хялбар болгоно.",
        try_free: "Бүртгүүлэх",
        view_demo: "Демо үзэх",
        features: "Боломжууд",
        pricing: "Ажлын урсгал",
        contact: "Холбогдох",

        benefit_1_title: "Гишүүнчлэлийн удирдлага",
        benefit_1_desc: "Шинэ гишүүн бүртгэх, эрх сунгах, дуусах дөхсөн гишүүдийг нэг жагсаалтаас хянах.",
        benefit_2_title: "Төлбөрийн хяналт",
        benefit_2_desc: "QPay, бэлэн мөнгө, банкны шилжүүлгийг ялгаж, өдрийн орлого болон шалгах төлбөрийг тодорхой харуулна.",
        benefit_3_title: "Хичээл ба ирц бүртгэл",
        benefit_3_desc: "Хичээлийн хуваарь, багш, заалны багтаамж, QR уншуулсан болон гараар бүртгэсэн ирцийг нэг дор удирдана.",

        trust_title: "Фитнес төвийн ажил илүү цэгцтэй харагдана",
        trust_desc: "Админ, ажилтан, гишүүний хэсэг тусдаа боловч нэг өгөгдөл дээр ажилладаг. Давхар бүртгэл, будлиантай тайлан, гараар тулгах ажлыг багасгана.",
        growth_engine: "Үйл ажиллагааны хяналт",
        realtime_control: "Өнөөдөр анхаарах зүйлс",
        qr_attendance: "QR уншуулж ирц бүртгэх",

        portal: "Портал",
        collapse: "Хураах",
        attendance: "Ирц",
        system_access: "Нэвтрэх",
        or_continue_with: "Эсвэл дараах аргаар",
        otp_sms: "SMS кодоор нэвтрэх",
        security_standard: "Эрхийн түвшинтэй нэвтрэлт",
        local_hosting: "Монгол фитнес төвүүдэд тохирсон",
        admin: "Админ",
        staff: "Ажилтан",
        member: "Гишүүн",
        subdomain_hint: "Жишээ: apex.fitsys.mn",
        unlimited_members: "Гишүүнчлэлийн удирдлага",
        qpay_integrated: "Төлбөрийн хяналт",
        local_support: "Ирц ба хуваарь",

        dashboard_label: "Өнөөдрийн үйл ажиллагаа",
        active_members: "Идэвхтэй гишүүд",
        today_revenue: "Өнөөдрийн орлого",
        checkins_today: "Бүртгэгдсэн ирц",
        class_fill: "Хичээлийн дүүргэлт",
        next_class: "Дараагийн хичээл",
        next_class_value: "18:30 Сунгалт",
        payment_queue: "Хүлээгдэж буй төлбөр",
        payment_queue_value: "14 төлбөр",
        renewal_alerts: "Эрх дуусах гишүүд",
        renewal_alerts_value: "32 гишүүн",
        setup_title: "Эхлэх тохиргоогоо дуусгаарай",
        setup_desc: "Эдгээр тохиргоо бүрэн байвал гишүүн бүртгэх, төлбөр авах, ирц бүртгэх үндсэн урсгал жигд ажиллана.",
        setup_plans: "Гишүүнчлэлийн багц үүсгэх",
        setup_members: "Эхний гишүүнээ бүртгэх",
        setup_payments: "Төлбөрийн арга тохируулах",
        setup_schedule: "Хичээлийн хуваарь гаргах",

        main_branch_today: "Төв салбар / өнөөдөр",
        live_label: "дүүргэлт",
        schedule_overview: "Өнөөдрийн төлөв",
        operations_sync: "Төлбөр шалгах, эрх дуусах гишүүдэд сануулга илгээх, ирцийн мэдээлэл тулгах",
        signup_step_org: "1. Байгууллага",
        signup_step_admin: "2. Админ",
        signup_address_preview: "Таны системийн хаяг",
        signup_ready_title: "Бүртгүүлсний дараа самбар автоматаар нээгдэнэ",
        signup_ready_desc: "Дараагийн дэлгэц дээр гишүүнчлэл, төлбөр, ирц, хичээлийн үндсэн тохиргоог үргэлжлүүлэн удирдана.",
        login_context: "Админ, ажилтан, гишүүний эрх тусдаа. Бүх үйлдэл тухайн байгууллагын мэдээлэлтэй холбогдоно.",
    },
    ENG: {
        dashboard: "Dashboard",
        members: "Members",
        payments: "Payments",
        classes: "Classes",
        settings: "Settings",
        logout: "Logout",
        search: "Search members, payments, classes",
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
        enter_credentials: "Sign in to your organization workspace",
        start_legacy: "Register your fitness center in fit.sys",
        register_org: "Start membership, payment, and attendance setup from one place.",
        org_profile: "Organization Details",
        admin_setup: "Admin User",
        gym_name: "Fitness Center Name",
        subdomain: "Workspace Address",
        full_name: "Full Name",
        phone: "Phone Number",
        already_account: "Already have an account?",
        no_account: "No account yet?",
        signup_hero_title: "Launch a clean workspace for your fitness center.",
        signup_hero_desc: "Set up your organization, create the first admin, and open a ready-to-use operations dashboard.",
        signup_value_1: "Create membership plans and access periods",
        signup_value_2: "Track payments, renewals, and pending balances",
        signup_value_3: "Publish class schedules and record attendance",
        signup_fast_setup: "Setup takes a few minutes",
        signup_role_access: "Role-based admin access",
        signup_org_help: "Choose the name and workspace address your team will use every day.",
        signup_admin_help: "Create the owner account that will manage this workspace.",

        hero_kicker: "Daily operations for fitness teams",
        hero_title: "Manage memberships, payments, and attendance from one system.",
        hero_subtitle: "fit.sys brings member records, access periods, payment tracking, class schedules, and attendance into one focused dashboard for fitness centers.",
        try_free: "Register Organization",
        view_demo: "View Demo",
        features: "Features",
        pricing: "Workflows",
        contact: "Contact",

        benefit_1_title: "Membership Management",
        benefit_1_desc: "Register new members, extend access, and track renewals from one list.",
        benefit_2_title: "Payment Control",
        benefit_2_desc: "Track QPay, cash, and bank transfers with daily revenue and pending payments in view.",
        benefit_3_title: "Classes & Attendance",
        benefit_3_desc: "Manage schedules, trainers, room capacity, QR scans, and manual attendance entries in one workflow.",

        trust_title: "Make fitness operations easier to follow",
        trust_desc: "Admin, staff, and member portals stay separate while working from the same data, reducing duplicate entry and messy reporting.",
        growth_engine: "Operations Control",
        realtime_control: "Today's Priorities",
        qr_attendance: "QR attendance check-in",

        portal: "Portal",
        collapse: "Collapse",
        attendance: "Attendance",
        system_access: "System Access",
        or_continue_with: "Or continue with",
        otp_sms: "Sign in with SMS code",
        security_standard: "Role-based access",
        local_hosting: "Built for Mongolian fitness centers",
        admin: "Admin",
        staff: "Staff",
        member: "Member",
        subdomain_hint: "Example: apex.fitsys.mn",
        unlimited_members: "Member records",
        qpay_integrated: "QPay and payment tracking",
        local_support: "Attendance and class schedules",

        dashboard_label: "Today's Operations",
        active_members: "Active Members",
        today_revenue: "Today's Revenue",
        checkins_today: "Registered Attendance",
        class_fill: "Class Occupancy",
        next_class: "Next Class",
        next_class_value: "18:30 Stretch Class",
        payment_queue: "Pending Payments",
        payment_queue_value: "14 payments",
        renewal_alerts: "Expiring Memberships",
        renewal_alerts_value: "32 members",
        setup_title: "Finish Your Demo Setup",
        setup_desc: "Complete these settings so member registration, payment collection, and attendance checks run cleanly.",
        setup_plans: "Create membership plans",
        setup_members: "Register your first member",
        setup_payments: "Configure payment methods",
        setup_schedule: "Publish class schedule",

        main_branch_today: "Main branch / today",
        live_label: "filled",
        schedule_overview: "Today's Status",
        operations_sync: "Review payments, send renewal reminders, and reconcile attendance data.",
        signup_step_org: "1. Organization",
        signup_step_admin: "2. Admin",
        signup_address_preview: "Your workspace address",
        signup_ready_title: "Your dashboard opens right after registration",
        signup_ready_desc: "The next screen continues into memberships, payments, attendance, and class setup.",
        login_context: "Admin, staff, and member roles are separated while sharing the same organization data.",
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
