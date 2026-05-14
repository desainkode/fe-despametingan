import SingleFeature from "./SingleFeature";

export type APBDesItem = {
    type: string;
    price: string | number;
    text: string;
    benefits: string[]
}

interface APBDesCardProps {
    data: APBDesItem;
    onViewDetail: (data: APBDesItem) => void;
}

const APBDesCard = ({ data, onViewDetail }: APBDesCardProps) => {
    const { type, price, text, benefits } = data;
    
    // Format price to Indonesian Rupiah format
    const formattedPrice = typeof price === 'number' 
        ? price.toLocaleString('id-ID') 
        : !isNaN(Number(price)) 
            ? Number(price).toLocaleString('id-ID') 
            : price;

    return (
        <div className="h-full" >
            <div className="shadow-card-shadow relative h-full sm:px-8 px-6 sm:pt-8 sm:pb-12 sm:py-0 py-9 rounded-3xl before:content-[''] before:absolute before:w-full before:h-11.563 before:bg-contain before:bg-center before:bg-no-repeat before:bg-[url('/images/plan/price-overlay.svg')] dark:before:bg-[url('/images/plan/price-overlay-dark.svg')] before:top-20% before:right-0 bg-white dark:bg-darklight z-20 flex flex-col justify-between lg:mb-0 mb-1.875">
                <div className="relative z-10">
                    <p className="text-primary text-lg font-semibold mb-2">
                        {type}
                    </p>
                    <h3 className="mb-4 flex items-baseline flex-wrap">
                        <span className="text-2xl font-semibold text-black/50 dark:text-white/50 mr-2">
                            Rp
                        </span>
                        <span className="text-4xl font-bold text-black dark:text-white">
                            {formattedPrice}
                        </span>
                    </h3>
                    <p className="text-black/50 dark:text-white/50 text-lg mb-6">
                        {text}
                    </p>
                    <ul className="pb-6">
                        {benefits.map((benefit: string, benefitIndex: number) => (
                            <SingleFeature key={benefitIndex} text={benefit} />
                        ))}
                    </ul>
                </div>
                <button
                    onClick={() => onViewDetail(data)}
                    className="px-2.188 py-1.125 bg-primary rounded-lg cursor-pointer text-white text-base hover:bg-primary-hover duration-500 shadow-lg shadow-primary/10 active:scale-95 transition-all"
                >
                    Lihat Detail
                </button>
            </div>
        </div>
    )
}

export default APBDesCard;