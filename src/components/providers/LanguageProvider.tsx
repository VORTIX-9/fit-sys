"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "MGL" | "ENG";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const dictionaries: Record<Language, Record<string, string>> = {
    MGL: {
        // Navigation & General
        dashboard: "Хяналт",
        members: "Гишүүд",
        payments: "Төлбөр",
        classes: "Хичээл",
        settings: "Тохиргоо",
        logout: "Гарах",
        search: "Ухаалаг хайлт...",
        notifications: "Мэдэгдэл",
        gym_registration: "Gym бүртгэл",
        unified_access: "Нэгдсэн нэвтрэх",
        staff_desk: "Staff ширээ",
        theme_light: "Гэгээлэг",
        theme_dark: "Харанхуй",
        home: "Нүүр",
        back: "Буцах",
        continue: "Үргэлжлүүлэх",
        complete: "Дуусгах",
        save: "Хадгалах",
        cancel: "Цуцлах",

        // Auth Pages
        login: "Нэвтрэх",
        signup: "Бүртгүүлэх",
        email: "Имэйл хаяг",
        password: "Нууц үг",
        forgot_password: "Нууц үг мартсан?",
        access_portal: "Нэгдсэн нэвтрэх портал",
        enter_credentials: "Нэвтрэх мэдээллээ оруулна уу",
        start_legacy: "Фитнес төвөө бүртгүүлэх",
        register_org: "Байгууллагаа 2 минутанд бүртгүүл",
        org_profile: "Байгууллагын мэдээлэл",
        admin_setup: "Админ тохиргоо",
        gym_name: "Гим-ийн нэр",
        subdomain: "Дэд домайн хаяг",
        full_name: "Бүтэн нэр",
        phone: "Утасны дугаар",
        already_account: "Бүртгэлтэй юу?",
        no_account: "Бүртгэлгүй юу?",

        // Marketing
        hero_title: "Монголын фитнес төвүүдэд зориулсан удирдлагын систем",
        hero_subtitle: "Гишүүнчлэлийн бүртгэл, төлбөр тооцоо, хичээл захиалгыг нэг дороос удирдах Монголын анхны иж бүрэн SaaS систем.",
        try_free: "Үнэгүй турших",
        features: "Үйлчилгээ",
        pricing: "Үнэ",
        contact: "Холбоо барих",

        benefit_1_title: "Гишүүнчлэл автоматаар",
        benefit_1_desc: "Хугацаа дуусах дөхсөн гишүүдэд автоматаар мэдэгдэх, эрхийг нь сунгах үйл явцыг хурдасгана.",
        benefit_2_title: "Төлбөрийн хяналт",
        benefit_2_desc: "Дансны хуулга, бэлэн мөнгө, QPay төлбөрүүдийг нэгдсэн системээр тулгаж, тайлангаа нэг товшоод ав.",
        benefit_3_title: "Хичээл, цагийн бүртгэл",
        benefit_3_desc: "Багш нарын хуваарь, заалны дүүргэлтийг хянаж, гишүүд өөрсдөө цагаа захиалах боломжтой.",

        trust_title: "Орлогоо 25% болтол өсгө",
        trust_desc: "Систем ашигласнаар хүний хүчин зүйлээс шалтгаалсан алдааг арилгаж, гишүүдийн сэтгэл ханамжийг нэмэгдүүлнэ.",
        growth_engine: "Өсөлтийн хөдөлгүүр",
        realtime_control: "Бодит цагийн хяналт",
        qr_attendance: "Ирц бүртгэл (QR)",

        portal: "Портал",
        collapse: "Хураах",
        attendance: "Ирц",
        system_access: "Системд нэвтрэх",
        or_continue_with: "Эсвэл дараах сонголтоор",
        otp_sms: "SMS-ээр нэг удаагийн код авах",
        security_standard: "Хамгаалалт 256-бит",
        local_hosting: "Монгол дахь сервер",
        admin: "Админ",
        staff: "Ажилтан",
        member: "Гишүүн",
        subdomain_hint: "Энэ нь таны өөрийн хаяг болох юм (ж.нь: apex.fitsys.mn)",
        unlimited_members: "Хязгааргүй гишүүд",
        qpay_integrated: "QPay холбогдсон",
        local_support: "Орон нутгийн тусламж",
    },
    ENG: {
        // Navigation & General
        dashboard: "Dashboard",
        members: "Members",
        payments: "Payments",
        classes: "Classes",
        settings: "Settings",
        logout: "Logout",
        search: "Smart Search...",
        notifications: "Notifications",
        gym_registration: "Gym Registration",
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

        // Auth Pages
        login: "Login",
        signup: "Sign Up",
        email: "Email Address",
        password: "Password",
        forgot_password: "Forgot Password?",
        access_portal: "Unified Access Portal",
        enter_credentials: "Enter your credentials to continue",
        start_legacy: "Start Your Gym Legacy",
        register_org: "Register your organization in 2 minutes",
        org_profile: "Organization Profile",
        admin_setup: "Admin Setup",
        gym_name: "Gym Name",
        subdomain: "Desired Subdomain",
        full_name: "Full Name",
        phone: "Phone Number",
        already_account: "Already have an account?",
        no_account: "Don't have a gym account?",

        // Marketing
        hero_title: "Next-Gen Fitness Management for Mongolia",
        hero_subtitle: "All-in-one SaaS platform for membership management, payments, and class bookings tailored for the local market.",
        try_free: "Try for Free",
        features: "Features",
        pricing: "Pricing",
        contact: "Contact",

        benefit_1_title: "Automated Membership",
        benefit_1_desc: "Automatically notify members nearing expiration and accelerate the renewal process.",
        benefit_2_title: "Payment Control",
        benefit_2_desc: "Reconcile bank statements, cash, and QPay payments through a unified system and get reports with one click.",
        benefit_3_title: "Class & Schedule",
        benefit_3_desc: "Monitor instructor schedules and facility occupancy, allowing members to book their own slots.",

        trust_title: "Boost Revenue up to 25%",
        trust_desc: "Eliminate human errors and increase member satisfaction by implementing a professional management system.",
        growth_engine: "Growth Engine",
        realtime_control: "Real-time Control",
        qr_attendance: "QR Attendance",

        portal: "Portal",
        collapse: "Collapse",
        attendance: "Attendance",
        system_access: "System Access",
        or_continue_with: "Or continue with",
        otp_sms: "OTP via SMS",
        security_standard: "Security 256-bit",
        local_hosting: "Mongolia Hosted",
        admin: "Admin",
        staff: "Staff",
        member: "Member",
        subdomain_hint: "This will be your unique address (e.g. apex.fitsys.mn)",
        unlimited_members: "Unlimited Members",
        qpay_integrated: "QPay Integrated",
        local_support: "Local Support",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("MGL");

    const t = (key: string) => {
        return dictionaries[language][key] || key;
    };

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
