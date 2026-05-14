"use client"
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    projectname: "",
    email: "",
    Project: "",
    Message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = Object.values(formData).every((value) => value.trim() !== "");
    setIsFormValid(isValid);
  }, [formData]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const reset = () => {
    setFormData({
      name: "",
      projectname: "",
      email: "",
      Project: "",
      Message: ""
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true);

    fetch("https://formsubmit.co/ajax/bhainirav772@gmail.com", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        Name: formData.name,
        ProjectName: formData.projectname,
        Email: formData.email,
        Project: formData.Project,
        Message: formData.Message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSubmitted(true)
          setShowThanks(true);
          reset();

          setTimeout(() => {
            setShowThanks(false);
          }, 5000);
        }

        reset();
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <section className="dark:bg-darkmode pb-24 !pt-0">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-12">
          <div className="col-span-12 lg:col-span-6 md:pt-12 pt-0 relative">
            <h2 className="text-[40px] leading-[3rem] font-bold mb-9 text-midnight_text dark:text-white">Hubungi Kami</h2>
            <form onSubmit={handleSubmit} className="flex flex-wrap w-full m-auto justify-between">
              <div className="sm:flex gap-4 w-full">
                <div className="mx-0 my-2.5 flex-1">
                  <label htmlFor="name" className="pb-3 inline-block text-base font-medium text-midnight_text dark:text-white/80">
                    Nama Lengkap*
                  </label>
                  <input
                    id='name'
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full text-base px-4 rounded-lg py-2.5 border border-solid border-darkborder/20 dark:border-white/10 dark:text-white dark:bg-darklight/50 transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  />
                </div>
                <div className="mx-0 my-2.5 flex-1">
                  <label htmlFor="projectname" className="pb-3 inline-block text-base font-medium text-midnight_text dark:text-white/80">
                    Subjek / Kepentingan*
                  </label>
                  <input
                    id='projectname'
                    type='text'
                    name='projectname'
                    value={formData.projectname}
                    onChange={handleChange}
                    placeholder="Contoh: Tanya Layanan KTP"
                    className="w-full text-base px-4 py-2.5 rounded-lg border border-solid border-darkborder/20 dark:border-white/10 dark:text-white dark:bg-darklight/50 transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  />
                </div>
              </div>
              <div className="sm:flex gap-4 w-full">
                <div className="mx-0 my-2.5 flex-1">
                  <label htmlFor="email" className="pb-3 inline-block text-base font-medium text-midnight_text dark:text-white/80">
                    Alamat Email*
                  </label>
                  <input
                    id='email'
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Contoh: budi@email.com"
                    className="w-full text-base px-4 py-2.5 rounded-lg border border-solid border-darkborder/20 dark:border-white/10 dark:text-white dark:bg-darklight/50 transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0"
                  />
                </div>
                <div className="mx-0 my-2.5 flex-1">
                  <label htmlFor="Project" className="pb-3 inline-block text-base font-medium text-midnight_text dark:text-white/80">
                    Kategori Layanan*
                  </label>
                  <select name="Project"
                    id="Project"
                    value={formData.Project}
                    onChange={handleChange} 
                    className="w-full text-base px-4 py-2.5 rounded-lg border border-solid border-darkborder/20 dark:border-white/10 dark:text-white dark:bg-darklight transition-all duration-500 focus:border-primary dark:focus:border-primary focus:outline-0 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.5rem_center] bg-no-repeat">
                    <option value="" className="bg-white dark:bg-darklight">Pilih Kategori</option>
                    <option value="Layanan Kependudukan" className="bg-white dark:bg-darklight">Layanan Kependudukan</option>
                    <option value="Aspirasi & Keluhan" className="bg-white dark:bg-darklight">Aspirasi & Keluhan</option>
                    <option value="Informasi Desa" className="bg-white dark:bg-darklight">Informasi Desa</option>
                    <option value="Bantuan Sosial" className="bg-white dark:bg-darklight">Bantuan Sosial</option>
                    <option value="Pertanyaan Umum" className="bg-white dark:bg-darklight">Pertanyaan Umum</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="Message" className="text-base font-medium inline-block pb-4 text-midnight_text dark:text-white/80">
                  Pesan / Aspirasi
                </label>
                <textarea
                  id='Message'
                  name='Message'
                  value={formData.Message}
                  onChange={handleChange}
                  className='w-full border border-solid border-darkborder/20 dark:border-white/10 px-4 py-2 focus:outline-0 bg-white dark:bg-darklight/50 dark:text-white rounded-lg dark:focus:border-primary focus:border-primary transition-all duration-500'
                  placeholder='Tuliskan aspirasi atau pertanyaan Anda di sini...'
                  rows={4}>
                </textarea>
              </div>
              <div className="mx-0 my-2.5 w-full">
                <button
                  type="submit"
                  disabled={!isFormValid || loader}
                  className={`border leading-none px-6 text-lg font-medium py-4 rounded-lg 
                    ${!isFormValid || loader ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary border-primary text-white hover:bg-transparent hover:text-primary cursor-pointer'}`}
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
            {showThanks && (
              <div className="text-white bg-green-400 rounded-full px-4 text-lg mb-4.5 mt-2 absolute flex items-center gap-2">
                Pesan telah terkirim. Terima kasih.
                <div className="w-3 h-3 rounded-full animate-spin border-2 border-solid border-white border-t-transparent"></div>
              </div>
            )}
          </div>
          <div className="col-span-6">
            <Image
              src="/images/kontak-page/kontak.webp"
              alt="Contact"
              width={1300}
              height={0}
              quality={100}
              style={{ width: "100%", height: "auto" }}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
