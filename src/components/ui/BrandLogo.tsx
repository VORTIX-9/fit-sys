import Image from "next/image";

type BrandLogoProps = {
    variant?: "full" | "mark";
    className?: string;
    priority?: boolean;
};

const logoAssets = {
    full: {
        src: "/fit-sys-logo.png",
        width: 797,
        height: 642,
        alt: "fit.sys Fitness CRM",
    },
    mark: {
        src: "/fit-sys-mark.png",
        width: 404,
        height: 317,
        alt: "fit.sys",
    },
};

export function BrandLogo({ variant = "full", className = "", priority = false }: BrandLogoProps) {
    const logo = logoAssets[variant];

    if (variant === "full") {
        return (
            <div className={`flex items-center gap-2.5 ${className}`}>
                <Image
                    src={logoAssets.mark.src}
                    alt=""
                    width={logoAssets.mark.width}
                    height={logoAssets.mark.height}
                    priority={priority}
                    className="h-9 w-9 shrink-0 object-contain"
                />
                <span className="text-xl font-semibold leading-none tracking-normal text-foreground">fit.sys</span>
            </div>
        );
    }

    return (
        <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority={priority}
            className={`block object-contain ${className}`}
        />
    );
}
