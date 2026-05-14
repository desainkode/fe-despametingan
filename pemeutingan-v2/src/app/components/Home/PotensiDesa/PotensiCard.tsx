import { Icon } from "@iconify/react";

type Doctype = {
    icon: string
    title: string
    text: string
}

const PotensiCard = ({ icon, title, text }: Doctype) => {
    return (
        <div className="h-full" >
            <div className="border border-white/10 backdrop-blur-sm bg-white/5 md:px-15 md:py-3.438 p-8 rounded-2xl text-center lg:mb-0 transition-all">
                <div className="rounded-full flex justify-center w-20 h-20 items-center mx-auto bg-primary shadow-lg shadow-primary/20">
                    <span className="relative z-1">
                        <Icon
                            icon={icon}
                            width="35"
                            height="35"
                            className="font-semibold text-white"
                        />
                    </span>
                </div>
                <h3 className="py-4 text-24 font-semibold text-white dark:text-white">
                    {title}
                </h3>
                <p className="text-lg font-medium text-white/50">{text}</p>
            </div>
        </div>
    )
}
export default PotensiCard;