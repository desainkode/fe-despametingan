"use client";
import { useEffect, useState } from "react";
import SingleQuestion from "./SingleQuestion";

const FAQ = () => {
  const [Questions, setQuestions] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setQuestions(data.Questions || [])
      } catch (error) {
        console.error('Error fetching FAQ data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <section className="pt-12 lg:pt-16 pb-6 lg:pb-16 bg-white dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-xl md:max-w-screen-md px-4">
        <div className="text-start">
          <p className="text-lg text-black/50 dark:text-white/50 mb-6">
            Tanya Jawab (FAQ)
          </p>
          <h3 className="md:text-6xl sm:text-4xl text-3xl font-semibold text-dark dark:text-white">
            Informasi Layanan 
            <br /> & Kependudukan
          </h3>
        </div>
        <div className="mt-10 space-y-4 max-w-4xl mx-auto">
            {Questions.map((item, index) => (
              <SingleQuestion key={index} question={item.question} answer={item.answer} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
