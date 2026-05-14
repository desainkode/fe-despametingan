import { Icon } from "@iconify/react";

const SingleFeature = ({ text }: { text: string }) => {
    return (
        <li className="text-black dark:text-white text-lg text-start pb-2 flex items-start gap-2" >
            <span className="mt-1 flex-shrink-0">
                <Icon
                    icon="tabler:circle-check"
                    width="20"
                    height="20"
                    className="font-semibold text-success"
                />
            </span>
            <span className="leading-tight">{text}</span>
        </li>
    )
}

export default SingleFeature;