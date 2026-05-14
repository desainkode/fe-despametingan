import Link from "next/link";
import { Icon } from "@iconify/react";

export type ServiceType = {
    icon: string;
    title: string;
    slug: string;
    description: string;
}

const SingleService = ({ service }: { service: ServiceType }) => {
    const { icon, title, description, slug } = service;
    return (
        <div className="h-full" >
            <div className="shadow-card-shadow p-10 rounded-3xl h-full bg-white dark:bg-darklight flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-6">
                        <div className="rounded-full bg-cream flex justify-center p-3 items-center relative overflow-hidden before:content-[''] before:absolute before:w-full before:h-full before:bg-darkcream before:rounded-full before:top-5 before:-left-6 ">
                            <span className="relative z-1 flex items-center justify-center w-[35px] h-[35px]">
                                <Icon
                                    icon={icon}
                                    width="35"
                                    height="35"
                                    className="font-semibold text-primary"
                                />
                            </span>
                        </div>
                        <h3 className="text-22 font-semibold text-black dark:text-white">
                            {title}
                        </h3>
                    </div>
                    <p className="text-base font-medium text-black/50 dark:text-white/50">
                        {description}
                    </p>
                </div>
                <Link
                    href={`/services/${slug}`}
                    className="flex gap-2 items-center font-medium justify-start mt-4 hover:text-primary-hover text-primary group transition-all"
                >
                    Lihat Detail{" "}
                    <Icon
                        icon="solar:alt-arrow-right-linear"
                        width="20"
                        height="20"
                        className="font-semibold group-hover:translate-x-1 transition-transform"
                    />
                </Link>
            </div>
        </div>
    )
}

export default SingleService