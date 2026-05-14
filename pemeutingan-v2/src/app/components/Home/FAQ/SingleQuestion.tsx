import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

type Questiontypes = {
    question: string
    answer: string
}

const SingleQuestion = ({ question, answer }: Questiontypes) => {
    return (
        <div className="w-full">
            <Disclosure as="div" className="group data-[open]:bg-slate-50 dark:data-[open]:bg-darklight focus:shadow-[0_0px_2px_0px_rgba(0,0,0,0.10)] data-[open]:mt-3 data-[open]:rounded-2xl hover:rounded-2xl transition-all duration-300">
                {({ open }) => (
                    <>
                        <DisclosureButton className="group/question flex w-full cursor-pointer hover:opacity-90 transition-all items-center justify-between gap-x-4 rounded-t-2xl p-4 text-start">
                            <div className="font-semibold text-neutral-700 dark:text-white md:text-lg xl:text-xl">
                                {question}
                            </div>
                            
                            {/* Collapse Label (Visible when open) */}
                            <figure className={`shrink-0 items-center gap-x-3 whitespace-nowrap rounded-full bg-primary/10 dark:bg-primary/20 py-1.5 pl-3 pr-1.5 text-sm text-primary transition-all ${open ? 'flex' : 'hidden'}`}>
                                Tutup
                                <svg className="h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                </svg>
                            </figure>

                            {/* Plus Icon (Visible when closed) */}
                            <figure className={`shrink-0 items-center justify-center transition-all rounded-full bg-primary/10 dark:bg-primary/20 p-1.5 shadow-[0_2px_10px_0px_rgba(16,185,129,0.1)] ${open ? 'hidden' : 'flex'}`}>
                                <svg className="h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                            </figure>
                        </DisclosureButton>
                        <AnimatePresence>
                            {open && (
                                <DisclosurePanel
                                    static
                                    className="text-neutral-500 dark:text-white/50 px-4 pb-4 origin-top"
                                >
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        {answer}
                                    </motion.div>
                                </DisclosurePanel>
                            )}
                        </AnimatePresence>
                    </>
                )}
            </Disclosure>
        </div>
    )
}

export default SingleQuestion;